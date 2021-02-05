import { Prop, Schema, SchemaFactory,  } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, Model } from 'mongoose';

export class Comment extends Document{
    user: string
    text: string
}

export const Comments = new MongooseSchema({
    user: { type: MongooseSchema.Types.ObjectId, ref: 'User' },
    text: { type: String }
}, { timestamps: true, versionKey: false });
