import React from "react";
import styled from "styled-components";
import { Colors } from "../../utils";
import Button from "./Button";
import Backdrop from "./Backdrop";
import { AnimatePresence, motion } from "framer-motion";

// const Modal = styled.div`
//   z-index: 100;
//   position: fixed;
//   transform: translate(-50%, -50%);
//   top: 50%;
//   left: 50%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   background-color: ${Colors.white};
//   padding: 10px;
//   border-radius: 15px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
// `;

const ConfirmButton = styled(Button)`
  transform: scale(0.8);
`;

const Popup = (props) => {
  return (
    <AnimatePresence>
      {props.showPopup && (
        <>
          <Backdrop onClick={props.closePopup} key="backdrop" />
          <motion.div
            key="popup"
            initial={{
              zIndex: "100",
              position: "fixed",
              top: "50%",
              left: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: Colors.white,
              padding: "10px",
              borderRadius: "15px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
              scale: 0,
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              scale: 1,
            }}
            exit={{
              scale: 0,
            }}
            transition={{ type: "spring", damping: 50, stiffness: 700 }}
          >
            <div style={{ padding: "10px" }}>{props.children}</div>
            <ConfirmButton value="Ok" onClick={props.closePopup} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Popup;
