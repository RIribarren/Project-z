import mongoose from "mongoose"
const ConectwithMongoose = async (uri:string)=>{
    await mongoose.connect(uri)
    .then(()=> console.log("DB conectada con Mongoose"))
    .catch(e=>console.log(e))
}

export default ConectwithMongoose