import mongoose, { Schema, Types } from "mongoose";


const  schema = new Schema({

    user:{
        type:Types.ObjectId,
        ref:'User'
    },
    orderItems:[
        {
            product:{type:Types.ObjectId,ref:'Product'},
            quantity:Number,
            price:Number
        }
    ],
    totalOrderPrice:Number,
    shippingAdress:{
        city:String,
        street:String,
        phone:String
    },
    paymentType:{
        type:String,
        enum:['Cash','Card'],
        default:'Cash'
    },
    isPaid:{
        type:Boolean,
        default:false
    },
    paidAt:Date,
    isDelevered:{
        type:Boolean,
        default:false
    },
    deleveredAt:Date,

    
},{timestamps:true,versionKey:false})








export const  Order = mongoose.model('Order',schema)