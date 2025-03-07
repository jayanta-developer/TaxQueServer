import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (user: any) => {
  return jwt.sign(
    { id: user.id, name: user.displayName, email: user.emails?.[0]?.value },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );
};

// Serialize and Deserialize User
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj: any, done) => {
  done(null, obj);
});

// GOOGLE STRATEGY
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "http://localhost:5000/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("Google Profile:", profile);
      return done(null, profile);
    }
  )
);

// FACEBOOK STRATEGY
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      callbackURL: "http://localhost:5000/facebook/callback",
      profileFields: ["id", "displayName", "email", "photos"],
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("Facebook Profile:", profile);
      return done(null, profile);
    }
  )
);

// LINKEDIN STRATEGY
passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      callbackURL: "http://localhost:5000/linkedin/callback",
      scope: ["r_liteprofile", "r_emailaddress"],
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("LinkedIn Profile:", profile);
      return done(null, profile);
    }
  )
);

export default passport;
