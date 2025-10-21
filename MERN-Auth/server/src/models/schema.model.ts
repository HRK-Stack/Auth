import mongoose, { mongo } from "mongoose";

interface ISession {
    userId:mongoose.Types.ObjectId;
    refreshTokenHash:string;
    ip?:string;
    userAgent?:string;
    createdAt:Date;
    lastUsedAt?:Date;
    revokedAt?:Date | null;
    replacedBy?:mongoose.Types.ObjectId | null;
}

const SessionSchema = new mongoose.Schema<ISession>({
    userId:{type:mongoose.Schema.Types.ObjectId , ref:'User' ,required:true},
    refreshTokenHash:{type:String,required:true},
    ip:{type:String},
    userAgent:{type:String},
    lastUsedAt:{type:String},
    revokedAt:{type:Date},
    replacedBy:{type:Date},
},{timestamps:{createdAt:true,updatedAt:'lastUsedAt'}});

export default mongoose.model<ISession>('Session',SessionSchema);

