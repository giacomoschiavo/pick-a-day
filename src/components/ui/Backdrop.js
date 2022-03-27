import React from "react";
// import styled from "styled-components";
import { motion } from "framer-motion";

// const Div = styled.div`
//   cursor: pointer;
//   z-index: 99;
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.6);
//   opacity: 1;
// `;

const Backdrop = (props) => {
  return (
    <motion.div
      initial={{
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        width: "100%",
        height: "100%",
        opacity: 0,
        zIndex: 99,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      onClick={props.onClick}
    >
      {props.children}
    </motion.div>
  );
};

export default Backdrop;
