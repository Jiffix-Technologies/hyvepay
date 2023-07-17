import React, { useState } from "react";
import styles from "./AppSwitch.module.css";

const AppSwitch = () => {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };
  return (
    <label className={styles.switch}>
      <input type="checkbox" />
      <span className={styles.slider} />
    </label>
  );
};

export default AppSwitch;
