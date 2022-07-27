import { ObjectId } from "mongodb"
import mongoose from "mongoose"
export interface UserInterface  {
    nombre:String,
    rol:String
    // _id?: ObjectId
}