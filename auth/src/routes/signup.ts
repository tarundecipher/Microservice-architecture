import express,{Request,Response} from 'express';
import {body,validationResult} from 'express-validator'
import { RequestValidationError } from '../Errors/request-validation-error';
import { EmailInUseError } from '../Errors/email-inuse-error';
const router = express.Router();
import { Password } from "../services/password";
import {User} from '../database/db';


router.post('/api/users/signup',[
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({min:4,max:20}).withMessage('Password must be between 4 and 20 characters')
],async (req:Request,res:Response)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new RequestValidationError(errors.array());
    }
    const {email,password} = req.body;
    await findUser(email);
    const hashed = await Password.toHash(password);
    await User.create({ email:email, password:hashed });
    res.status(201).send({});
});

const findUser = async (email:string) =>{
    const existingUser =  await User.findOne({
        where: {
            email: email,
        }
    })
    if(existingUser){
        throw new EmailInUseError('Email in Use');
    }
}
export {router as signUpRouter};