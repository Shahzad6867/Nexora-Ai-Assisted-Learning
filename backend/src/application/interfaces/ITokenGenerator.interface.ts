export interface ITokenGenerator {
    generateAccessToken : (payload : any) => string
    generateRefreshToken : (payload : any) => string
}