import { CustomError } from "./custom-error";


export class EmailInUseError extends CustomError{
 
    statusCode = 500;
    constructor(public reason:string){
        super(reason);
        Object.setPrototypeOf(this,EmailInUseError.prototype);
    }
    serializeErrors(){
        return [
            {
                message: this.reason
            }
        ];
    }
}

