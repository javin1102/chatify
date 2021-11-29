import type { NextPage } from "next";
import AddFriend from "../components/AddFriend/AddFriend";
import FriendListLayout from "../components/FriendList/FriendListLayout";
import Header from "../components/Header/Header";

const Home: NextPage = () => {
  return (
    <div className="app-container">
      <Header />
      <AddFriend />
      <FriendListLayout />
    </div>
  );
};

export default Home;
