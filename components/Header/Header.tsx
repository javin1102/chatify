import React, { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import avatar from "../../images/avatar.jpg";
import { ClipboardCopyIcon } from "@heroicons/react/outline";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/utils";
import router from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
const triggerCopyText = (
  isClick: boolean,
  ref: React.RefObject<HTMLDivElement>,
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>,
  userId: string
) => {
  if (isClick) {
    ref.current?.classList.add(`${styles.active}`);

    navigator.clipboard.writeText(userId);

    let timeout1 = setTimeout(() => {
      ref.current?.classList.remove(`${styles.active}`);
      setIsClick(false);
    }, 1000);
    return () => {
      clearTimeout(timeout1);
    };
  }
};

const HeaderAuthenticated: React.FC = () => {
  const [isClick, setIsClick] = useState<boolean>(false);
  const textCopyRef = useRef<HTMLDivElement>(null);
  const [userAuth] = useAuthState(auth);
  //trigger copied text
  useEffect(() => {
    triggerCopyText(isClick, textCopyRef, setIsClick, userAuth?.uid as string);
  }, [isClick, userAuth?.uid]);

  //signOut
  const SignOutHandler = async () => {
    await signOut(auth);
    localStorage.removeItem("tokek");
    router.push("/auth/login");
  };

  return (
    <>
      <div className={styles.profile}>
        <div className={styles["profile__image"]}>
          <Image src={avatar} layout="fill" alt="avatar" />
        </div>
        <div className={styles["profile__detail"]}>
          <h2>{userAuth?.displayName}</h2>
          <div className={styles["profile__id"]}>
            <p id="user-id">{userAuth?.uid}</p>
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

      <div className={styles["sign-button"]} onClick={SignOutHandler}>
        <a href="#">Sign Out</a>
      </div>
    </>
  );
};

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <HeaderAuthenticated />
    </header>
  );
};

export default Header;
