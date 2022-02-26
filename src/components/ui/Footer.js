import React from "react";
import styled from "styled-components";
import { Colors } from "../../utils";

const Div = styled.div`
  box-sizing: border-box;
  background-color: ${Colors.black};
  color: ${Colors.white};
  width: 100%;
  text-align: center;
  padding: 10px;
`;

const Footer = () => {
  return (
    <Div>
      <p>Made with ❤️</p>
    </Div>
  );
};

export default Footer;
