import { CreateCommentInput, UpdateCommentInput } from "./comment.input";
import { Metadata } from "../models/metadata.model";
import { NotificationEnum } from "src/models/notification.model";

export interface CreateNotificationInput {
    to: string
    viewed: boolean
    origin: string
    type: NotificationEnum
}

export interface SearchNotificationInput {
    _id?: string
    to: string
    viewed?: boolean
    origin?: string
    type?: NotificationEnum
    createdAt_max?: Date
    createdAt_min?: Date
    updatedAt_max?: Date
    updatedAt_min?: Date
    limit?: number
    skip?: number
}

export interface DeleteNotificationInput {
    _id: string
    user: string
}