import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
const Home = () => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate("/create");
  };

  return (
    <div>
      <Button onClick={onClickHandler} value="Go to Create" />
    </div>
  );
};

export default Home;
