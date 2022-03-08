import React from "react";
import styled from "styled-components";
import { Colors } from "../../utils";

const Div = styled.div`
  border-radius: 15px;
  width: 100%;
`;

const Input = styled.input`
  width: inherit;
  background-color: ${Colors.white};
  color: ${Colors.black};
  box-sizing: border-box;
  box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 10px;
  margin: ${(props) => props.margin || 0}px;
  font-family: "VarelaRound";
  text-align: center;
  transition: 0.2s;
  font-size: 1.4rem;
  opacity: ${(props) => (props.disabled ? 0.8 : 1)};
  border: 3px solid ${Colors.primary};

  &:hover {
    border: 1px solid rgba(0, 0, 0, 0.3);
    transition: 0.2s;
    box-shadow: none;
  }
`;

const TextInput = (props) => {
  // console.log("TextInput re-rendered");
  const onChangeHandler = (e) => {
    e.preventDefault();
    props.setValue(e.target.value);
  };

  return (
    <Div>
      <Input
        className={props.className}
        type="text"
        value={props.value}
        disabled={props.disabled}
        onChange={onChangeHandler}
        placeholder={props.placeholder}
        margin={props.margin}
        required
      />
    </Div>
  );
};

export default TextInput;
