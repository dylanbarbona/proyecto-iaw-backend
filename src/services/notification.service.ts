import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Notification } from '../models/notification.model'
import { 
    SearchNotificationInput, 
    CreateNotificationInput, 
    UpdateNotificationInput, 
    DeleteNotificationInput } from '../inputs/notification.input';

@Injectable()
export class NotificationService {
    constructor(@InjectModel('Post') readonly notificationModel: Model<Notification>){ }

    async get(search: SearchNotificationInput){
        return await this.notificationModel.find(search)
    }

    async create(input: CreateNotificationInput){
        return await new this.notificationModel(input).save()
    }

    async update(search: SearchNotificationInput, input: UpdateNotificationInput){
        return await this.notificationModel.findOneAndUpdate(search, input, { new: true, useFindAndModify: false })
    }

    async delete(input: DeleteNotificationInput){
        return await this.notificationModel.findByIdAndDelete(input)
    }
}
