export const customStyles = {
  placeholder: (defaultStyles: any) => {
    return {
      ...defaultStyles,
      color: "#A5A5A5",
      fontSize: "14px",
      fontWeight: 400,
      paddingLeft: "23px",
    };
  },

  control: (base: any, state: any) => ({
    ...base,
    background: "#fff",
    // match with the menu
    borderRadius: "18px",
    // Overwrittes the different states of border
    borderColor: state.isFocused ? "#FAA21B" : "#CACACA",
    height: "55px",

    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#FAA21B" : "#CACACA",
    },
  }),
  menu: (base: any) => ({
    ...base,
    // override border radius to match the box
    borderRadius: 0,
    // kill the gap
    marginTop: 0,
  }),
  menuList: (base: any) => ({
    ...base,
    // kill the white space on first and last option
    padding: 0,
  }),
};
