import type { NextPage } from "next";
import AddFriend from "../components/AddFriend/AddFriend";
import FriendListLayout from "../components/FriendList/FriendListLayout";
import Header from "../components/Header/Header";
import "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { auth } from "../utils/utils";

const Home: NextPage = () => {
  const [userAuth, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!userAuth) router.push("/auth/login");
  }, [router, userAuth]);

  return (
    <>
      {userAuth ? (
        <div className="app-container">
          <Header />
          <AddFriend />
          <FriendListLayout />
        </div>
      ) : (
        <>:</>
      )}
    </>
  );
};

export default Home;
