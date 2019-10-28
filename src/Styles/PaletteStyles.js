import sizes from './sizes';

export default {
  backButton: {
    cursor: "pointer",
    width: "100px",
    height: "30px",
    position: "absolute",
    display: "inline-block",
    top: "50%",
    left: "50%",
    outline: "none",
    background: "rgba(255, 255, 255, 0.3)",
    border: "none",
    opacity: "1",
    color: "white",
    lineHeight: "30px",
    fontSize: "1rem",
    textTransform: "uppercase",
    textAlign: "center",
    marginTop: "-15px",
    marginLeft: "-50px",
  },
  backBox: {
    width: "20%",
    height: "50%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-4px",
    backgroundColor: "black",
    [sizes.down("lg")]: {
      height: "33.3333%",
      width: "25%",
    },
    [sizes.down("md")]: {
      height: "20%",
      width: "50%",
    },
    [sizes.down("xs")]: {
      height: "10%",
      width: "100%",
    },
  },
  palette: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  paletteColors: {
    height: "89vh",
  },
};