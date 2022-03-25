import React from "react";
import styled from "styled-components";
import { Colors } from "../../utils";
// Tab is a flex horizontal container
// basic style is applied for ui consistency
// style should be overwritten
const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  cursor: pointer;
  flex-direction: row;
  width: 100%;
  border-radius: 20px;
  transition: 0.4s;
  background-color: ${Colors.white};

  &:hover {
    box-shadow: none;
    transition: 0.4s;
  }
`;

const Tab = (props) => {
  return (
    <Container onClick={props.onClick} className={props.className}>
      {props.children}
    </Container>
  );
};

export default Tab;
