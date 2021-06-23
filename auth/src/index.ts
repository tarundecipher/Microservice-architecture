import express from 'express'
require('express-async-errors');
const bodyParser = require('body-parser');
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/currentUser';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { errorHandler } from './middlewares/error_handler';


import { sequelize } from './database/db';




const app = express();
// app.set('trust proxy',true);
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())
app.use(cookieSession({
    signed: false,
    // secure: true
}))


app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.use(errorHandler);



app.listen(3000,()=>{
    console.log("listening on port 3000");
})

sequelize.sync().then((res:Response)=>{

    if(!process.env.JWT_KEY){
        throw new Error('JWT_KEY not defined');
    }
}).catch((err:Error)=>{
    console.log(err);
})