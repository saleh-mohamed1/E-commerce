


export const globalErorr = (err,req,res,next)=>{
    let code = err.statusCode || 500 
        res.status(code).json({message:"error",err:err.message})
}