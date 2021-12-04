import { NextPage } from "next";
import ChatHeader from "../../components/Chat/ChatHeader";
import ChatInputForm from "../../components/Chat/ChatInputForm";
import FriendChatBox from "../../components/Chat/FriendChatBox";
import MyChatBox from "../../components/Chat/MyChatBox";

const ChatPage: NextPage = () => {
  return (
    <div className="app-container">
      <ChatHeader />
      <div className="chat-layout">
        <FriendChatBox>Fuck yu</FriendChatBox>
        <MyChatBox>Anjing lo</MyChatBox>
        <MyChatBox>Anjing lo</MyChatBox>
        <MyChatBox>Anjing lo</MyChatBox>
        <MyChatBox>Anjing lo</MyChatBox>
        <MyChatBox>Anjing lo</MyChatBox>
        <MyChatBox>Anjing lo</MyChatBox>
        <MyChatBox>Anjing lo</MyChatBox>
        <MyChatBox>Anjing lo</MyChatBox>
        <MyChatBox>Anjing lo</MyChatBox>
        <MyChatBox>Anjing lo</MyChatBox>
        <MyChatBox>Anjing lo</MyChatBox>
        <MyChatBox>Anjing lo</MyChatBox>
        <MyChatBox>Anjing lo</MyChatBox>
        <MyChatBox>Anjing lo</MyChatBox>
        <MyChatBox>Anjing lo</MyChatBox>
      </div>
      <ChatInputForm />
    </div>
  );
};

export default ChatPage;
