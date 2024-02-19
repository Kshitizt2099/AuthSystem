import mongoose from "mongoose";

const Schema={
    name:String,
    Email:String,
    Password:String

}

const MainSchema=new mongoose.Schema(Schema);
export const UserModel=mongoose.model('User',MainSchema);