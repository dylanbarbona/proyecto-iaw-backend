import { Prop, Schema, SchemaFactory,  } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, Model } from 'mongoose';

export class Like extends Document{
    user: string
}

export const Likes = new MongooseSchema({
    user: { type: MongooseSchema.Types.ObjectId, ref: 'User', autopopulate: true },
}, { timestamps: true, versionKey: false });