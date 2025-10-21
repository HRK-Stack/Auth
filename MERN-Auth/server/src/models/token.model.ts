import mongoose, { Types } from "mongoose";

interface IToken extends mongoose.Document {
    userId : mongoose.Types.ObjectId,
    tokenHash : string,
    type : 'reset-password' | 'verify-email',
    expiresAt : Date,
    used : boolean
}

const TokenSchema = new mongoose.Schema<IToken>({
    userId : {type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    tokenHash:{type:String,required:true},
    type:{type:String,required:true},
    expiresAt:{type:Date,required:true},
    used:{type:Boolean,default:false},
},{timestamps:true});

TokenSchema.index({expiresAt:1},{expireAfterSeconds:0}); //delete document after expiry time end

export default mongoose.model<IToken>('Token',TokenSchema);