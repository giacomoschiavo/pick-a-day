import React from "react";
import classes from "./TextInput.module.css";

const TextInput = (props) => {
  const onChangeHandler = (e) => {
    e.preventDefault();
    props.setValue(e.target.value);
  };

  return (
    <div className={classes.group}>
      <input
        type="text"
        value={props.value}
        onChange={onChangeHandler}
        required
      />
      <span className={classes.highlight} />
      <span className={classes.bar} />
      <span className={classes.label}>Name</span>
    </div>
  );
};

export default TextInput;
