import { Cart } from "../../../database/model/cart.model.js"
import { Order } from "../../../database/model/order.model.js"
import { Product } from "../../../database/model/products.model.js"
import { User } from "../../../database/model/user.model.js"
import { AppErorr } from "../../middleware/AppErorr.js"
import { catchErorr } from "../../middleware/catchErorr.js"
import Stripe from 'stripe'
const stripe = new Stripe('sk_test_51Po40gJv2mEJYEHUXheUsVPsAVcRQLm9RZ07BAt3VxxT9Qi5nuKiPD995zR4qsz2sLjMm6NWl6Y97VbrKmrFEyfu00RfVDLq5R');
const createCashOrder = catchErorr(async(req,res,next)=>{
        
    // ^get User cart by cart Id
        let cart = await Cart.findById(req.params.id)
        if(!cart) return next(new AppErorr('cart Not Found'),404)
            // ^total Order price
        let totalOrderPriceToPay = cart.totalCartPriceAfterDiscount || cart.totalCartPrice
        // ^Crate Order 
        let order = new Order({
            user:req.user._id,
            orderItems:cart.cartItems,
            shippingAdress:req.body.shippingAdress,
            totalOrderPriceToPay
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
        return  res.json({message:"Success For Create Order",order})
})
const getAllOrdersOfUser = catchErorr(async(req,res,next)=>{
    let order = await Order.findOne({user:req.user._id}).populate('orderItems.product')
    return res.json({message:"success",order})
})
const getAllOrdersOfUserMergParams = catchErorr(async(req,res,next)=>{
    let fileFilter = {}
    if (req.params.idUserToOrder) fileFilter.user = req.params.idUserToOrder

    let order = await Order.find(fileFilter).populate('orderItems.product')
    console.log('sssssssssssssss');
    
    return res.json({message:"success",order})
})
const getAllOrdersUsersByAdmin = catchErorr(async(req,res,next)=>{

 
    let order = await Order.find().populate('orderItems.product')
    let userName= await User.findById(req.user._id)
    return res.json({message:`Success Admin ${userName.name}`,order})




})



const createToCheckOut = catchErorr(async(req,res,next)=>{

    let cart = await Cart.findById(req.params.cartId)
    
    if(!cart) return next(new AppErorr('cart Not Found'),404)
    let totalOrderPriceToPay = cart.totalCartPriceAfterDiscount || cart.totalCartPrice

    let session = await stripe.checkout.sessions.create({
        line_items:[
            {
                price_data:{
                    currency:'egp',
                    unit_amount:totalOrderPriceToPay*100,
                    product_data:{
                        name : req.user.name
                    }
                },
                quantity:1
            }
        ],
        mode:'payment',
        success_url:process.env.BASE_URL + 'Order/checkOut',
        cancel_url:process.env.BASE_URL + `Users/${cart.user}/orders`,
        customer_email:req.user.email,
        client_reference_id:req.params.cartId,
        metadata:req.body.shippingAdress
        
    })


    res.json({message:"success to CheckOut" ,session})
})
const getCreateSessionForPay = catchErorr(async(req,res,next)=>{
            res.json({message:"success to For Pay"})

})




export {
    createCashOrder, createToCheckOut,getCreateSessionForPay,
    getAllOrdersOfUser, getAllOrdersOfUserMergParams, getAllOrdersUsersByAdmin
}

