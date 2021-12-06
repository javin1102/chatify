import styles from "./AddFriend.module.css";
import { PlusIcon } from "@heroicons/react/outline";
import { collection, getFirestore, orderBy, query } from "@firebase/firestore";
import { firebaseApp } from "../../utils/utils";
import { useCollectionData } from "react-firebase-hooks/firestore";

const AddFriend: React.FC = () => {
  return (
    <div className={styles["input-layout"]}>
      <input placeholder="Input your friend's user id" type="text" />
      <div className={styles["send-button"]}>
        <PlusIcon />
      </div>
    </div>
  );
};

export default AddFriend;
