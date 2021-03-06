import React from "react";
import styled from "styled-components";
import { Colors } from "../../utils";

const Div = styled.div`
  background-color: ${Colors.primary};
  color: ${Colors.white};
  text-align: center;
  /* transform: translateY(-30%); */
  /* padding-top: 20px; */
  z-index: 0;
  width: 90%;
  border-radius: 20px;
  margin: 20px 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  /* max-width: 95%; */
`;

const Title = styled.h1`
  font-size: 1.9rem;
`;

const EventBanner = (props) => {
  return (
    <Div>
      <Title>{props.eventName}</Title>
    </Div>
  );
};

export default EventBanner;
