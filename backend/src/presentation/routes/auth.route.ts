import { Router } from "express";
import { AuthFactory } from "../factories/auth.factory";
import passport from "../../config/passportGoogleStrategy.config"
import { validate } from "../middlewares/validateAuthenticationCredentials.middleware";
import { registerSchema } from "../validators/auth/register.schema";
import { loginSchema } from "../validators/auth/login.schema";
import { otpSchema } from "../validators/auth/otp.schema";

const router = Router();
const AuthController = AuthFactory.create();
router.post("/otp/register",validate(registerSchema), AuthController.registerOtpEntity.bind(AuthController));
router.post("/otp/verify",validate(otpSchema), AuthController.verifyOtpEntity.bind(AuthController));
router.patch("/otp/resend",AuthController.resendOtp.bind(AuthController))
router.get("/auth/google",passport.authenticate("google",{
    scope: ["profile", "email"]
  }))
router.get("/auth/google/callback",passport.authenticate("google",{session : false }),AuthController.googleCallback.bind(AuthController))
router.post("/dob/verify/:id",AuthController.verifyGoogleUserDob.bind(AuthController))
router.post("/login",validate(loginSchema),AuthController.verifyLoginCredentials.bind(AuthController))

router.post("/refresh",AuthController.createAccessToken.bind(AuthController))
router.get("/logout",AuthController.logout.bind(AuthController))

export default router;
