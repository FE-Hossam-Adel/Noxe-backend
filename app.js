//core
import express from "express";
import dotenv from "dotenv"
import morgan from "morgan"
import mongoose from "mongoose"
import cors from 'cors';
import dbConnection from "./config/dbconnection.js";
import userRouter from "./routes/user.routes.js";
import indexrRouter from "./routes/index.router.js";
//third-party

//local-modules


const app = express();
app.use(cors())
app.use(express.json())
dotenv.config({path:"config.env"})

//env variables
const port = process.env.PORT || 4001;
const mode = process.env.NODE_ENV;
const dbUri = process.env.DBURI;




if(mode === 'dev'){
    app.use(morgan('dev'))
    console.log(mode)
} 

app.get('/',(req,res)=>{
    console.log(req.query.lang)
     let usr = {}

    for (const key in user) {
        if(key.endsWith(req.query.lang)){
            usr[key] = user[key];
        }
    }

    res.send(usr)
})

app.use('/api/v1/',indexrRouter)

app.all('*',(req,res,nxt)=>{
    nxt(new Error("this route not found")) 
})

//global error handling middleware
app.use((err, req,res,nxt)=>{
    res.send({err:err.message})
})

dbConnection(dbUri)
app.listen(port,()=>{
    console.log(port)
})