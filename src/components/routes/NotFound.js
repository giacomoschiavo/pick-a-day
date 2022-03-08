import React, { useState } from "react";
import Label from "../ui/Label";
import styled from "styled-components";
import classes from "./NotFound.module.css";
import logo from "../../assets/404.png";

const Image = styled.img`
  margin-bottom: -60px
`;

const Cookie = styled.span`
  :hover{
    cursor: pointer;
  }
  font-size: 2rem;
`;

const NotFound = () => {

  const [eaten, isEaten] = useState(false);

  return (
    <div className={classes.container}>
      <Image src={logo} width={300} alt="404-event-not-found" />
      <Label>We can't find this event🥺</Label>
      <Label>But don't panic! Here it is a cookie to cheer you up:</Label>
      <Cookie onClick={() => isEaten(true)}>🍪</Cookie>
      {eaten ? <Label>Was it good?😋</Label> : null}
    </div>
  );
};

export default NotFound;
