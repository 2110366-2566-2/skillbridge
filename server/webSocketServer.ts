import http from 'http';
import { Server } from 'socket.io';
import { prisma } from '../lib/prisma';
import { toClientMessage, toServerMessage } from '../types/chat';

const server = http.createServer((req, res) => { });

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["chat-room-id", "user-id"],
        credentials: true
    },
    maxHttpBufferSize: 1e8, 
    pingTimeout: 60000
});

/*
TODO : 
DONE : create a map mapping from chatRoomId => socketId[] to use for emitting to the right socket
create a function to put message into database
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

    /*
    this commented code is use to check if such chatRoomId exists
    omits for now as I am using made up chatRoomId which doesn't exists in database

    const chatRoom = await prisma.chatroom.findFirst({
        where: {
            id: chatRoomId
        }
    });

    if (chatRoom === null) {
        console.log("Chatroom does not exists");
        socket.disconnect();
    }
    */

    // Handle chat messages
    socket.on('chat message', (message: toServerMessage) => {
        /* Handle chat message */
        const messageToClient: toClientMessage = {
            senderId: userId,
            timeStamp: new Date(),
            isImage: message.isImage,
            content: message.isImage ? "This supposed to be an image" : message.text
        };

        if (message.isImage) {
            //TODO : 
            //1. store image in S3
            //2. put the imageURL in messageToClient.imageURL
            console.log(message);
        }

        

        // console.log(messageToClient);

        const socketsInTheRoom = chatRoomIdToArrayOfSocketId.get(chatRoomId) as string[];
        io.to(socketsInTheRoom).emit('chat message', messageToClient);
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