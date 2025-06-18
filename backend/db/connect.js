import mongoose from "mongoose";

const connectToMongoDB= async(req,res)=>{
    try{
      await mongoose.connect(process.env.MONGO_DB_URI);
      console.log("connected mongodb");
    }catch(err){
        console.log(`error in connecting to mongodb database:`)
        return res.json({message:`error in connecting to mongodb database:${err}`});
    }
}


export  default connectToMongoDB;