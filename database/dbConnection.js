import mongoose from "mongoose";


export const dbConn =mongoose.connect(process.env.SEC_DATA_BASE).then(()=>{
    console.log('dataBase is Connecting Successfully.......');
}).catch((err)=>{
    console.log('dataBase is Connecting wrongly.......',err);
})