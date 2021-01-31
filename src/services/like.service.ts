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

    constructor(@InjectModel('Post') readonly PostModel: Model<Post>){ }

    async get(_id: String): Promise<Like[]>{
        const post = await this.PostModel.findById(_id)
            .populate({ path: this.LIKES, select: this.SELECTED_FIELDS})
        return post.likes
    }

    async like(_id: String, input: CreateLikeInput): Promise<Like[]>{
       let post = await this.PostModel.findOneAndUpdate(
            { _id, likes: { $not: { $elemMatch: input }}},
            { $push: { likes: input }},
            { useFindAndModify: false, new: true }
        )
        post = await this.PostModel.findById(_id).populate({ path: this.LIKES, select: this.SELECTED_FIELDS })
        return post.likes
    }

    async unlike(_id: String, input: UpdateLikeInput): Promise<Like[]>{
        let post = await this.PostModel.findOneAndUpdate(
            { _id, likes: { $elemMatch: input }},
            { $pull: { likes: input }},
            { useFindAndModify: false, new: true }
        )
        post = await this.PostModel.findById(_id).populate({ path: this.LIKES, select: this.SELECTED_FIELDS })
        return post.likes
    }
}