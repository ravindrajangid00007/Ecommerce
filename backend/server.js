const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const errorMiddleware = require('./middleware/error');
dotenv.config({path: path.join(__dirname, 'config/config.env')});
const db = require('./config/database');
const passport = require('passport');
const passportJwtCookieCombo = require('./config/passport_jwt_cookiecombo');
const passportLocalStrategy = require('./config/passport_local_strategy');
const cloudinary = require('cloudinary');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
// const session = require('express-session');
// const MongoStore = require('connect-mongo');
// const passportStrategy = require('./config/passport_jwt_strategy');
const cookieParser = require('cookie-parser');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME ,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
// app.use(session({
//     name: 'cookie',
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     store: MongoStore.create(
//         {
//             mongoUrl: 'mongodb://localhost:27017/Ecommerce',
//             autoRemove: 'disabled'
//         },function(err){
//             if(err) {console.log(err || "stored seccurfully") ;}
//         }
//     ),
//     cookie: { 
//         maxAge: 24*60*60*1000,
//         // secure: true,
//     }
// }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(passport.initialize());
// app.use(passport.session());

app.use('/api/v1' , require('./routes'))
// middleware for error handling
app.use(errorMiddleware);
app.listen(process.env.PORT , ()=>{
    console.log(`listening on port ${process.env.PORT}`);
})