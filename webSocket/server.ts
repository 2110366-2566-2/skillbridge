import http from 'http';
import { Server } from 'socket.io';
import { toClientMessage, toServerTextMessage } from '../types/chat';
import { saveImageMessage, saveTextMessage, validChatRoom } from './database';

const server = http.createServer((req, res) => { });

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"],
        allowedHeaders: ["chat-room-id", "user-id"],
        credentials: true
    },
    maxHttpBufferSize: 5 * 1e6, 
    pingTimeout: 60000
});

/*
Note : 
<Buffer ff d8 ...>'s type is Buffer and can be transform into Uint8Array which will be use to upload to S3
*/

const chatRoomIdToArrayOfSocketId = new Map<string, string[]>();

io.on('connection', async (socket) => {
    
    const socketId = socket.id;
    const chatRoomId = socket.handshake.headers['chat-room-id'] as string;
    const userId = socket.handshake.headers['user-id'] as string;
    console.log('A user connected', chatRoomId, socketId, userId);

    if (!chatRoomIdToArrayOfSocketId.has(chatRoomId)) {
        chatRoomIdToArrayOfSocketId.set(chatRoomId, []);
    }

    chatRoomIdToArrayOfSocketId.get(chatRoomId)?.push(socketId);

    if (! await validChatRoom(chatRoomId, userId) ) {
        console.log("Chat room or user id is not valid");
        socket.disconnect();
    }

    // Handle chat text messages
    socket.on('chat text message', async (message: toServerTextMessage) => {
        /* Handle chat message */
        console.log(message);

        // save message into db
        const messageToClient: toClientMessage = await saveTextMessage(chatRoomId, userId, message);

        // emits message back
        const socketsInTheRoom = chatRoomIdToArrayOfSocketId.get(chatRoomId) as string[];
        io.to(socketsInTheRoom).emit('chat text message', messageToClient);
    });

    // Handle chat image messages
    socket.on('chat image message', async (message) => {
        console.log(message);
        try {
            // save image to S3 and database
            const messageToClient: toClientMessage = await saveImageMessage(chatRoomId, userId, message);

            // emits image back
            const socketsInTheRoom = chatRoomIdToArrayOfSocketId.get(chatRoomId) as string[];
            io.to(socketsInTheRoom).emit('chat image message', messageToClient);
        } catch (err) {
            console.log(err);
        }
    });

    socket.on('disconnect', () => {
        const socketsInTheRoom = chatRoomIdToArrayOfSocketId.get(chatRoomId);
        if (socketsInTheRoom) {
            const socketIdToRemove = socketId;
            const indexToRemove = socketsInTheRoom.indexOf(socketIdToRemove);
            if (indexToRemove >= 0) {
                socketsInTheRoom.splice(indexToRemove, 1);
            }
            if (socketsInTheRoom.length === 0) {
                chatRoomIdToArrayOfSocketId.delete(chatRoomId);
            }
        }

        console.log('A user disconnected');
    });
});

server.listen(3001, () => {
    console.log('WebSocket server listening on port 3001');
});