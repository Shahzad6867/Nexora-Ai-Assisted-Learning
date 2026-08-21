import { Router } from "express";
import { AuthFactory } from "../factories/auth.factory";
import passport from "../../config/passportGoogleStrategy.config"

const router = Router();
const AuthController = AuthFactory.create();
router.post("/otp/register", AuthController.registerOtpEntity.bind(AuthController));
router.post("/otp/verify", AuthController.verifyOtpEntity.bind(AuthController));
router.patch("/otp/resend",AuthController.resendOtp.bind(AuthController))
router.get("/auth/google",passport.authenticate("google",{
    scope: ["profile", "email"]
  }))
router.get("/auth/google/callback",passport.authenticate("google",{session : false }),AuthController.googleCallback.bind(AuthController))
router.post("/dob/verify/:id",AuthController.verifyGoogleUserDob.bind(AuthController))
router.post("/login",AuthController.verifyLoginCredentials.bind(AuthController))

export default router;
