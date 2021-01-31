import { Injectable, UseInterceptors, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose, mongo } from 'mongoose';
import { SearchPostInput, CreatePostInput, UpdatePostInput } from '../inputs/post.input';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { EMPTY_STRING, MAX_DATE, MIN_DATE, LIMIT, SKIP } from '../utils/utils'

@Injectable()
export class PostService {
    constructor(@InjectModel('Post') readonly PostModel: Model<Post>){ }

    async getFollowingPosts(user: User, search: SearchPostInput): Promise<Post[]>{
        return await this.PostModel.find(
            { 
                user: { $in: user.followings.map(following => following.user) }, 
                createdAt: { 
                    $gte: search.createdAt_min || MIN_DATE, 
                    $lt: search.createdAt_max || MAX_DATE 
                },
                updatedAt: { 
                    $gte: search.updatedAt_min || MIN_DATE, 
                    $lt: search.updatedAt_max || MAX_DATE 
                }
            })
            .limit(Number(search.limit) || LIMIT )    
            .skip(Number(search.skip) || SKIP)
    }

    async getPostByCategory(search: SearchPostInput): Promise<Post[]>{
        return await this.PostModel.find()
            .where("categories").in(search.categories)
            .limit(Number(search.limit) || LIMIT )    
            .skip(Number(search.skip) || SKIP)
    }

    async getPostByDescription(search: SearchPostInput): Promise<Post[]>{
        return await this.PostModel.find(
            { 
                //$text: { $search: search.description },
                createdAt: { 
                    $gte: search.createdAt_min || MIN_DATE, 
                    $lt: search.createdAt_max || MAX_DATE 
                },
                updatedAt: { 
                    $gte: search.updatedAt_min || MIN_DATE, 
                    $lt: search.updatedAt_max || MAX_DATE 
                }
            })
            .limit(Number(search.limit) || LIMIT )    
            .skip(Number(search.skip) || SKIP)
    }

    async getPostByUser(search: SearchPostInput): Promise<Post[]>{
        return await this.PostModel.find(
            { 
                user: search.user, 
                createdAt: { 
                    $gte: search.createdAt_min || MIN_DATE, 
                    $lt: search.createdAt_max || MAX_DATE 
                },
                updatedAt: { 
                    $gte: search.updatedAt_min || MIN_DATE, 
                    $lt: search.updatedAt_max || MAX_DATE 
                }
            })
            .limit(Number(search.limit) || LIMIT )    
            .skip(Number(search.skip) || SKIP)
    }

    async get(search: SearchPostInput): Promise<Post>{
        return await this.PostModel.findOne(search)
    }

    async create(input: CreatePostInput): Promise<Post>{
        return await new this.PostModel(input).save()
    }

    async update(search: SearchPostInput, input: UpdatePostInput): Promise<Post>{
        return await this.PostModel.findOneAndUpdate(search, input, { new: true, useFindAndModify: false })
    }

    async delete(search: SearchPostInput): Promise<Post>{
        return await this.PostModel.findOneAndDelete(search)
    }
}