import React from "react";
import Backdrop from "./Backdrop";
import styled from "styled-components";
import { Colors } from "../../utils";
import classes from "./Loading.module.css";

const CenteredText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${Colors.white};
`;

const Loading = () => {
  return (
    <Backdrop>
      <CenteredText>
        <div className={classes["lds-ellipsis"]}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </CenteredText>
    </Backdrop>
  );
};

export default Loading;
