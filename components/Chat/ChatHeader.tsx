import styles from "./Chat.module.css";
import Image from "next/image";
import avatar from "../../images/avatar.jpg";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
const ChatHeader: React.FC = () => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <ChevronLeftIcon onClick={() => router.push("/")} />
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
