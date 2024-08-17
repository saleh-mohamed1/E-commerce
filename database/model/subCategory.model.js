import mongoose, {Schema , Types} from "mongoose";



const  schema = new Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        unique:[true,'name Is Required '],
        minLength:[true,'name Is Required ']
    },
    slug:{
        type:String,
        lowerCase:true,
        required:true
    },
    category:{
        type:Types.ObjectId,
        ref:'Category',
        required:true
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'User'
    }
},{timestamps:true,versionKey:false})



export const  SubCategory = mongoose.model('SubCategory',schema)