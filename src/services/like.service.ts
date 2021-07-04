import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Like } from '../models/like.model';
import { Order } from '../utils/utils';
import { Post } from '../models/post.model';
import { CreateLikeInput, UpdateLikeInput } from '../inputs/like.input';

@Injectable()
export class LikeService {
    private LIKES = 'likes.user'
    private SELECTED_FIELDS = '_id username name email profile_photo'

    constructor(@InjectModel('Post') readonly postModel: Model<Post>){ }

    async get(_id: String): Promise<Like[]>{
        const post = await this.postModel.findById(_id)
        return post.likes
    }

    async like(_id: String, input: CreateLikeInput): Promise<Post>{
        return await this.postModel.findOneAndUpdate(
            { _id, likes: { $not: { $elemMatch: input }}},
            { $push: { likes: input }},
            { useFindAndModify: false, new: true }
        )
    }

    async unlike(_id: String, input: UpdateLikeInput): Promise<Post>{
        return await this.postModel.findOneAndUpdate(
            { _id, likes: { $elemMatch: input }},
            { $pull: { likes: input }},
            { useFindAndModify: false, new: true }
        ).populate({ path: this.LIKES, select: this.SELECTED_FIELDS })
    }
}