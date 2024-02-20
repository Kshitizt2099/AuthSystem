
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
        clientID:"150819638413-cpn001s1pobhe356t3migiq7719e0c2i.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:"https://auth-system-psqf.onrender.com/auth/google/callback",
        passReqToCallback:true
    },
    function(request,accessToken,refreshToken,profile,done)
    {
        return done(null,profile)
    }
    
    
    
    ))

