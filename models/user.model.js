import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true,"required"]
    },
    lastName: {
        type: String,
        required: [true,"required"]
    },
    email: {
        type:String,
        required: [true,"required"]
    },
    password: {
        type: String,
        required: [true,"required"]
    },
    verificationCode: {
        type: String,
    },
    verified: {
        type: Boolean,
        default:false
    },
})


userSchema.pre('save', async function (next) {
    try {
      if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        this.verificationCode = Math.floor(100000 + Math.random() * 900000);
      }
      next();
    } catch (error) {
      next(error);
    }
  });

userSchema.post('save', async function (next) {
    console.log(this)
    // try {
    //   if (this.isModified('password') || this.isNew) {
    //     const salt = await bcrypt.genSalt(10);
    //     const hash = await bcrypt.hash(this.password, salt);
    //     this.password = hash;
    //     this.verificationCode = Math.floor(100000 + Math.random() * 900000);
    //   }
    //   next();
    // } catch (error) {
    //   next(error);
    // }
  });


  
const usermodel = mongoose.model('user',userSchema)
export default usermodel;