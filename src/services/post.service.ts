import { Injectable, UseInterceptors, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose, mongo } from 'mongoose';
import { SearchPostInput, CreatePostInput, UpdatePostInput } from '../inputs/post.input';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';

@Injectable()
export class PostService {
    private readonly EMPTY_STRING = ''
    private readonly MAX_DATE = new Date(8640000000000000);
    private readonly MIN_DATE = new Date(-8640000000000000);
    private readonly LIMIT = 10
    private readonly SKIP = 0

    constructor(@InjectModel('Post') readonly PostModel: Model<Post>){ }

    async getFollowingPosts(user: User, search: SearchPostInput): Promise<Post[]>{
        const followings = user.followings.map(following => following._id)
        return await this.PostModel.find(
            { 
                user: { $in: followings }, 
                createdAt: { 
                    $gte: search.createdAt_min || this.MIN_DATE, 
                    $lt: search.createdAt_max || this.MAX_DATE 
                },
                updatedAt: { 
                    $gte: search.updatedAt_min || this.MIN_DATE, 
                    $lt: search.updatedAt_max || this.MAX_DATE 
                }
            })
            .limit(Number(search.limit) || this.LIMIT )    
            .skip(Number(search.skip) || this.SKIP)
    }

    async getPostByCategory(search: SearchPostInput): Promise<Post[]>{
        return await this.PostModel.find()
            .where("categories").in(search.categories)
            .limit(Number(search.limit) || this.LIMIT )    
            .skip(Number(search.skip) || this.SKIP)
    }

    async getPostByDescription(search: SearchPostInput): Promise<Post[]>{
        return await this.PostModel.find(
            { 
                //$text: { $search: search.description },
                createdAt: { 
                    $gte: search.createdAt_min || this.MIN_DATE, 
                    $lt: search.createdAt_max || this.MAX_DATE 
                },
                updatedAt: { 
                    $gte: search.updatedAt_min || this.MIN_DATE, 
                    $lt: search.updatedAt_max || this.MAX_DATE 
                }
            })
            .limit(Number(search.limit) || this.LIMIT )    
            .skip(Number(search.skip) || this.SKIP)
    }

    async getPostByUser(search: SearchPostInput): Promise<Post[]>{
        return await this.PostModel.find(
            { 
                user: search.user, 
                createdAt: { 
                    $gte: search.createdAt_min || this.MIN_DATE, 
                    $lt: search.createdAt_max || this.MAX_DATE 
                },
                updatedAt: { 
                    $gte: search.updatedAt_min || this.MIN_DATE, 
                    $lt: search.updatedAt_max || this.MAX_DATE 
                }
            })
            .limit(Number(search.limit) || this.LIMIT )    
            .skip(Number(search.skip) || this.SKIP)
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