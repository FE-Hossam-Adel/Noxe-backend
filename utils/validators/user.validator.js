import {validationResult , param , body} from "express-validator";


export const signUpValidator =[
    body('firstName').notEmpty().isString().withMessage('firstname must be string'),
    body('lastName').notEmpty().isString().withMessage('lastname must be string'),
    body('email').notEmpty().isEmail().withMessage('invalid email'),
    body('password').notEmpty().isString().withMessage('invalid email'),
    (req,res,nxt)=>{
        const err = validationResult(req);
        if(!err.isEmpty()){
            res.send(err.array())
        }else{
            nxt()
        }
    }
]