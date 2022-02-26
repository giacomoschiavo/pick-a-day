import React from "react";
import styled, { css } from "styled-components";
import { Colors } from "../../utils";

const Div = styled.div`
  box-sizing: border-box;
  width: fit-content;
  background-color: ${Colors.primary};
  padding: 15px;
  padding-left: 40px;
  padding-right: 40px;
  color: ${Colors.white};
  cursor: pointer;
  transition-duration: 0.8s;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 1.3rem;
  border-radius: 20px;

  &:active {
    transition: 0.8s;
    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.4);
  }

  &:hover {
    box-shadow: none;
  }

  ${(props) =>
    props.isPrimary === false &&
    css`
      border: 1px solid ${Colors.black};
      color: ${Colors.black};
      background-color: ${Colors.white};
      box-shadow: none;
      font-size: 1rem;
      opacity: 0.6;
    `}
`;

const Button = (props) => {
  return (
    <Div
      isPrimary={props.isPrimary}
      onClick={props.onClick}
      className={props.className}
    >
      {props.children || props.value}
    </Div>
  );
};

export default Button;
