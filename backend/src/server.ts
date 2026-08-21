import app from "./app";
import env from "./config/env.config";
import connectMongoDB from "./infrastrucutre/mongodb/connection";
import { connectRedis } from "./infrastrucutre/redis/connection";

async function connectServerAndDb(){
    try {
        await connectMongoDB()
        await connectRedis()
        app.listen(env.PORT,(error) => {
            if(error){
                console.error("Something went wrong",error)
            }
            console.log("Server connected at PORT :",5000)
        })
    } catch (error) {
        console.error("Something went wrong",error)
        process.exit()
    }
}
connectServerAndDb()

