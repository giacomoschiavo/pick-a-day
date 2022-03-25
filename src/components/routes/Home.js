import React from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../ui/Banner";
import classes from "./Home.module.css";
import Section from "../container/Section";
import ItemTab from "../container/ItemTab";
import styled from "styled-components";

const CustomItemTab = styled(ItemTab)`
  margin: 10px;
`;

const Home = () => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate("/create");
  };

  return (
    <>
      <Banner goToCreate={onClickHandler} />
      <div className={classes.instructions}>
        <Section label="How it works✨">
          <CustomItemTab itemValue="1">
            <p>Choose your event name✏️</p>
          </CustomItemTab>
          <CustomItemTab itemValue="2">
            <p>Choose your days📅</p>
          </CustomItemTab>
          <CustomItemTab itemValue="3">
            <p>Share the link!🔗</p>
          </CustomItemTab>
        </Section>
      </div>
    </>
  );
};

export default Home;
