export interface IOtpGenerator {
    generate : () => {
        otp : string,
        otpExpiresAt : Date
    }
}