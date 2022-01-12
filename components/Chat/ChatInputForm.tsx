import styles from "./Chat.module.css";
import { ChevronRightIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { addChatToDoc, auth } from "../../utils/utils";
import { useRouter } from "next/router";

const ChatInputForm: React.FC = () => {
	const [userAuth] = useAuthState(auth);
	const [chat, setChat] = useState("");
	const router = useRouter();

	const sendMessage = async () => {
		const friendId = router.query.id;
		setChat("");
		try {
			await addChatToDoc(userAuth?.uid as string, friendId as string, chat);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div className={styles["input-layout"]}>
			<input value={chat} onChange={(e) => setChat(e.target.value)} placeholder="Type a message..." />
			<div className={styles["send-button"]} onClick={sendMessage}>
				<ChevronRightIcon />
			</div>
		</div>
	);
};

export default ChatInputForm;
