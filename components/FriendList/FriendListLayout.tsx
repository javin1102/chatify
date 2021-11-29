import styles from "./FriendList.module.css";
import { FriendLayout } from "./FriendListComponent";
const FriendListLayout = () => {
  return (
    <div className={styles.layout}>
      <FriendLayout name="Danang" lastChat={"wkwkwkwk"} />
      <FriendLayout name="Bambang" />
      <FriendLayout name="Siti" />
      <FriendLayout name="Bu Yo" />
    </div>
  );
};

export default FriendListLayout;
