import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { UserInterface } from "../types";
const Schema = mongoose.Schema

const userSchema = new Schema({
// _id: ObjectId,
nombre:{
    type:String,
    required:true
    },
rol:{
    type:String,required:true
    }
},{versionKey:false})

export const User = mongoose.model<UserInterface>("User",userSchema)