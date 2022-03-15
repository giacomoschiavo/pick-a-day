import React from "react";
import styled from "styled-components";

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  cursor: pointer;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-radius: 20px;
  padding: 15px;
  border: 2px solid ${(props) => props.color}22;
  margin: 20px 0;
  margin-bottom: 0;
  box-shadow: 0px 4px 8px ${(props) => props.color}22;
  width: 100%;
  transition: 0.4s;

  &:hover {
    box-shadow: none;
    transition: 0.4s;
  }
`;

const Tab = (props) => {
  return (
    <Container onClick={props.onClick} color={props.color}>
      {props.children}
    </Container>
  );
};

export default Tab;
