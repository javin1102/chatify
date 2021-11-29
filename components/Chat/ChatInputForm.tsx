import styles from "./Chat.module.css";
import { ChevronRightIcon } from "@heroicons/react/outline";
const ChatInputForm: React.FC = () => {
  return (
    <div className={styles["input-layout"]}>
      <input placeholder="Type a message..." />
      <div className={styles["send-button"]}>
        <ChevronRightIcon />
      </div>
    </div>
  );
};

export default ChatInputForm;
