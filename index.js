import express from 'express'
import cors from 'cors'
import { bootstrab } from './src/bootstrab.js'
import { dbConn } from './database/dbConnection.js'
import { globalErorr } from './src/middleware/globalError.js'
import { AppErorr } from './src/middleware/AppErorr.js'
import 'dotenv/config';
const app = express()
const port = process.env.PORT || 3000
app.use(cors())
app.use(express.json())
app.use('/uploads',express.static('uploads'))
app.use('*',(err,req,res,next)=>{
    next(new AppErorr(`Route Not Found ${req.originalUrl}`,401))
})

/** */

/** */
bootstrab(app)
app.get('/',(err,req,res,next)=>{
    res.json({message:"hello World"})
})
app.use(globalErorr)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))