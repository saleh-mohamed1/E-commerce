import express from 'express'
import cors from 'cors'
import { bootstrab } from './src/bootstrab.js'
import { dbConn } from './database/dbConnection.js'
import { globalErorr } from './src/middleware/globalError.js'
import { AppErorr } from './src/middleware/AppErorr.js'
import 'dotenv/config';
import { catchErorr } from './src/middleware/catchErorr.js'
import Stripe from 'stripe'
import { Cart } from './database/model/cart.model.js'
import { Order } from './database/model/order.model.js'
import { User } from './database/model/user.model.js'
import { Product } from './database/model/products.model.js'
const stripe = new Stripe('sk_test_51Po40gJv2mEJYEHUXheUsVPsAVcRQLm9RZ07BAt3VxxT9Qi5nuKiPD995zR4qsz2sLjMm6NWl6Y97VbrKmrFEyfu00RfVDLq5R');

const app = express()
const port = process.env.PORT || 3000

app.post('/api/webhook', express.raw({type: 'application/json'}), catchErorr(async(req, res,next) => {
    const sig = req.headers['stripe-signature'].toString()
  
    let event = stripe.webhooks.constructEvent(req.body, sig, 'whsec_02hBBRi2wdrze0FhOVB28rFRiDyJjnx6');
    
    let checkOutPay 
    if (event.type == 'checkout.session.completed') {
        checkOutPay = event.data.object;
        // ^get User cart by cart Id
        // !find User to get email
        let currentUser = await User.findOne({email:checkOutPay.customer_email})
         let cart = await Cart.findById(checkOutPay.client_reference_id)
         if(!cart) return next(new AppErorr('cart Not Found'),404)
             // ^total Order price
         let totalOrderPriceToPay = cart.totalCartPriceAfterDiscount || cart.totalCartPrice
         // ^Crate Order 
         let order = new Order({
             user: currentUser._id,
             orderItems:cart.cartItems,
             shippingAdress:checkOutPay.metadata,
             totalOrderPriceToPay:checkOutPay.amount_total / 100,
             paymentType:'Card',
             isPaid:true
         })
         
         await order.save()
         
         // ^increament and decrement
         let proccessToUpdateStockAndSold = cart.cartItems.map((product)=>{
             return ( {updateOne:{
                 "filter":{ _id :product.product  },
                 "update":{$inc:{ sold:product.quantity , stock:-product.quantity   }}    
             }})
         })
         await Product.bulkWrite(proccessToUpdateStockAndSold) 
         // ^clear user cart
         await Cart.findByIdAndDelete(cart._id)





















    }
  
  
    // Return a 200 res to acknowledge receipt of the event
    res.json({message:"succses",checkoutSessionCompleted});
  }));













app.use(cors())
app.use(express.json())
app.use('/uploads',express.static('uploads'))
app.use('*',(err,req,res,next)=>{
    next(new AppErorr(`Route Not Found ${req.originalUrl}`,401))
})

/** */

/** */
bootstrab(app)
app.get('/',(err,req,res,next)=>{
    res.json({message:"hello World"})
})
app.use(globalErorr)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))