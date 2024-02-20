
import passport from "passport";
import { Strategy as GoogleStrategy} from "passport-google-oauth2";
import dotenv from 'dotenv';
dotenv.config();


    passport.serializeUser((user,done)=>{
        done(null,user)
    })
    
    passport.deserializeUser((user,done)=>{
        done(null,user)
    })
    
    passport.use(new GoogleStrategy({
        clientID:"150819638413-k1l5m43h1mt981kh50qqmskma3c9s3fa.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:"https://auth-system-psqf.onrender.com/auth/google/callback",
        passReqToCallback:true
    },
    function(request,accessToken,refreshToken,profile,done)
    {
        return done(null,profile)
    }
    
    
    
    ))

