import styles from "./FriendList.module.css";
import { FriendLayout } from "./FriendListComponent";
import { UserIcon } from "@heroicons/react/outline";
const FriendListLayout = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.heading}>
        <UserIcon />
        Friend (42)
      </div>

      <div className={styles.list}>
        <FriendLayout name="Danang" lastChat={"wkwkwkwk"} />
        <FriendLayout name="Bambang" />
        <FriendLayout name="Siti" />
        <FriendLayout name="Bu Yo" />
      </div>
    </div>
  );
};

export default FriendListLayout;
