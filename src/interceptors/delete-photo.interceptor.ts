import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { Observable, pipe } from "rxjs";
import { Post } from "../models/post.model";
import { tap } from "rxjs/operators";

@Injectable()
export class DeletePhotosInterceptor implements NestInterceptor {
    constructor(private readonly cloudinaryService: CloudinaryService){ }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            tap((post: Post) => {
                post.metadata.forEach(metadata => {
                    this.cloudinaryService.delete(metadata.public_id)
                })
            })
        )
    }
}