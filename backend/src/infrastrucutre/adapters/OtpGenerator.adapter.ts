import { IOtpGenerator } from "../../application/interfaces/IOtpGenerator.interface";

export class OtpGenerator implements IOtpGenerator {
    generate() : {otp : string,otpExpiresAt : Date} {
        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        return {
            otp, 
            otpExpiresAt : new Date(Date.now() + (3 * 60 * 1000))
        }
    }
}