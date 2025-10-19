import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs';
import config from '../config/config.js';

interface IUser extends Document {
    name:string,
    email:string,
    password:string,
    verified:boolean,
    comparePassword(candidate:string):Promise<boolean>
}

const userSchema = new Schema<IUser>(
    {
        name:{type:String, required:true,trim:true},
        email:{type:String,required:true,unique:true,lowercase:true},
        password:{type:String,required:true,select:false,minlength:6},
        verified:{type:Boolean,default:false},
    },
    {
        timestamps:true
    }
);

userSchema.pre("save",async function(next){
    if(!this.isModified('password')) return next()
    const salt = await bcrypt.genSalt(config.bcryptSaltRounds);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

userSchema.methods.comparePassword = async function(candidate:string){
    return bcrypt.compare(candidate,this.password);
}

export default mongoose.model<IUser>("User",userSchema);