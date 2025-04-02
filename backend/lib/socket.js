import { Server } from "socket.io";
import http from "http";
import express from 'express';

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173'],
    }
});

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
  }

const userSocketMap = {} //{userId : socketId}

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    console.log(socket.handshake.query.userId);
    const userId = socket.handshake.query.userId

    if (userId) userSocketMap[userId] = socket.id
    console.log(userSocketMap);
    
    io.emit('onlineUsers', Object.keys(userSocketMap))
    
    
    socket.on('disconnect', () => {
        console.log('a user disconnected', socket.id);
        delete userSocketMap[userId]
        io.emit('onlineUsers', Object.keys(userSocketMap))
      });
});

export {io, app, server};