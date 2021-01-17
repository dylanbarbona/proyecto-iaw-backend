import { Injectable, UseInterceptors, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SearchPostInput, CreatePostInput, UpdatePostInput } from '../inputs/post.input';
import { Post } from '../models/post.model';

@Injectable()
export class PostService {
    private readonly EMPTY_STRING = ''
    private readonly MAX_DATE = new Date(8640000000000000);
    private readonly MIN_DATE = new Date(-8640000000000000);
    private readonly LIMIT = 10
    private readonly SKIP = 0

    constructor(@InjectModel('Post') readonly PostModel: Model<Post>){ }

    async getAll(search: SearchPostInput): Promise<Post[]>{
        return await this.PostModel.find({
            user: search.user || this.EMPTY_STRING,
            categories: { $in: search.categories },
            $text: { $search:  search.description || this.EMPTY_STRING },
            createdAt: { 
                $gte: search.createdAt_min || this.MIN_DATE, 
                $lt: search.createdAt_max || this.MAX_DATE 
            },
            updateddAt: { 
                $gte: search.updatedAt_min || this.MIN_DATE, 
                $lt: search.updatedAt_max || this.MAX_DATE 
            }
        }).limit(search.limit || this.LIMIT).skip(search.skip || this.SKIP)
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