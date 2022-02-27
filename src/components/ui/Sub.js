import React from "react";
import styled from "styled-components";

const Subtitle = styled.sub`
  display: block;
  opacity: 0.3;
  font-size: 0.9rem;
`;

const Sub = (props) => {
  return <Subtitle>{props.children}</Subtitle>;
};

export default Sub;
