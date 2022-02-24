import React from "react";
import classes from "./TextInput.module.css";

const TextInput = (props) => {
  const onChangeHandler = (e) => {
    e.preventDefault();
    props.setValue(e.target.value);
  };

  return (
    <div className={classes.container}>
      <input
        type="text"
        value={props.value}
        disabled={false}
        onChange={onChangeHandler}
        className={classes.input}
        placeholder={"Your name"}
        required
      />
    </div>
  );
};

export default TextInput;
