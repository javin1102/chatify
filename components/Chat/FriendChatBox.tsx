import styles from "./Chat.module.css";
const FriendChatBox: React.FC = ({ children }) => {
  return <div className={styles.chatbox + " " + styles.friend}>{children}</div>;
};
export default FriendChatBox;
