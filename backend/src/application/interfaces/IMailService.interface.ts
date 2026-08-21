export interface IMailService {
    sendOtp : (email : string, otp : string) => Promise<void>
    sendAccountVerified : (email : string) => Promise<void>
}