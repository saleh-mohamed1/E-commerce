import { Cart } from "../../../database/model/cart.model.js";
import { Coupon } from "../../../database/model/coupon.model.js";
import { Product } from "../../../database/model/products.model.js";
import { AppErorr } from "../../middleware/AppErorr.js";
import { catchErorr } from "../../middleware/catchErorr.js";


function totalAmountOfMyCart(Cart){
    Cart.totalCartPrice = Cart.cartItems.reduce((prev,item)=>{
        return prev += item.price * item.quantity
    },0)
    
    if (Cart.discount) {
        Cart.totalCartPriceAfterDiscount  = 
        Cart.totalCartPrice - (Cart.totalCartPrice * Cart.discount) / 100
    }

    
    }
const AddToCart =catchErorr( async(req,res,next)=>{
    let isExist = await Cart.findOne({user:req.user._id})
    let product =await Product.findById(req.body.product)
    if(!product) return next(new AppErorr('Product Not Found',404))
        req.body.price = product.price
    if(req.body.quantity > product.stock) return next(new AppErorr('Over Quantity More Than Stock',404))    
    if(!isExist) {
        let cart = new Cart({
            user:req.user._id,
            cartItems:[req.body]
        })
        totalAmountOfMyCart(cart)
        await cart.save()
        res.json({message:"Success For Cart",cart})
    }else{
        let item = isExist.cartItems.find(item=>item.product == req.body.product)
        if(item) {
            item.quantity += req.body.quantity || 1
            if (item.quantity >product.stock) next(new AppErorr('Over Quantity More Than Stock',404))
        }
        if (!item)isExist.cartItems.push(req.body)
            totalAmountOfMyCart(isExist)            
            await isExist.save()
        res.json({message:"Success",cart : isExist})
    }
})
const updateQuantityOfProduct =catchErorr( async(req,res,next)=>{
let cart = await Cart.findOne({user:req.user._id})
    let item = cart.cartItems.find(item=> item.product == req.params.id)
    
    if(!item) return next(new AppErorr('Product Not Found'),404)
        item.quantity = req.body.quantity
        totalAmountOfMyCart(cart)
        await cart.save()
    res.json({message:"Success For Add To cart",cart})

})
const removeProductItemOfCart =catchErorr( async(req,res,next)=>{
    let cart = await Cart.findOneAndUpdate({user:req.user._id},
        {$pull:{cartItems:{ _id:req.params.id}}},{new:true})
        
        totalAmountOfMyCart(cart)
            await cart.save()
        cart || next(new AppErorr('cart Not Found'),404)
        !cart ||res.json({message:"Success For Deleted From cart",cart})
        

})
const getUserCart =catchErorr( async(req,res,next)=>{
    let cart = await Cart.findOne({user:req.user._id})
    return res.json({message:"Success For Get Items From cart",cart})

})
const ClearAllItemsOfUserFromCart =catchErorr( async(req,res,next)=>{
    let cart = await Cart.findOneAndDelete({user:req.user._id})
    if (cart == null) {
        return next(new AppErorr('cart_id Not Found'),404)
    }
    return res.json({message:"Success For Deleted Your Items From cart",cart})

})
const ApplyCoupon =catchErorr( async(req,res,next)=>{
    let coupon = await Coupon.findOne({code:req.body.code,expires:{$gte:Date.now()}})
    if(!coupon)  return next(new AppErorr('Oops...!coupon Invalid'),404)
        let cart = await Cart.findOne({user:req.user._id})
    console.log(cart);
    console.log(coupon);
    
        cart.discount = coupon.disCount
        console.log(coupon.disCount);
        totalAmountOfMyCart(cart)
    await cart.save()
    return res.json({message:"Success",cart})

})



export {
    ApplyCoupon,
    AddToCart, ClearAllItemsOfUserFromCart, getUserCart, removeProductItemOfCart, updateQuantityOfProduct
};

