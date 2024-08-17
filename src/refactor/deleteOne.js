import { AppErorr } from "../middleware/AppErorr.js"
import { catchErorr } from "../middleware/catchErorr.js"



export const deleteOne = (Module,NameOfModel)=>{
    return catchErorr(async(req,res,next)=>{
        let document = await Module.findByIdAndDelete(req.params.id) 
        document || next(new AppErorr(`${NameOfModel} Not Found`),404)
        !document || res.json({message:"Success For Delete",document})
    
    })
}