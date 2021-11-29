import styles from "./AddFriend.module.css";
import { PlusIcon } from "@heroicons/react/outline";
const AddFriend: React.FC = () => {
  return (
    <div className={styles["input-layout"]}>
      <input placeholder="Input your friend's user id" type="number" />
      <div className={styles["send-button"]}>
        <PlusIcon />
      </div>
    </div>
  );
};

export default AddFriend;
