import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError{
    errors:ValidationError[]=[];
    statusCode = 400;
    constructor(errors: ValidationError[]){
        super('Error in Email or password');
        Object.setPrototypeOf(this,RequestValidationError.prototype);
        this.errors = errors
    }
    serializeErrors(){
        return this.errors.map(err=>{
            return {message:err.msg,field: err.param};
        })
    }
}

