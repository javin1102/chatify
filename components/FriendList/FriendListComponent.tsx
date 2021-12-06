import React from "react";
import Image from "next/image";
import picSrc from "../../images/dog-image-1.jpg";
import styles from "./FriendList.module.css";

interface FriendProps {
  name: string;
  lastChat?: string | null | undefined;
  id: string;
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const FriendProfilePic: React.FC = () => {
  return (
    <div className={styles.pic}>
      <Image layout="fill" src={picSrc} alt="pic" />
    </div>
  );
};

export const FriendLayout: React.FC<FriendProps> = ({
  name,
  lastChat,
  id,
  onClick,
}) => {
  return (
    <div className={styles["friend-container"]} onClick={onClick}>
      <div className={styles["friend-layout"]}>
        <FriendProfilePic />
        <div className={styles["friend-detail"]}>
          <h2>{name}</h2>
          <p>{!!lastChat && lastChat}</p>
        </div>
      </div>
      <hr />
    </div>
  );
};
