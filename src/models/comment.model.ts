import { Prop, Schema, SchemaFactory,  } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, Model } from 'mongoose';

export interface Comment {
    user: String
    text: String
    _id?: String
    updatedAt?: Date
    createdAt?: Date
}

export const Comments = new MongooseSchema({
    user: { type: MongooseSchema.Types.ObjectId, ref: 'User', required: true, autopopulate: true },
    text: { type: String, required: true }
}, { timestamps: true, versionKey: false });
