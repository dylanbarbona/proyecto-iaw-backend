import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../models/user.model';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}