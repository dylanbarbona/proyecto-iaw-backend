import { Prop, Schema, SchemaFactory,  } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, Model } from 'mongoose';

export interface Metadata extends Document{
    updatedAt?: Date,
    createdAt?: Date,
    asset_id: string,
    public_id: string,
    version: number,
    version_id: string
    signature: string
    width: number,
    height: number,
    format: string,
    resource_type: string,
    created_at: Date,
    tags: string[],
    pages: number,
    bytes: number,
    type: string,
    etag: string,
    placeholder: boolean,
    url: string,
    secure_url: string,
    original_filename: string,
    audio: {
        codec: string,
        bit_rate: string,
        frequency: number,
        channels: number,
        channel_layout: string
    }
    video: {
        pix_format: string,
        codec: string,
        level: number,
        profile: string,
        bit_rate: string
    },
    is_audio: boolean,
    frame_rate: number,
    bit_rate: number,
    duration: number,
    rotation: number,
    nb_frames: number
}

export const MetadataSchema = new MongooseSchema({
    asset_id: String,
    public_id: String,
    version: Number,
    version_id: String,
    signature: String,
    width: Number,
    height: Number,
    format: String,
    resource_type: String,
    created_at: Date,
    tags: [String],
    pages: Number,
    bytes: Number,
    type: String,
    etag: String,
    placeholder: Boolean,
    url: String,
    secure_url: String,
    original_filename: String,
    audio: {
        codec: String,
        bit_rate: String,
        frequency: Number,
        channels: Number,
        channel_layout: String
    },
    video: {
        pix_format: String,
        codec: String,
        level: Number,
        profile: String,
        bit_rate: String
    },
    is_audio: Boolean,
    frame_rate: Number,
    bit_rate: Number,
    duration: Number,
    rotation: Number,
    nb_frames: Number
}, { timestamps: true, versionKey: false });