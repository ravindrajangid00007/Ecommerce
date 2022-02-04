const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users");
const catchAsyncError = require("../middleware/catchAsyncError");

passport.use(
  new LocalStrategy(
    {
      // My users have only email
      usernameField: "email",
      session: false
    },
    catchAsyncError(async (username, password, done) => {
      const user = await User.findOne({email : username}).select("+password");
      // Copy the user w/o the password into a new object
      if (user && await user.isPasswordMatch(password))
        return done(null, {
          id: user._id,
          role: user.role,
        });
      return done(null, false);
    }
  )
));

module.exports = passport;
