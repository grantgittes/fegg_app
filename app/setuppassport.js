// Code for (de)serializing users and local authentication
// from Express in Action

const passport = require("passport");
const User = require("./models/user");
const LocalStrategy = require("passport-local").Strategy;
const GithubStrategy = require("passport-github").Strategy;

// serializing and deserializing users from the mongodb
module.exports = function() {
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};

// setup the authentication strategy
passport.use(
  "login",
  new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "No user with that username" });
      }
      user.checkPassword(password, function(err, isMatch) {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Invalid password" });
        }
      });
    });
  })
);

// setup authentication strategy for github login
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL:
        "https://" +
        process.env.PROJECT_DOMAIN +
        ".glitch.me/login/github/return"
    },
    function(accessToken, refreshToken, profile, done) {
      //check user table for anyone with a username same to github
      console.log(profile);
      User.findOne(
        {
          username: profile.username
        },
        function(err, user) {
          if (err) {
            return done(err);
          }
          //No user was found... so create a new user with values
          if (!user) {
            if (profile._json.email) {
              var email = profile._json.email;
            } else {
              email = '';
            }
            user = new User({
              username: profile.username,
              password: profile.username,
              email: email,
              displayName: profile.displayName,
              avatar_url: profile._json.avatar_url,
              provider: "github",
              github: profile._json
            });
            user.save(function(err) {
              if (err) console.log(err);
              return done(err, user);
            });
          } else {
            //found user. Return
            return done(err, user);
          }
        }
      );
    }
  )
);
