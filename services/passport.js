const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("Users");

passport.serializeUser((user, done) => {
  console.log("Serialized user", user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    console.log("Deserialized user", user);
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      User.findOne({
        googleId: profile.id
      }).then(existingUser => {
        if (existingUser) {
          console.log(existingUser);
          done(null, existingUser);
        } else {
          new User({ googleId: profile.id }).save().then(user => {
            console.log(user);
            done(null, user);
          });
        }
      });
    }
  )
);
