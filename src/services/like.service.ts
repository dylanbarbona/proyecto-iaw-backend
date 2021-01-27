/*
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Like } from '../models/like.model';

@Injectable()
export class LikeService {
    constructor(@InjectModel('Like') private readonly likeModel: Model<Like>){ }
    
    async getAllLikes({ users }: SearchLikeInput, pagination: PaginationLikeInput): Promise<Like[]> {
        let userLikes = await this.likeModel.find({ users: { $in: users }})
            .skip(pagination.offset)
            .limit(pagination.limit)
            .sort([[pagination.orderBy, pagination.order]])
        userLikes.map(userLike => userLike.users = users)
        return userLikes
    }

    async getPostLikes({ post }: SearchLikeInput): Promise<Like> {
        return await this.likeModel.findOneAndUpdate({ post }, { post }, { upsert: true, useFindAndModify: false, new: true })
    }

    async add({ user, post }: LikeInput): Promise<Like> {
        let like = await this.likeModel.findOneAndUpdate({ post }, { post }, { upsert: true })
        like = await this.likeModel.findOneAndUpdate({ users: { $nin: [user] },  post }, { $push: { users: user }, post }, { useFindAndModify: false, new: true })
        if(!like)
            return await this.likeModel.findOneAndUpdate({ users: { $in: [user] }, post }, { $pull: { users: user }, post }, { useFindAndModify: false, new: true })
        return like
    }
}
*/