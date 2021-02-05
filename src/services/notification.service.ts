import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Notification } from '../models/notification.model'
import { 
    SearchNotificationInput, 
    CreateNotificationInput, 
    DeleteNotificationInput } from '../inputs/notification.input';

@Injectable()
export class NotificationService {
    constructor(@InjectModel('Notification') readonly notificationModel: Model<Notification>){ }

    async get(search: SearchNotificationInput){
        return await this.notificationModel.find(search)
    }

    async create(search: SearchNotificationInput, input: CreateNotificationInput){
        return await this.notificationModel.findOneAndUpdate(
            {
                to: search.to,
                origin: search.origin,
                type: search.type
            }, 
            {
                $addToSet: { from: input.from },
                to: input.to,
                viewed: input.viewed,
                origin: input.origin,
                type: input.type
            },
            { 
                new: true, 
                useFindAndModify: false, 
                upsert: true 
            })
            .populate('from', '_id username name profile_photo')
            .populate('to', '_id username name profile_photo')
    }

    async delete(input: DeleteNotificationInput){
        return await this.notificationModel.findByIdAndDelete(input)
    }
}
