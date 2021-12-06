import styles from "./AddFriend.module.css";
import { PlusIcon } from "@heroicons/react/outline";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "@firebase/firestore";
import { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/utils";
import { UserFirestore } from "../../_structure/user";

const AddFriend: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [userAuth] = useAuthState(auth);

  const db = getFirestore();
  const usersCollection = collection(db, "users");

  const addFriendHandler = async () => {
    if (!inputRef.current?.value || inputRef.current.value === userAuth?.uid)
      return;

    try {
      //add friend to user doc <-> add user to friend doc
      //if friend || user exist in both doc -> return

      const mySnapshot = await getDoc(doc(usersCollection, userAuth?.uid));
      const friendSnapshot = await getDoc(
        doc(usersCollection, inputRef.current.value)
      );

      if (!mySnapshot.exists() || !friendSnapshot.exists()) {
        alert("id does not exists");
        return;
      }

      const friendData = friendSnapshot.data() as UserFirestore;

      const myUserDoc = doc(db, "users", userAuth?.uid as string);
      const myFriendDoc = doc(collection(myUserDoc, "friends"), friendData.id);
      const myFriendSnapshot = await getDoc(myFriendDoc);

      const friendDoc = doc(db, "users", inputRef.current.value);
      const friend_friendDoc = doc(
        collection(friendDoc, "friends"),
        userAuth?.uid
      );

      const friend_friendSnapshot = await getDoc(friend_friendDoc);

      if (myFriendSnapshot.exists() || friend_friendSnapshot.exists()) {
        alert(`${friendData.name} has been added`);
        return;
      }

      await setDoc(myFriendDoc, { name: friendData.name, id: friendData.id });
      await setDoc(friend_friendDoc, {
        name: userAuth?.displayName,
        id: userAuth?.uid,
      });
      alert("add Sucess");
    } catch (error) {
      console.error(error);
      alert("Oops! Something went wrong!");
    }
  };

  return (
    <div className={styles["input-layout"]}>
      <input
        placeholder="Input your friend's user id"
        type="text"
        ref={inputRef}
      />
      <div className={styles["send-button"]} onClick={addFriendHandler}>
        <PlusIcon />
      </div>
    </div>
  );
};

export default AddFriend;
