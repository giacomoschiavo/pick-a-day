import React from "react";
import logo from "../../assets/logo.png";
import styled from "styled-components";
import { Colors } from "../../utils";

const Div = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 100%;
  text-align: center;
  overflow: hidden;
  z-index: 99;
  border-radius: 0 0 20px 20px;
  background-color: ${Colors.white};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const Image = styled.img`
  height: 190px;
`;

const Header = () => {
  return (
    <Div>
      <Image src={logo} alt="pick-a-day-logo" />
    </Div>
  );
};

export default Header;
