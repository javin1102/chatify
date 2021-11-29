import type { NextPage } from "next";
import FriendListLayout from "../components/FriendList/FriendListLayout";
import Header from "../components/Header/Header";

const Home: NextPage = () => {
  return (
    <div className="app-container">
      <Header />
      <FriendListLayout />
    </div>
  );
};

export default Home;
