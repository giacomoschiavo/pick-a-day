import React from "react";
import styled from "styled-components";

const Backdrop = styled.div`
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Popup = (props) => {
  return <Backdrop onClick={props.onClick}>{props.children}</Backdrop>;
};

export default Popup;
