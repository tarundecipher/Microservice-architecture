import express, {Request,response,Response} from 'express';
import { body} from 'express-validator';
import { User } from '../database/db';
import {ValidateRequest} from '../middlewares/validate-request';
import { EmailInUseError } from '../Errors/email-inuse-error';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';
const router = express.Router();


router.post('/api/users/signin',[
    body('email').isEmail()
        .withMessage('Email must be valid'),
    body('password')
    .trim()
    .notEmpty()
    .withMessage('You must supply a password')   
],ValidateRequest,async (req:Request,res:Response)=>{
    const {email,password} = req.body;
    let existingUser = await findUser(email);
    if(!existingUser){
        throw new EmailInUseError('Invalid credentials');
    }
    const passwordMatch = await Password.compare(existingUser.password,password);
    if(!passwordMatch){
        throw new EmailInUseError('Invalid credentials');
    }
    const userJwt = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    },process.env.JWT_KEY!);
    req.session = {
        jwt: userJwt
    };
    res.status(201).send(existingUser);
});

const findUser = async (email:string) =>{
    const existingUser =  await User.findOne({
        where: {
            email: email,
        }
    })
    
    return existingUser;
}

export {router as signInRouter};