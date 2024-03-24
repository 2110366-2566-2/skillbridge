import http from 'http';
import { Server } from 'socket.io';
import { prisma } from '../lib/prisma';
import { toClientMessage, toServerTextMessage } from '../types/chat';
import getS3URL from '../actions/public/S3/getS3URL';
import { uploadImageToS3 } from './uploadImageToS3';
import { saveImageMessage, saveTextMessage, validChatRoom } from './database';

const server = http.createServer((req, res) => { });

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["chat-room-id", "user-id"],
        credentials: true
    },
    maxHttpBufferSize: 5 * 1e6, 
    pingTimeout: 60000
});

/*
TODO : 
DONE : create a map mapping from chatRoomId => socketId[] to use for emitting to the right socket
DONE : implement function to upload image to S3
DONE : create a function to put message into database

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
        console.log('A user disconnected');
    });

    socket.on('error', function (err) {
        console.log(err);
    });

    socket.onAny((eventName, ...args) => {
        console.log(eventName);
        console.log(args);
      });
});

server.listen(3001, () => {
    console.log('WebSocket server listening on port 3001');
});

async function test() {
    const test = await prisma.application.findFirst({
        where: {
            jobId: ""
        }
    });

    console.log("test", test);
}

test();