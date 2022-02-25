import React from "react";
import styled from "styled-components";
import { Colors } from "../../utils";
import Button from "./Button";
import Label from "./Label";

const Div = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  bottom: 30px;
`;

const HorizontalDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Input = styled.input`
  background: transparent;
  border: 1px solid ${Colors.black};
  box-sizing: border-box;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  width: 80%;
  font-family: "VarelaRound";
  text-align: center;
  transition: 0.2s;
  font-size: 1.0rem;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 0 5px;
`;

const ShareButton = styled(Button)`
  transform: scale(0.8);
`

const Share = (props) => {

  async function onClick() {
    navigator.clipboard.writeText(props.url).then(function () {
      console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
      console.error('Async: Could not copy text: ', err);
    });

  }

  return (
    <Div>
      <Label>Share this link</Label>
      <HorizontalDiv>
        <Input disabled={true} value={props.url} />
        <ShareButton isPrimary={true} onClick={() => onClick()}>Copy</ShareButton>
      </HorizontalDiv>
    </Div>
  );
};

export default Share;
