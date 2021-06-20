import express from 'express'
var bodyParser = require('body-parser');
import { currentUserRouter } from './routes/currentUser';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { errorHandler } from './middlewares/error_handler';

const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.use(errorHandler);


app.listen(3000,()=>{
    console.log("listening on port 3000");
})