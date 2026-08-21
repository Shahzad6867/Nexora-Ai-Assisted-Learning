import mongoose from "mongoose"
import env from "../../config/env.config"
export default async function connectMongoDB(){
    if(!env.MONGODB_CONNECTION_STRING){
        throw new Error("MONGODB_CONNECTION_STRING is not defined")
    }

    try {
        await mongoose.connect(env.MONGODB_CONNECTION_STRING)
        console.log("MongoDB Connected")
    } catch (error) {
        console.error("Something went wrong while connecting DB", error)
        throw error
    }
}