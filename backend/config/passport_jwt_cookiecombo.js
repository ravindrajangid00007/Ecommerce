const JwtCookieComboStrategy = require('passport-jwt-cookiecombo');
const passport = require('passport');
const ErrorHandler = require('../utils/errorhandler')
console.log("INside cookiecombo file");
passport.use(new JwtCookieComboStrategy({
    jwtCookieName: 'jwt',
    secretOrPublicKey: process.env.JWT_SECRET_KEY,
    jwtVerifyOptions: {
        maxAge: process.env.JWT_EXPIRATION_IN_DAY,
    }
}, (payload, done) => {
    return done(null, payload);
}));

passport.authorizeRoles = (...roles) => {
    return (req , res , next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`${req.user.role} is not allowed to access this resource` , 401));
        }
        
        next();
    }
}

module.exports = passport;