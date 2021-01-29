import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Like } from '../models/like.model';
import { Order } from '../utils/order';
import { Post } from '../models/post.model';
import { LikeInput } from '../inputs/like.input';

@Injectable()
export class LikeService {

    async get(post: Post, order: Order = Order.DESC){
        return this.sortByDate(post.likes, order)
    }

    async like(post: Post, input: LikeInput){
        const index = post.likes.findIndex(like => like.user['_id'] == input.user)
        index >= 0 ? post.likes = post.likes.splice(index, 0) : post.likes.push(input)
        post = await post.save()
        return post.likes
    }
    
    private sortByDate(comments: Like[], order: Order = Order.DESC){
        if(Number(Order[order]) == Order.ASC)
            return comments.sort((a,b) => a.createdAt > b.createdAt ? 1 : -1)
        else if(Number(Order[order]) == Order.DESC)
            return comments.sort((a,b) => a.createdAt < b.createdAt ? 1 : -1)
        return comments
    }
}