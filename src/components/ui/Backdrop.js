import React from "react";
import styled from "styled-components";

const Div = styled.div`
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 1;
`;

const Backdrop = (props) => {
  return <Div onClick={props.onClick}>{props.children}</Div>;
};

export default Backdrop;
