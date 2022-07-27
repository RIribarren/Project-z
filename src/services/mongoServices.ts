import { User } from "../models/User"
import {client} from "../dbMongo"
import { Request,Response } from "express"
import { UserInterface } from "../types"
export const post = async (req:Request,res:Response)=>{
    try {
      const usercolection = client.db().collection("users")
      const newUser : UserInterface = new User ({nombre:"Pocho",rol:"Pantera"})
      const {insertedId} = await usercolection.insertOne(newUser)
      console.log(`Agregue a ${newUser.nombre} con el id ${insertedId}`)
      res.send(`Agregue a ${newUser.nombre} con el id ${insertedId}`)
    } catch (error) {
      console.log(error)
    }
  }
  export const getAllUsers = async (req:Request,res:Response) => {
    try {
      const usercolection = client.db().collection("users")
      const mongoResult =  await usercolection.find().toArray()
      if(mongoResult.length){console.log("Estoy trayendo data con Mongo",mongoResult)
      res.send(mongoResult)
      }else {
      console.log("No habia nada")
      res.send("no hay nada")
      }
    } catch (error) {
      console.log(error)
    }
  }
