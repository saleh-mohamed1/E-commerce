import multer from "multer";
import { v4 as uuidv4 } from 'uuid';


export const fileUpload = (folderName)=>{
    
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${folderName}`)
    },
    filename:(req, file, cb)=> {
      cb(null, uuidv4() + "-" + file.originalname)
    }
})


function fileFilter (req, file, cb) {
    if (file.mimetype.startsWith('image')) {
      // To accept the file pass `true`, like so:
      cb(null, true)
          
    }else{
        // To reject this file pass `false`, like so:
  cb( new AppErorr('Image Only'), false)
    }
  }


  const upload = multer({storage , fileFilter})
  return upload

}


export const uploadSingleFile = (folderName,fieldName) => fileUpload(folderName).single(fieldName) 
export const uploadArrayOfFile = (folderName,ArrayOfFields) => fileUpload(folderName).fields(ArrayOfFields)