import React from "react";
import styled, { css } from "styled-components";
import { Colors } from "../../utils";

const Div = styled.div`
  box-sizing: border-box;
  width: fit-content;
  background-color: ${(props) =>
    props.type === "primary"
      ? Colors.primary
      : props.type === "secondary"
      ? Colors.white
      : "transparent"};
  padding: 15px;
  padding-left: 40px;
  padding-right: 40px;
  color: ${(props) =>
    props.type === "primary"
      ? Colors.white
      : props.type === "secondary"
      ? Colors.primary
      : Colors.grey};
  cursor: pointer;
  text-decoration: ${(props) =>
    props.type === "tertiary" ? "underline" : "none"};
  transition-duration: 0.8s;
  box-shadow: ${(props) =>
    props.type === "tertiary" ? "none" : "0px 4px 4px rgba(0, 0, 0, 0.25)"};
  font-size: 1.3rem;
  border-radius: 20px;

  &:active {
    transition: 0.8s;
    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.4);
  }

  &:hover {
    box-shadow: none;
  }
  /* 
  ${(props) =>
    props.type === "secondary" &&
    css`
      border: 1px solid ${Colors.black};
      color: ${Colors.black};
      background-color: ${Colors.white};
      box-shadow: none;
      font-size: 1rem;
      opacity: 0.6;
    `} */
`;

// 3 types of button
// primary => green background and white text
// secondary => white background and green text
// tertiary => no background, text underlined

const Button = (props) => {
  return (
    <Div
      type={props.type || "primary"}
      onClick={props.onClick}
      className={props.className}
      backgroundColor={props.backgroundColor}
    >
      {props.children || props.value}
    </Div>
  );
};

export default Button;
