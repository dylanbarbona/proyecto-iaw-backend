import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostService } from './post.service';
import { CreateCommentInput, DeleteCommentInput, UpdateCommentInput, SearchCommentInput } from '../inputs/comment.input';
import { Post } from '../models/post.model';
import { Comment, Comments } from '../models/comment.model';
import { Order } from '../utils/utils';

@Injectable()
export class CommentService {
    private COMMENTS = 'comments.user'
    private SELECTED_FIELDS = '_id username name email profile_photo'

    constructor(@InjectModel('Post') readonly PostModel: Model<Post>){ }
    
    async get(_id: String): Promise<Comment[]>{
        const post = await this.PostModel.findById(_id)
            .populate({ path: this.COMMENTS, select: this.SELECTED_FIELDS })
        return post.comments
    }

    async create(_id: String, input: CreateCommentInput){
        return await this.PostModel.findByIdAndUpdate(
            _id, 
            { $push: { comments: input }}, 
            { useFindAndModify: false, new: true }
        ).populate('comments.user', '_id name username profile_photo')
    }

    async update(_id: String, search: SearchCommentInput, input: UpdateCommentInput): Promise<Comment[]>{
        const post = await this.PostModel.findOneAndUpdate(
            { _id, comments: { $elemMatch: { _id: search._id, user: search.user }}}, 
            { $set: { 'comments.$.text': input.text }},
            { useFindAndModify: false, new: true }
        )
        return post.comments
    }

    async delete(_id: String, input: DeleteCommentInput): Promise<Comment[]>{
        const post = await this.PostModel.findOneAndUpdate(
            { _id, comments: { $elemMatch: { _id: input._id, user: input.user }}}, 
            { $pull: { comments: input } },
            { useFindAndModify: false, new: true }
        )
        return post.comments
    }
}
