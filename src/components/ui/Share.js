import React from "react";
import styled from "styled-components";
import { Colors } from "../../utils";
import Button from "./Button";
import Label from "./Label";
import TextInput from "./TextInput";

const Div = styled.div`
  transform: scale(0.8);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  position: sticky;
  bottom: 0;
  height: 10%;
  flex: 1;
  background-color: transparent;
`;

const InternalDiv = styled.div`
  box-sizing: border-box;
  background-color: ${Colors.white};
  margin-bottom: 10px;
  padding: 10px;
  padding-bottom: 20px;
  border: 4px solid ${Colors.primary};
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const HorizontalDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled(TextInput)`
  background-color: ${Colors.white};
  transform: scale(0.9);
`;

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
      <InternalDiv>
        <Label color={Colors.black}>Share this link</Label>
        <HorizontalDiv>
          <Input disabled={true} value={props.url} />
          <Button onClick={() => onClick()}>Copy</Button>
        </HorizontalDiv>
      </InternalDiv>
    </Div>
  );
};

export default Share;
