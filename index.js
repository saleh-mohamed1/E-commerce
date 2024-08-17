import express from 'express'
import cors from 'cors'
import { bootstrab } from './src/bootstrab.js'
import { dbConn } from './database/dbConnection.js'
import { globalErorr } from './src/middleware/globalError.js'
import { AppErorr } from './src/middleware/AppErorr.js'
import 'dotenv/config';
import { catchErorr } from './src/middleware/catchErorr.js'
import Stripe from 'stripe'
const stripe = new Stripe('sk_test_51Po40gJv2mEJYEHUXheUsVPsAVcRQLm9RZ07BAt3VxxT9Qi5nuKiPD995zR4qsz2sLjMm6NWl6Y97VbrKmrFEyfu00RfVDLq5R');

const app = express()
const port = process.env.PORT || 3000

app.post('/api/webhook', express.raw({type: 'application/json'}), catchErorr((req, res) => {
    const sig = req.headers['stripe-signature'].toString()
  
    let event = stripe.webhooks.constructEvent(req.body, sig, 'whsec_02hBBRi2wdrze0FhOVB28rFRiDyJjnx6');
    
    let checkoutSessionCompleted 
    if (event.type == 'checkout.session.completed') {
        
        checkoutSessionCompleted = event.data.object;
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