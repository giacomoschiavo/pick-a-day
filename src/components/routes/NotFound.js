import React from "react";
import Label from "../ui/Label";
import styled from "styled-components";

const Centered = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
`;

const Big = styled(Label)`
  font-size: 3rem;
`;

const NotFound = () => {
  return (
    <Centered>
      <Big>404</Big>
      <Label>Not found!</Label>
    </Centered>
  );
};

export default NotFound;
