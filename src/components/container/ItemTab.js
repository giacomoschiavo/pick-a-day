import React from "react";
import styled from "styled-components";
import { Colors } from "../../utils";
import Day from "../ui/Day";

// Tab is a flex horizontal container
// basic style is applied
// style can be overwritten
// Day object with no effect is used

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  width: 100%;
  border-radius: 20px;
  transition: 0.4s;
  background-color: ${Colors.white};
  border: 1px solid #00000022;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);

  &:hover {
    box-shadow: none;
    transition: 0.4s;
  }
`;

const Item = styled(Day)`
  box-shadow: none;
  border: 1px solid rgba(0, 0, 0, 0.2);
  transform: scale(0.8);
`;

// props needed:
// onClick, className?, itemValue?, props.children?
const ItemTab = (props) => {
  return (
    <Container onClick={props.onClick} className={props.className}>
      <Item value={props.itemValue || ""} onDayClick={() => {}} />
      {props.children}
    </Container>
  );
};

export default ItemTab;
