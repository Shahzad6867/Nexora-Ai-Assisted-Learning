import passport from "passport";
import { Strategy as GoogleStrategy,Profile } from "passport-google-oauth20";
import env from "./env.config";

passport.use(
    new GoogleStrategy({
        clientID: env.GOOGLE_CLIENT_ID!,
        clientSecret: env.GOOGLE_CLIENT_SECRET!,
        callbackURL: env.GOOGLE_CALLBACK_URL!,
    },(accessToken : string,refreshToken : string,profile : Profile,done) => {
        try {

            const user = {
                email:
                    profile.emails?.[0]?.value!,

                first_name:
                    profile.name?.givenName!,

                last_name:
                    profile.name?.familyName!,

                profile_image:
                    profile.photos?.[0]?.value!,
                google_id: profile.id

            };


            return done(
                null,
                user
            );


        } catch (error) {

            return done(
                error,
                false
            );

        }
    })
)

export default passport