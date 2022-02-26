import React from "react";
import styled from "styled-components";
import { Colors } from "../../utils";

const Div = styled.div`
  background-color: ${Colors.primary};
  color: ${Colors.white};
  text-align: center;
  transform: translateY(-20%);
  padding-top: 5%;
  z-index: 0;
  width: 80%;
  border-radius: 0 0 20px 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Title = styled.h1`
  font-size: 1.8rem;
`;

const EventBanner = (props) => {
  return (
    <Div>
      <Title>{props.eventName}</Title>
    </Div>
  );
};

export default EventBanner;
