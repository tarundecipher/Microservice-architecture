import {Request,Response,NextFunction} from 'express'
import { CustomError } from '../Errors/custom-error';

const errorHandler = (err:Error,req:Request,res:Response,next:NextFunction)=>{
    if(err instanceof CustomError){
        return res.status(err.statusCode).send({errors:err.serializeErrors()});
    }
    res.status(400).send({errors:[{message:'Something went wrong'}]});
}

export {errorHandler as errorHandler}
/*
{
    default error message structure sent to client

    errors:[{
        message: string,field?:string
    },]
}
*/