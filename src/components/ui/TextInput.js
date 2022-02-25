import React from "react";
import styled from "styled-components";
import { Colors } from "../../utils";

const Div = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 15px;
`;

const Input = styled.input`
  background: transparent;
  border: 1px solid ${Colors.black};
  box-sizing: border-box;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  width: 80%;
  padding: 10px 0;
  font-family: "VarelaRound";
  text-align: center;
  transition: 0.2s;
  font-size: 1.3rem;

  &:hover {
    transition: 0.2s;
    box-shadow: none;
  }
`;

const TextInput = (props) => {
  const onChangeHandler = (e) => {
    e.preventDefault();
    props.setValue(e.target.value);
  };

  return (
    <Div>
      <Input
        type="text"
        value={props.value}
        disabled={false}
        onChange={onChangeHandler}
        placeholder={"Your name"}
        required
      />
    </Div>
  );
};

export default TextInput;
