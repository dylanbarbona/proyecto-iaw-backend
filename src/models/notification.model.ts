import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document } from 'mongoose';
import { User } from './user.model';


export enum NotificationEnum {
    LIKE = "LIKE",
    COMMENT = "COMMENT",
    FOLLOW = "FOLLOW"
}

@Schema({ timestamps: true })
export class Notification extends Document{
    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'User', nullable: false, autopopulate: true }])
    from: string[]

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', nullable: false, autopopulate: true })
    to: string

    @Prop({ type: Boolean, nullable: false, default: false })
    viewed: boolean

    @Prop({ type: String, nullable: false })
    text: string

    @Prop({ nullable: false })
    type: NotificationEnum
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);