import routerAdress from "./modules/Adress/Adress.routes.js"
import routerAuth from "./modules/auth/auth.routes.js"
import routerBrand from "./modules/brand/brand.routes.js"
import routerCart from "./modules/cart/cart.routes.js"
import routerCategory from "./modules/category/category.routes.js"
import routerCoupon from "./modules/coupon/coupon.routes.js"
import routerOrder from "./modules/order/order.routes.js"
import routerProduct from "./modules/product/product.routes.js"
import routerReview from "./modules/review/review.routes.js"
import routerSubCategory from "./modules/subCategory/subCategory.routes.js"
import routerUser from "./modules/user/user.routes.js"
import routerWishList from "./modules/wishList/wishList.routes.js"
export const bootstrab =(app)=>{
    app.use('/api/categories',routerCategory)
    app.use('/api/subCategory',routerSubCategory)
    app.use('/api/Brand',routerBrand)
    app.use('/api/Products',routerProduct)
    app.use('/api/Users',routerUser)
    app.use('/api/auth',routerAuth)
    app.use('/api/Review',routerReview)
    app.use('/api/WishList',routerWishList)
    app.use('/api/Adress',routerAdress)
    app.use('/api/Coupons',routerCoupon)
    app.use('/api/Cart',routerCart)
    app.use('/api/Order',routerOrder)
}