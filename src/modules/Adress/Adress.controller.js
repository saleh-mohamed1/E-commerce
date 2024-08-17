import { User } from "../../../database/model/user.model.js";
import { AppErorr } from "../../middleware/AppErorr.js";
import { catchErorr } from "../../middleware/catchErorr.js";




const AddToAdress =catchErorr( async(req,res,next)=>{
    console.log(req.user._id);
    
    let Adress = await User.findByIdAndUpdate(req.user._id,
        {$push:{Adresses:req.body}},{new:true})

   Adress || next(new AppErorr('Adress Not Found'),404)
   !Adress ||res.json({message:"Success For Add To Adress",Adress:Adress.Adresses})
})

const RemoveAdress =catchErorr( async(req,res,next)=>{
    
    console.log(req.user._id);
    
    let Adress = await User.findByIdAndUpdate(req.user._id,
        {$pull:{Adresses:{_id:req.params.id}}},{new:true})

   Adress || next(new AppErorr('Adress Not Found'),404)
   !Adress ||res.json({message:"Success For Add To Adress",Adress:Adress.Adresses})
})
const getAllAdressFromUser =catchErorr( async(req,res,next)=>{
    console.log(req.user._id);
    
    let Adress = await User.findById(req.user._id)

   Adress || next(new AppErorr('Adress Not Found'),404)
   !Adress ||res.json({message:"Success For Add To Adress",Adress:Adress.Adresses})
})




export {

    RemoveAdress,
    AddToAdress,
    getAllAdressFromUser
};
