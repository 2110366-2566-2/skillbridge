import http from 'http';
import { Server } from 'socket.io';
import { prisma } from '../lib/prisma';
import { toClientMessage, toServerMessage } from '../types/chat';
import uploadFileToS3 from '../actions/public/S3/uploadFileToS3'
import getS3URL from '../actions/public/S3/getS3URL';

async function uploadImageToS3(imageFile: File | undefined): Promise<string> { // return fileName in the system
    if (!imageFile) {
        throw {
            success: false,
            message: "upload image file to S3 failed"
        }
    }

    // manually create buffer because there's so many types of image and I don't wanna mess with the original createFileBuffer file
    if (imageFile.size > 1024 * 1024 * 5) {
        throw {
            success: false,
            message: "Files are too large",
        };
    }

    console.log(imageFile);
    const buffer: Uint8Array = new Uint8Array(await imageFile.arrayBuffer());

    const result: {
        success: boolean;
        data?: string; // fileName
        message?: string;
    } = await uploadFileToS3(buffer, imageFile.type, imageFile.size, "messageImageFiles", imageFile.name);

    if (!result.success || !result.data) {
        throw {
            success: false,
            message: "upload image file to S3 failed"
        }
    }

    return result.data;
}

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
implement function to upload image to S3
create a function to put message into database

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
    socket.on('chat message', async (message: toServerMessage) => {
        /* Handle chat message */
        console.log(message);
        console.log(typeof message.image);

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
            const fileName = await uploadImageToS3(message.image);
            const imageURLResponse = await getS3URL(fileName);

            if (!imageURLResponse.data) {
                console.log("failed to gt image URL");
            }
            const imageURL = imageURLResponse.data!;
            console.log(imageURL);

            messageToClient.content = imageURL;
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