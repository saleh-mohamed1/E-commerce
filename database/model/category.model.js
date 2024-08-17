import mongoose, { Types,Schema } from "mongoose";



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
        lowerCase:true
    },
    image:String,
    createdBy:{
        type:Types.ObjectId,
        ref:'User'
    }
},{timestamps:true,versionKey:false})

schema.post('init',function(doc){
    if(doc.image) doc.image = 'https://e-commerce-delta-azure.vercel.app/uploads/category/' + doc.image
})



export const  Category = mongoose.model('Category',schema)