import {
  getStudentChatListData,
  getEmployerChatListData,
} from "@/actions/chat/getChatListDataByUser";
import { getMessageByChatRoom } from "@/actions/chat/getMessageByChatRoom";

export default async function page() {
  const studentId = "1d0bcf15-bd80-4e5a-8d1a-adbd2686d7fb";
  const StudentChatListData = await getStudentChatListData(studentId);
  console.log(
    JSON.stringify(
      StudentChatListData,
      function (key, value) {
        if (
          typeof value === "object" &&
          value !== null &&
          !Array.isArray(value)
        ) {
          return Object.assign({}, value);
        }
        return value;
      },
      2,
    ),
  );

  const employerId = "fe9e109d-36ec-476c-91da-7ac3a225daf4";
  const EmployerChatListData = await getEmployerChatListData(employerId);
  console.log(
    JSON.stringify(
      EmployerChatListData,
      function (key, value) {
        if (
          typeof value === "object" &&
          value !== null &&
          !Array.isArray(value)
        ) {
          return Object.assign({}, value);
        }
        return value;
      },
      2,
    ),
  );

  const chatroomId = "e54d596f-00ef-4a7b-8167-0b7769042135";
  const ChatRoomMessages = await getMessageByChatRoom(chatroomId);
  console.log("ChatRoomMessage: ", ChatRoomMessages);
}
