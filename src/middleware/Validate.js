import { AppErorr } from "./AppErorr.js"



export const Validate = (schema)=>{

    return async (req,res,next)=>{
        let validationData = {...req.body,...req.params,...req.query}
        if (req.file ) {
            if (req.file.fieldname == 'image') {
                validationData.image = req.file
            }
            if (req.file.fieldname == 'logo') {
                validationData.logo = req.file
            }
        }
        // if (req.files) {
        //     console.log("validationDatavalidationDatavalidationData",validationData);
        //     console.log('foeIfCondetions',req.files);
            
        //         if (req.files.fieldname  == 'imageCover') {
        //             validationData.imageCover = req.files
        //         }
        //         if (req.files.fieldname  == 'images') {
        //             validationData.images = req.files;
        //         }
        //     console.log("validationDatavalidationDatavalidationData2222",validationData);
        // }
        if (req.files) {
            if (req.files.imageCover && req.files.imageCover[0]) {
                validationData.imageCover = req.files.imageCover[0];
            }
            if (req.files.images) {
                validationData.images = req.files.images;
            }
        }
        let {error} = schema.validate(validationData,{abortEarly:false})
        if (!error) {
            next()
        }else{
            let errMSG = error.details.map(err => err.message);
            next(new AppErorr(errMSG,401))
        }
    }
}