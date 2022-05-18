import React, { useContext } from "react";

import Form from "../generals/Form";

import Messages from "../generals/Messages";
import "../../style/home.css";
import Preloader from "../generals/Preloader";
import UserContext from "../../context/UserContext";
const Home = () => {
  const context = useContext(UserContext);
  return (
    <article className="home">
      {context.loader && <Preloader></Preloader>}
      <Form></Form>

      <Messages></Messages>
    </article>
  );
};

export default Home;
