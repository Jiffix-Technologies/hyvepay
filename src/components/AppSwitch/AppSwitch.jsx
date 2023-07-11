import React, { useState } from "react";
import Switch from "react-switch";

const AppSwitch = () => {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };
  return (
    <label>
      <Switch
        onChange={handleChange}
        checked={checked}
        offColor="#000"
        onColor="#FAA21B"
        uncheckedIcon={false}
        checkedIcon={false}
        height={25}
        width={50}
      />
    </label>
  );
};

export default AppSwitch;
