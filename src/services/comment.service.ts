import { Injectable } from '@nestjs/common';
import { PostService } from './post.service';
import { CreateCommentInput, DeleteCommentInput } from 'src/inputs/comment.input';
import { Post } from '../models/post.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CommentService {

    async create(post: Post, input: CreateCommentInput): Promise<Post>{
        post.comments.push(input)
        return await post.save()
    }

    async delete(post: Post, input: DeleteCommentInput){
        post.comments = post.comments.filter(item => 
            !(item._id == input._id && (item.user['_id'] == input.user || post.user['_id'] == input.user)))
        return await post.save()
    }
}
