import http from 'http';
import { Server } from 'socket.io';
import { prisma } from '../lib/prisma';

const server = http.createServer((req, res) => { });

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["chat-room-id"],
        credentials: true
    }
});

/*
TODO : 
create a map mapping from chatRoomId => socketId[] to use for emitting to the right socket
create a function to put message into database
*/


io.on('connection', async (socket) => {
    console.log('A user connected', socket.id);

    const chatRoomId = socket.handshake.headers['chat-room-id'] as string;
    console.log(chatRoomId);

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
    socket.on('chat message', (message) => {
        /* Handle chat message */
        io.emit('chat message', message);
        console.log(socket.id, chatRoomId, message);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
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