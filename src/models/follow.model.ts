import { Prop, Schema, SchemaFactory,  } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, Model } from 'mongoose';

export interface Follower {
    user: string
}

export const Followers = new MongooseSchema({
    user: { type: MongooseSchema.Types.ObjectId, ref: 'User' },
}, { versionKey: false, _id: false });

export interface Following {
    user: string
}

export const Followings = new MongooseSchema({
    user: { type: MongooseSchema.Types.ObjectId, ref: 'User' },
}, { versionKey: false, _id: false });