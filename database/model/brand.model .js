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
        lowerCase:true,
        required:true
    },
    logo:String,
    createdBy:{
        type:Types.ObjectId,
        ref:'User'
    }
},{timestamps:true,versionKey:false})


schema.post('init',function(doc){
    doc.logo = 'http://localhost:3000/uploads/brand/' + doc.logo
})



export const  Brand = mongoose.model('Brand',schema)