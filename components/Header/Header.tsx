import React, { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import avatar from "../../images/avatar.jpg";
import { ClipboardCopyIcon } from "@heroicons/react/outline";

const triggerCopyText = (
  isClick: boolean,
  ref: React.RefObject<HTMLDivElement>,
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (isClick) {
    ref.current?.classList.add(`${styles.active}`);
    let timeout1 = setTimeout(() => {
      ref.current?.classList.remove(`${styles.active}`);
      setIsClick(false);
    }, 1000);
    return () => {
      clearTimeout(timeout1);
    };
  }
};

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <HeaderAuthenticated />
    </header>
  );
};

export default Header;

const HeaderAuthenticated: React.FC = () => {
  const [isClick, setIsClick] = useState<boolean>(false);
  const textCopyRef = useRef<HTMLDivElement>(null);

  //trigger copied text
  useEffect(() => {
    triggerCopyText(isClick, textCopyRef, setIsClick);
  }, [isClick]);

  return (
    <>
      <div className={styles.profile}>
        <div className={styles["profile__image"]}>
          <Image src={avatar} layout="fill" alt="avatar" />
        </div>
        <div className={styles["profile__detail"]}>
          <h2>Javin Rionardi</h2>
          <div className={styles["profile__id"]}>
            <p id="user-id">12345678</p>
            <div className={styles["profile__copy"]}>
              <ClipboardCopyIcon
                className={styles["profile__copy-icon"]}
                onClick={() => setIsClick(true)}
              />
              <div
                className={`${styles["profile__copy-text"]}`}
                ref={textCopyRef}
              >
                Copied!
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className={styles["add-user"]}>
        <input type="number" placeholder="User ID" />
        <UserAddIcon className={styles["header__add-icon"]} />
      </div> */}
      <div className={styles["sign-button"]}>
        <a href="#">Sign Out</a>
      </div>
    </>
  );
};
