import mongoose from "mongoose";


export const dbConn =mongoose.connect('mongodb+srv://e-comm-final:MqMP6eFojilA3UKc@cluster0.255tp.mongodb.net/E-Commerece-App').then(()=>{
    console.log('dataBase is Connecting Successfully.......');
}).catch((err)=>{
    console.log('dataBase is Connecting wrongly.......',err);
})