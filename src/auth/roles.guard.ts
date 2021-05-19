import { Injectable, ExecutionContext, CanActivate, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../models/user.model';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Injectable()
export class RolesGuard implements CanActivate{
    
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles)
            return true
        const request = context.switchToHttp().getRequest()
        const user = request.user
        return this.matchRoles(roles, user.roles);
    }

    private matchRoles(roles, userRoles){
        const match = userRoles.some(role => !!roles.find(item => item === role))
        if(!match)
            throw new UnauthorizedException()
        return match
    }
}