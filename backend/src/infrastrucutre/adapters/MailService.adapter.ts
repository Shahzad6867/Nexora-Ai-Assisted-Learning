import { IMailService } from "../../application/interfaces/IMailService.interface";
import env from "../../config/env.config";
import { transporter } from "../../config/nodemailer.config";

export class MailService implements IMailService {
  async sendOtp(email: string, otp: string): Promise<void> {
    try {
      transporter.sendMail({
        from: env.BREVO_SENDER,
        to: email,
        subject: "Your Verification Code",
        text: `Your verification code is ${otp}`,
        html: ` <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>OTP Verification</title>
                </head>
                <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
                    <!-- Main Email Card -->
                    <table align="center" width="100%" cellspacing="0" cellpadding="0" style="max-width: 500px; margin: 40px auto; background-color: #1e103b; border-radius: 28px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3); overflow: hidden; border: 1px solid rgba(163, 76, 255, 0.15);">
                        <tr>
                            <td style="padding: 48px 36px; text-align: center;">
                                

                                <!-- Main Heading -->
                                <h1 style="margin: 0 0 12px 0; font-size: 26px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
                                    Verification Code
                                </h1>

                                <!-- Context Sentence -->
                                <p style="margin: 0 0 36px 0; font-size: 15px; line-height: 24px; color: #aeb3d5;">
                                    Use the secure code below to complete your verification process.
                                </p>

                                <!-- Premium Neon OTP Container -->
                                <div style="background-color: #070b2a; border: 2px solid #6650ff; color: #ffffff; font-size: 38px; letter-spacing: 8px; font-weight: 800; padding: 16px 36px; border-radius: 18px; display: inline-block; margin-bottom: 32px; font-family: 'Courier New', Courier, monospace; box-shadow: 0 0 20px rgba(102, 80, 255, 0.2);">
                                    ${otp}
                                </div>
                                
                                <span style="display:none !important; font-size:1px; color:#070b2a; line-height:1px; max-height:0px; max-width:0px; opacity:0; overflow:hidden;">
                                    Log ID: ${Math.random().toString(36).substring(2, 9)}
                                </span>

                                <!-- Expiration Warning Alert Frame -->
                                <div style="background-color: rgba(163, 76, 255, 0.08); border: 1px solid rgba(163, 76, 255, 0.25); border-radius: 14px; padding: 14px 18px; margin-bottom: 36px;">
                                    <p style="margin: 0; font-size: 13px; font-weight: 500; color: #c0c4e5; line-height: 18px;">
                                        <span style="color: #a34cff; font-weight: bold;">⏱️ Expires in 3 minutes.</span> Do not share this code.
                                    </p>
                                </div>

                                <!-- Divider Line -->
                                <hr style="border: none; border-top: 1px solid rgba(174, 179, 213, 0.1); margin: 0 0 24px 0;" />

                                <!-- Footnotes / Support -->
                                <p style="margin: 0; font-size: 12px; line-height: 18px; color: #c0c4e5; opacity: 0.7;">
                                    If you did not request this code, you can safely ignore this security message.
                                </p>
                                
                            </td>
                        </tr>
                    </table>
                </body>
                </html>

                                `,
      });
    } catch (error) {
      console.error(error);
    }
  }
  async sendAccountVerified(email : string) : Promise<void> {
    try {
        transporter.sendMail({
          from: env.BREVO_SENDER,
          to: email,
          subject: "Account has been verified successfully",
          text: `Your account has been verified successfully`,
          html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Account Verified</title>
                </head>
                <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: white; -webkit-font-smoothing: antialiased;">
                    
                    <!-- Hidden unique tracker to prevent Gmail clipping/minimizing -->
                    <span style="display:none !important; font-size:1px; color:#070b2a; line-height:1px; max-height:0px; max-width:0px; opacity:0; overflow:hidden;">
                        Log ID: ${Math.random().toString(36).substring(2, 9)}
                    </span>

                    <!-- Main Email Card -->
                    <table align="center" width="100%" cellspacing="0" cellpadding="0" style="max-width: 500px; margin: 40px auto; background-color: #1e103b; border-radius: 28px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3); overflow: hidden; border: 1px solid rgba(163, 76, 255, 0.15);">
                        <tr>
                            <td style="padding: 48px 36px; text-align: center;">
                                
                                <!-- Main Heading -->
                                <h1 style="margin: 0 0 12px 0; font-size: 26px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
                                    Account Verified!
                                </h1>

                                <!-- Context Sentence -->
                                <p style="margin: 0 0 32px 0; font-size: 15px; line-height: 24px; color: #aeb3d5;">
                                    Welcome aboard! Your registration is complete.
                                </p>

                                <!-- Premium App Call-To-Action Button -->
                                <div style="margin-bottom: 36px;">
                                    <a href="http://localhost:5173/" style="background-color: #6650ff; color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none; padding: 14px 32px; border-radius: 14px; display: inline-block; box-shadow: 0 0 20px rgba(102, 80, 255, 0.3); border: 1px solid #a34cff; transition: all 0.2s ease;">
                                        Go to Home
                                    </a>
                                </div>

                                <!-- Informational Banner Frame -->
                                <div style="background-color: rgba(163, 76, 255, 0.08); border: 1px solid rgba(163, 76, 255, 0.25); border-radius: 14px; padding: 14px 18px; margin-bottom: 36px;">
                                    <p style="margin: 0; font-size: 13px; font-weight: 500; color: #c0c4e5; line-height: 18px;">
                                        You now have full access to all your app features and settings.
                                    </p>
                                </div>

                                <!-- Divider Line -->
                                <hr style="border: none; border-top: 1px solid rgba(174, 179, 213, 0.1); margin: 0 0 24px 0;" />

                                <!-- Footnotes / Support -->
                                <p style="margin: 0; font-size: 12px; line-height: 18px; color: #c0c4e5; opacity: 0.7;">
                                    Need help getting started? Reply to this email.
                                </p>
                                
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
`
        });
      } catch (error) {
        console.error(error);
      }
  }
}
