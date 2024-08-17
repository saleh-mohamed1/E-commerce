import mongoose, { Types,Schema } from "mongoose";


const  schema = new Schema({
    code:{
        type:String,
        unique:true,
        required:true
    },
    expires:Date,
    disCount:Number


},{timestamps:true,versionKey:false})







export const  Coupon = mongoose.model('Coupon',schema)