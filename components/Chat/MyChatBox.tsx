import styles from "./Chat.module.css";
const MyChatBox: React.FC = ({ children }) => {
  return <div className={styles.chatbox + " " + styles.me}>{children}</div>;
};

export default MyChatBox;
