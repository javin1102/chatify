import { NextPage } from "next";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatHeader from "../../components/Chat/ChatHeader";
import ChatInputForm from "../../components/Chat/ChatInputForm";
import FriendChatBox from "../../components/Chat/FriendChatBox";
import MyChatBox from "../../components/Chat/MyChatBox";
import { getChatCollection, auth, getFriendDoc } from "../../utils/utils";
import { useRouter } from "next/router";
import { limit, orderBy, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useEffect, useRef, useState } from "react";
import { ChatType } from "../../utils/structure";
const ChatPage: NextPage = () => {
	const [userAuth] = useAuthState(auth);
	const [chatCollection, setChatCollection] = useState(null);
	const router = useRouter();
	const myQuery = !!chatCollection && query<ChatType>(chatCollection, orderBy("createdAt"), limit(25));
	const [chats] = useCollectionData<ChatType>(myQuery, { idField: "id" });

	useEffect(() => {
		const friendId = router.query.id;
		if (!friendId || !userAuth) return;
		const chatColl = getChatCollection(userAuth?.uid as string, friendId as string);
		setChatCollection(chatColl);
	}, [router, userAuth]);

	const divRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		divRef.current.scrollTo(0, divRef.current.scrollHeight);
	}, [chats]);
	return (
		<div className="app-container">
			<ChatHeader userId={userAuth?.uid} />
			<div className="chat-layout" ref={divRef}>
				{chats &&
					chats.map((chat) =>
						chat.sender ? <MyChatBox key={chat.id}>{chat.text}</MyChatBox> : <FriendChatBox key={chat.id}>{chat.text}</FriendChatBox>,
					)}
			</div>
			<ChatInputForm />
		</div>
	);
};

export default ChatPage;
