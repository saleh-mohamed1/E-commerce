import mongoose, { Schema, Types } from "mongoose";
import bcryptjs from "bcryptjs";

let schema =new Schema({
    name:String,
    email:
    {
        type:String,
        uniqe:true
    },
    password:String,
    isBlocked:{
        type:Boolean,
        default:false
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:['Admin','User'],
        default:'User'
    },
    passwordChangedAt : Date,
    wishList:[{
        type:Types.ObjectId,
        ref:'Product'
    }],
    Adresses:[{
        city:String,
        phoneNumber:String,
        street:String
    }]
},{timestamps:true,versionKey:false})


schema.pre('save',function(){
    this.password = bcryptjs.hashSync(this.password,8)
    console.log(this);
    
})
schema.pre('findOneAndUpdate',function(){
    if(this._update.password) this._update.password = bcryptjs.hashSync(this._update.password,8)
})

export const  User = mongoose.model('User',schema)