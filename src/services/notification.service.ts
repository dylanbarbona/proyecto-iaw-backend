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
        return await this.notificationModel.findOneAndUpdate(search, input, { new: true, useFindAndModify: false, upsert: true })
    }

    async delete(input: DeleteNotificationInput){
        return await this.notificationModel.findByIdAndDelete(input)
    }
}
