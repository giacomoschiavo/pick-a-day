import React from "react";
import classes from "./EventBanner.module.css";
import styled from "styled-components";
import { Colors } from "../../utils";

const Div = styled.div`
  background-color: ${Colors.black};
  color: ${Colors.white};
  text-align: center;
  transform: translateY(-20%);
  padding-top: 5%;
  z-index: 0;
  width: 100%;
  border-radius: 0 0 20px 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const EventBanner = (props) => {
  return (
    <Div className={classes.container}>
      <h1>{props.eventName}</h1>
    </Div>
  );
};

export default EventBanner;
