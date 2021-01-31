import { Prop, Schema, SchemaFactory,  } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, Model } from 'mongoose';

export class Comment extends Document{
    user: String
    text: String
}

export const Comments = new MongooseSchema({
    user: { type: MongooseSchema.Types.ObjectId, ref: 'User' },
    text: { type: String }
}, { timestamps: true, versionKey: false });
