import React from "react";
import classes from "./TextInput.module.css";

const TextInput = () => {
  return (
    <div className={classes.group}>
      <input type="text" required />
      <span className={classes.highlight} />
      <span className={classes.bar} />
      <span className={classes.label}>Name</span>
    </div>

  );
};

export default TextInput;
