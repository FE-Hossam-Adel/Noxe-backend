import mongoose from "mongoose";

const dbConnection =(dbUri)=>{
    mongoose.connect(dbUri).then((con)=>{
        console.log(con.connection.host);
    }).catch((err)=>{
        console.log(err)
    })
    
}

export default dbConnection;