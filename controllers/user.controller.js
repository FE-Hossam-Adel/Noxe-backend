import asyncHandler  from "express-async-handler";
import usermodel from "../models/user.model.js"
import nodemailer from "nodemailer"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port:587,
    secure: false,
    auth: {
        user: 'fe.hossamadel@gmail.com',
        pass: 'umoucurhirydxqrz'
    }
});

export const addUser =asyncHandler(
    async (req,res,nxt)=>{

        const foundUser = await usermodel.findOne({ email: req.body.email });
        if (foundUser) {
            return nxt(new Error("this email is exists"))
        } else {
            let usr = new usermodel({...req.body});
            usr.save().then(()=>{
                transporter.sendMail({
                    from: 'fe.hossamadel@gmail.com',
                    to: usr.email,
                    subject: 'Welcome to our platform!',
                    html: `
                        your verfication code is ${usr.verificationCode}
                        <br>
                         <a href="http://localhost:3001/verfication/${Buffer.from(`email=${usr.email}`).toString('base64')}">verifiy now</a>
                    `
                }, (err, info) => {
                    if (err) {
                        console.error('Error sending email:', err);
                        // Handle error
                    } else {
                        console.log('Email sent:', info.response);
                        // Handle success
                    }
                });
                res.send(usr)
            }).catch(nxt)
        }    
    }
)


export const verifyByOtp =asyncHandler(
    async (req,res,nxt)=>{
        const foundUser = await usermodel.findOne({ email: req.body.email });
        if (foundUser && foundUser.verified === false){
            if (foundUser.verificationCode === req.body.verificationCode) {
                foundUser.verified = true;
                await foundUser.save();
                res.send({
                    message:"you are verified"
                })
            } else {
                res.send({
                    message:"invalid verification code"
                })
            } 
        }else{
            res.send({
                message:"this email not found or verification code is invalid"
            })
        }
           
    }
)



export const loginUser =asyncHandler(
    async (req,res,nxt)=>{
        const foundUser = await usermodel.findOne({ email: req.body.email });
        if (foundUser){
            if (foundUser.verified === true) {

                bcrypt.compare( req.body.password, foundUser.password, function(err, result) {
                    if (err) {
                        // Handle error
                    } else if (result) {
                        console.log(foundUser)
                        delete foundUser.password
                        console.log(foundUser)

                        jwt.sign({
                            firstName:foundUser.firstName,
                            lastName:foundUser.lastName,
                            email:foundUser.email
                        }, 'shhh', (err, token) => {
                            if (!err) {
                                res.send({
                                    token:token
                                })
                            }
                        });
                    } else {
                        res.send({
                            message:"email or password is not correct"
                        })
                    }
                });
                // foundUser.verified = true;
                // await foundUser.save();
                // res.send({
                //     message:"you are verified"
                // })
            } else {
                res.send({
                    message:"this email is not verified"
                })
            } 
        }else{
            // res.send({
            //     message:"this email not found or verification code is invalid"
            // })
        }
           
    }
)