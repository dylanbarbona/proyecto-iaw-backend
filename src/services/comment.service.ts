import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostService } from './post.service';
import { CreateCommentInput, DeleteCommentInput, UpdateCommentInput, SearchCommentInput } from '../inputs/comment.input';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';
import { Order } from '../utils/order';

@Injectable()
export class CommentService {
    
    async get(post: Post, order: Order = Order.DESC){
        return this.sortByDate(post.comments, order)
    }

    async create(post: Post, input: CreateCommentInput): Promise<Post>{
        post.comments.push(input)
        post.comments = this.sortByDate(post.comments)
        return await post.save()
    }

    async update(post: Post, id_comment: string, input: UpdateCommentInput): Promise<Post>{
        post.comments.forEach(comment => {
            if(comment._id == id_comment)
                comment.text = input.text
        })
        post.comments = this.sortByDate(post.comments)
        return await post.save()
    }

    async delete(post: Post, input: DeleteCommentInput){
        post.comments = post.comments.filter(item => 
            !(item._id == input._id && (item.user['_id'] == input.user || post.user['_id'] == input.user)))
        post.comments = this.sortByDate(post.comments)
        return await post.save()
    }

    private sortByDate(comments: Comment[], order: Order = Order.DESC){
        if(Number(Order[order]) == Order.ASC)
            return comments.sort((a,b) => a.createdAt > b.createdAt ? 1 : -1)
        else if(Number(Order[order]) == Order.DESC)
            return comments.sort((a,b) => a.createdAt < b.createdAt ? 1 : -1)
        return comments
    }
}
