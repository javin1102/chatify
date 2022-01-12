import styles from "./FriendList.module.css";
import { FriendLayout } from "./FriendListComponent";
import { UserIcon } from "@heroicons/react/outline";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { collection, doc, getFirestore, query, orderBy } from "@firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/utils";
import router from "next/router";

const FriendListLayout = () => {
	const [userAuth] = useAuthState(auth);
	const db = getFirestore();
	const myDoc = doc(db, "users", userAuth?.uid as string);
	const myFriendCollection = collection(myDoc, "friends");
	const myQuery = query(myFriendCollection, orderBy("name"));
	const [value, loading] = useCollectionDataOnce(myQuery);

	return (
		<>
			{loading ? (
				<></>
			) : (
				<div className={styles.layout}>
					<div className={styles.heading}>
						<UserIcon />
						{`${value?.length} Friend(s)`}
					</div>

					<div className={styles.list}>
						{value?.map((data) => (
							<FriendLayout key={data.id} name={data.name} id={data.id} onClick={() => router.push(`/chat/${data.id}`)} />
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default FriendListLayout;
