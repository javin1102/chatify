import styles from "./Chat.module.css";
import Image from "next/image";
import avatar from "../../images/avatar.jpg";
import { ChevronLeftIcon } from "@heroicons/react/outline";
const ChatHeader = () => {
  return (
    <header className={styles.header}>
      <ChevronLeftIcon />
      <div className={styles.profile}>
        <div className={styles["profile__image"]}>
          <Image src={avatar} layout="fill" alt="avatar" />
        </div>
        <div className={styles["profile__detail"]}>
          <h2>Javin Rionardi</h2>
          <p>Online</p>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
