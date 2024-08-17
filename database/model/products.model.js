import mongoose, { Types,Schema } from "mongoose";


const  schema = new Schema({
    title: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Title is required']
    },
    slug:{
        type:String,
        lowerCase:true,
        required:true
    },
    description:{
        type:String,
        required:true,
        minLength:30,
        maxLength:2000,
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    imageCover:String,
    images:[String],
    priceAfterDiscount:{
        type:Number,
        required:true,
        min:0
    },
    sold:Number,
    stock:{
        type:Number,
        min:0
    },
    category:{
        type:Types.ObjectId,
        ref:'Category'
    },
    subCategory:{
        type:Types.ObjectId,
        ref:'SubCategory'
    },
    brand:{
        type:Types.ObjectId,
        ref:'Brand'
    },
    rateAVG:{
        type:Number,
        min:0,
        max:5,
    },
    rateCount:Number,
    createdBy:{
        type:Types.ObjectId,
        ref:'User'
    }

},{timestamps:true,versionKey:false,toJSON:{  virtuals:true  }})



schema.virtual('ReviewsOfProduct',{
    ref:'Review',
    localField:'_id',
    foreignField:'product'
})

schema.pre('findOne',function(){
    this.populate('ReviewsOfProduct')
})



schema.post('init',function(doc){
    if(doc.imageCover) doc.imageCover = 'https://e-commerce-delta-azure.vercel.app/uploads/products/' + doc.imageCover
    if(doc.images) doc.images =   doc.images.map(img => 'https://e-commerce-delta-azure.vercel.app/uploads/products/' + img) 
})


export const  Product = mongoose.model('Product',schema)