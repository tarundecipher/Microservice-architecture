import express,{Request,response,Response} from 'express';
import {body,validationResult} from 'express-validator'
import { RequestValidationError } from '../Errors/request-validation-error';
import { EmailInUseError } from '../Errors/email-inuse-error';
const router = express.Router();
import { Password } from "../services/password";
import {User} from '../database/db';
import jwt from 'jsonwebtoken';


router.post('/api/users/signup',[
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({min:4,max:20}).withMessage('Password must be between 4 and 20 characters')
],async (req:Request,res:Response)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new RequestValidationError(errors.array());
    }
    const {email,password} = req.body;
    await findUser(email,true);
    const hashed = await Password.toHash(password);
    await User.create({ email:email, password:hashed });
    let user = await findUser(email,false);
    user = user.toJSON();
    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    },'asdf');
    req.session = {
        jwt: userJwt
    };
    res.status(201).send({});
});

const findUser = async (email:string,throwError:Boolean) =>{
    const existingUser =  await User.findOne({
        where: {
            email: email,
        }
    })

    if(throwError && existingUser){
        throw new EmailInUseError('Email is in Use');
    }
    else if(throwError===false){
        return existingUser;
    }
}

export {router as signUpRouter};