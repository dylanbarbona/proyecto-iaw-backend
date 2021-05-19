import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Collection } from '../models/collection.model';
import { Model } from 'mongoose';
import { SearchCollectionInput, CreateCollectionInput, UpdateCollectionInput } from 'src/inputs/collection.input';
import { userInfo } from 'os';

@Injectable()
export class CollectionService {
    private readonly EMPTY_STRING = ''
    private readonly LIMIT = 10
    private readonly SKIP = 0

    constructor(@InjectModel('Category') private readonly collectionModel: Model<Collection>){ }

    async getAll(search: SearchCollectionInput): Promise<Collection[]>{
        return await this.collectionModel
            .find({ user: search.user })
            .populate('posts')
            .limit(this.LIMIT)
            .skip(this.SKIP)
    }

    async get(search: SearchCollectionInput): Promise<Collection>{
        return await this.collectionModel
            .findOne({ _id: search._id, user: search.user })
            .populate('posts')
    }

    async create(input: CreateCollectionInput): Promise<Collection>{
        return await new this.collectionModel(input).save()
    }

    async addPost(search: SearchCollectionInput, input: UpdateCollectionInput): Promise<Collection>{
        return await this.collectionModel.findOneAndUpdate(
            { _id: search._id, user: search.user }, 
            { $push: { posts: input.post }},
            { new: true, useFindAndModify: false }   
        )
    }

    async removePost(search: SearchCollectionInput, input: UpdateCollectionInput): Promise<Collection>{
        return await this.collectionModel.findOneAndUpdate(
            { _id: search._id, user: search.user }, 
            { $pull: { posts: input.post }},
            { new: true, useFindAndModify: false }   
        )
    }

    async delete(search: SearchCollectionInput): Promise<Collection>{ 
        return await this.collectionModel.findOneAndDelete({
            _id: search._id,
            user: search.user
        })
    }
}
