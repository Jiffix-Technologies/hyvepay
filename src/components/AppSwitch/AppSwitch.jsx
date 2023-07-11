import React, { useState } from "react";
import Switch from "react-switch";
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

      {/* <Switch
        onChange={handleChange}
        checked={checked}
        offColor="#000"
        onColor="#FAA21B"
        uncheckedIcon={false}
        checkedIcon={false}
        height={10}
        width={30}
      /> */}
    </label>
  );
};

export default AppSwitch;
