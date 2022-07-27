import { User } from "../models/User";
import { UserInterface } from "../types";
import { Request,Response } from "express"

export const getAllUsers = async (req:Request,res:Response)=>{
  try {
    const resultMongoose : UserInterface[] = await User.find()
    resultMongoose.length?
      res.status(200).send(`Esto esta en la DB ${resultMongoose}`)
    :
      res.send("No hay nada")
    } catch (error) {
      console.log(error)
      res.status(400).send(error)
    }
  }
  
export const post = async(req:Request,res:Response)=>{
  try {
      const {nombre,rol}=req.body
      const newUser = new User({nombre,rol})
      const result = await newUser.save()
      result? 
      res.send(`Agregue a ${result.nombre} con el id ${result._id}`):
      res.send("No se pudo crear el nuevo usuario")
  } catch (error:any) {
      console.error(error)
      res.status(400).send(error.message)
  }
}