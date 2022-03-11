import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Banner from "../ui/Banner";

const Home = () => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate("/create");
  };

  return (
    <>
      <Banner goToCreate={() => onClickHandler()} />
    </>
  );
};

export default Home;
