import React from "react";
import styled from "styled-components";
import { Colors } from "../../utils";
import Button from "./Button";
import Label from "./Label";
import TextInput from "./TextInput";

const Div = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
  position: sticky;
  bottom: 0;
  padding: 10px;
  padding-bottom: 20px;
  background-color: ${Colors.white};
  height: 10%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 20px 20px 0 0;
`;

const HorizontalDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

// const Input = styled.input`
//   background: transparent;
//   border: 1px solid ${Colors.black};
//   box-sizing: border-box;
//   box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
//   border-radius: 20px;
//   width: 80%;
//   font-family: "VarelaRound";
//   text-align: center;
//   transition: 0.2s;
//   font-size: 1rem;
//   text-overflow: ellipsis;
//   overflow: hidden;
//   padding: 0 5px;
// `;

const Share = (props) => {
  async function onClick() {
    navigator.clipboard.writeText(props.url).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  }

  return (
    <Div>
      <Label color={Colors.primary}>Share this link</Label>
      <HorizontalDiv>
        <TextInput
          margin={5}
          disabled={true}
          primary={false}
          value={props.url}
        />
        <Button onClick={() => onClick()}>Copy</Button>
      </HorizontalDiv>
    </Div>
  );
};

export default Share;
