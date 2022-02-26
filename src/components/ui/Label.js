import React from "react";
import styled from "styled-components";
import { Colors } from "../../utils";

const P = styled.p`
  text-align: center;
  color: ${(props) => props.color || Colors.black};
  font-weight: bolder;
  font-size: 1.3rem;
  margin: 10px 0;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
`;

const Label = (props) => {
  return (
    <P className={props.className} color={props.color}>
      {props.children}
    </P>
  );
};

export default Label;
