import React from "react";
import styled from "styled-components";
import { Colors } from "../../utils";
import Button from "./Button";
import Backdrop from "./Backdrop";

const Modal = styled.div`
  z-index: 100;
  position: fixed;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${Colors.white};
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

const ConfirmButton = styled(Button)`
  transform: scale(0.8);
`;

const Popup = (props) => {
  return (
    <>
      <Backdrop onClick={props.closePopup} />
      <Modal>
        <div style={{ padding: "10px" }}>{props.children}</div>
        <ConfirmButton value="Ok" onClick={props.closePopup} />
      </Modal>
    </>
  );
};

export default Popup;
