import React from "react";
import styled, { css } from "styled-components";
import { Colors } from "../../utils";

const Div = styled.div`
  width: 3.8rem;
  height: 3.8rem;
  background: ${Colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  transition: 0.4s;
  font-size: 1.5rem;
  box-shadow: 0px 4px 4px 2px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  margin: ${(props) => props.gap}px;

  ${(props) =>
    props.selected &&
    css`
      box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.4);
      background: ${Colors.primary};
      color: ${Colors.white};
      transition-duration: 0.2s;
      opacity: 0.8;
    `}
`;

const Day = (props) => {
  const onClickHandler = () => {
    props.onDayClick(props.date);
  };

  return (
    <Div
      onClick={onClickHandler}
      selected={props.selected}
      gap={props.gap}
      className={props.className}
    >
      <p>{props.value}</p>
    </Div>
  );
};

export default Day;
