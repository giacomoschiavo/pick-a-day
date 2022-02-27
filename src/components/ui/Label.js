import React from "react";
import styled from "styled-components";
import { Colors } from "../../utils";
import Sub from "./Sub";

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
  console.log(props.sub);
  return (
    <P className={props.className} color={props.color}>
      {props.children}
      {props.sub !== "" && <Sub>{props.sub}</Sub>}
    </P>
  );
};

export default Label;
