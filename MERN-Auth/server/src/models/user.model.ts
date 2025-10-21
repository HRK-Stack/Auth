import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import config from '../config/config.js';

export interface IUser extends mongoose.Document {
    email: string;
    password?: string;
    name?: string;
    isEmailVerified: boolean;
    provider?: string;
    providerId?: string;
    roles: string[];
    failedLoginAttempts: number;
    lockUntil?: Date | null;
}

const UserSchema = new mongoose.Schema<IUser>({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String ,minLength:8,maxLength:64},
    name: { type: String },
    isEmailVerified: { type: Boolean, default: false },
    provider: { type: String, default: 'local' },
    providerId: { type: String },
    roles: { type: [String], default: ['user'] },
    failedLoginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date, default: null },
}, 
{ 
    timestamps: true,
    toJSON:{
        transform(doc, ret) {
            const {__v,password,...user} = ret
            return user;
        },
    }
});

UserSchema.index({email:1},{unique:true});

UserSchema.pre("save",async function(next){
    if( !this.password || !this.isModified('password')) return next()
    const salt = await bcrypt.genSalt(config.bcryptSaltRounds);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

UserSchema.methods.comparePassword = async function(candidate:string){
    return bcrypt.compare(candidate,this.password);
}

UserSchema.methods.isLocked = function(){
    return !!(this.lockUntil && this.lockUntil > new Date());
}

export default mongoose.model<IUser>('User', UserSchema);