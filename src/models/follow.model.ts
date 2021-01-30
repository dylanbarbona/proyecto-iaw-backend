import { Prop, Schema, SchemaFactory,  } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, Model } from 'mongoose';

export interface Follower {
    user: String
    _id?: String
    updatedAt?: Date
    createdAt?: Date
}

export const Followers = new MongooseSchema({
    user: { type: MongooseSchema.Types.ObjectId, ref: 'User', required: true, unique: true, autopopulate: false },
}, { timestamps: true, versionKey: false });

export interface Following {
    user: String
    _id?: String
    updatedAt?: Date
    createdAt?: Date
}

export const Followings = new MongooseSchema({
    user: { type: MongooseSchema.Types.ObjectId, ref: 'User', required: true, unique: true, autopopulate: false },
}, { timestamps: true, versionKey: false });