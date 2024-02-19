import mongoose from "mongoose";
//const url="mongodb+srv://kshitijtawra2099:nexZdByDNDYqsrLp @ar.howls7m.mongodb.net/?retryWrites=true&w=majority"
//const url="mongodb://localhost:27017/Abc"
const url="mongodb+srv://kshitijtawra2099:68jp7i2R95iVzFQ9@cluster0.ltcfzg8.mongodb.net/?retryWrites=true&w=majority"
export const connecttodb=async()=>{
    
    try{
           await mongoose.connect(url);

    }
    catch(err){
        console.log("Error has been raised",err);

    }
}