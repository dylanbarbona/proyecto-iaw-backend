import { Injectable, UseInterceptors, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose, mongo } from 'mongoose';
import { SearchPostInput, CreatePostInput, UpdatePostInput } from '../inputs/post.input';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { EMPTY_STRING, MAX_DATE, MIN_DATE, LIMIT, SKIP } from '../utils/utils'
import { UserService } from './user.service';

@Injectable()
export class PostService {
    constructor(
        @InjectModel('Post') readonly postModel: Model<Post>,
        private readonly userService: UserService){ }

    async getRandomPosts(search: SearchPostInput){
        return await this.postModel.aggregate([{
            $sample: { size: ((search.skip-search.limit) > 0) ? search.skip-search.limit : 10 }
        }])
    }

    async getFollowingPosts(user_id: string, search: SearchPostInput): Promise<Post[]>{
        const user = await this.userService.get({ _id: user_id })
        return await this.postModel.find({
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
        return await this.postModel.find()
            .where("categories").in(search.categories)
            .limit(Number(search.limit) || LIMIT )    
            .skip(Number(search.skip) || SKIP)
    }

    async getPostByDescription(search: SearchPostInput): Promise<Post[]>{
        return await this.postModel.find({ 
                $text: { $search: search.description },
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
        return await this.postModel.find({
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
        return await this.postModel.findOne(search)
    }

    async create(input: CreatePostInput): Promise<Post>{
        return await new this.postModel(input).save()
    }

    async update({ _id }: SearchPostInput, input: UpdatePostInput): Promise<Post>{
        let posts = await this.postModel.findByIdAndUpdate(_id, 
            {
                description: input.description,
                $pull: { 
                    metadata: { public_id: { $in: input.deleteFiles || [] }},
                    categories: { $in: input.deleteCategories || [] }
                }
            }, { new: true, useFindAndModify: false, multi: true })
        return await this.postModel.findByIdAndUpdate(_id, 
            { 
                $push: {
                    metadata: { $each: input.metadata || [] },
                    categories: { $each: input.addCategories || [] }
                }
            },
            { new: true, useFindAndModify: false, multi: true })
    }

    async delete(search: SearchPostInput): Promise<Post>{
        return await this.postModel.findOneAndDelete(search)
    }

    private getDate(date: Date, otherDate: Date){
        return date ? date.getTime() : otherDate.getTime()
    }
}