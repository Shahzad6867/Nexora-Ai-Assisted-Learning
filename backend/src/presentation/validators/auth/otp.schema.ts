import z from "zod";


export const otpSchema = z.object({
    otpTyped : z.string(),
    otpDetails : z.object({
        _id: z.string(),
        otp: z.string(),
        otpExpiresAt: z.string(),
      })
})