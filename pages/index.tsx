import type { NextPage } from "next";
import AddFriend from "../components/AddFriend/AddFriend";
import FriendListLayout from "../components/FriendList/FriendListLayout";
import Header from "../components/Header/Header";
import "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { auth, jwtkey1 } from "../utils/auth.utils";
import { sign, verify } from "jsonwebtoken";
const Home: NextPage = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  //check if user authenticated
  // useEffect(() => {
  //   const token = localStorage.getItem("tokek");
  //   // console.log(token);
  //   verify(token as string, jwtkey1, (err, x) => {
  //     console.log(x);
  //   });
  // }, []);
  // useEffect(() => {
  //   if (!user) router.push("/auth/login");
  // }, [user, router]);

  return (
    <>
      {user ? (
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
