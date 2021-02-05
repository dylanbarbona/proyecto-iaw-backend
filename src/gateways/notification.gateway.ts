import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';
import { Roles, JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { UseGuards, Req } from '@nestjs/common';
import { Role } from '../models/user.model';
import { UserService } from 'src/services/user.service';

@WebSocketGateway()
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect{
    constructor(private readonly userService: UserService){ }

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('send_message')
    @Roles(Role.USER_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    handleEvent(client: Socket, data: any) {
        client.to(data.to).emit('receive_message', { from: client['user']._id, message: data.message })
    }

    @Roles(Role.USER_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async handleConnection(client: Socket) {
        return { connected: true, socket_id: client.id }
     }

    @SubscribeMessage('join_user_id')
    @Roles(Role.USER_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async joinUserId(client: Socket, data: string) {
        client.join(client['user']._id)
        return { connected: true, socket_id: client.id, user_id: client['user']._id }
    }

    @Roles(Role.USER_ROLE)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async handleDisconnect(client: Socket) {
        return { connected: false, socket_id: client.id }
    }
}