import React from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../ui/Banner";
import classes from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate("/create");
  };

  return (
    <>
      <Banner goToCreate={onClickHandler} />
      <div className={classes.instructions}>
        <p className={classes.howItWorks}>How it works✨</p>
        <div className={classes.tab}>
          <div className={classes.step}>
            <p>1</p>
          </div>
          <p>Choose your event name✏️</p>
        </div>
        <div className={classes.tab}>
          <div className={classes.step}>
            <p>2</p>
          </div>
          <p>Choose your days📅</p>
        </div>
        <div className={classes.tab}>
          <div className={classes.step}>
            <p>3</p>
          </div>
          <p>Share the link!🔗</p>
        </div>
      </div>
    </>
  );
};

export default Home;
