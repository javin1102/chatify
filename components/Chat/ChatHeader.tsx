import styles from "./Chat.module.css";
import Image from "next/image";
import avatar from "../../images/avatar.jpg";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getFriendDoc } from "../../utils/utils";
import { getDoc } from "firebase/firestore";
const ChatHeader: React.FC<{ userId: string }> = ({ userId }) => {
	const router = useRouter();
	const [friend, setFriend] = useState(null);

	useEffect(() => {
		const friendId = router.query.id;
		if (!userId || !friendId) return;
		const myFriend = getFriendDoc(userId, friendId as string);
		const friendDoc = async () => {
			const x = await getDoc(myFriend);
			const data = x.data();
			setFriend(data);
			return;
		};
		friendDoc();
	}, [router, userId]);
	return (
		<header className={styles.header}>
			<ChevronLeftIcon onClick={() => router.push("/")} />
			<div className={styles.profile}>
				<div className={styles["profile__image"]}>
					<Image src={avatar} layout="fill" alt="avatar" />
				</div>
				<div className={styles["profile__detail"]}>
					<h2>{friend && friend.name}</h2>
					{/* <p>Online</p> */}
				</div>
			</div>
		</header>
	);
};

export default ChatHeader;
