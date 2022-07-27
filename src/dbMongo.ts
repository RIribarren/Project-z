import {MongoClient} from "mongodb"

export var client:MongoClient
async function connectWithMongo(uri:string) {
   client = new MongoClient(uri);
    try {
         await client.connect();
         console.log("Connected correctly to server with Mongo");
    }catch (err){console.log(err)}
 }
 export default connectWithMongo