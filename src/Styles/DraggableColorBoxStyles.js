import sizes from './sizes';
import chroma from 'chroma-js';

export default {
  root: {
    width: "20%",
    height: "25%",
    margin: "-1.5px auto 0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-4px",
    backgroundColor: props => props.color,
    "&:hover svg": {
      color: "white",
      transform: "scale(1.3)"
    },
    [sizes.down("lg")]: {
      width: "25%",
      height: "20%"
    },
    [sizes.down("md")]: {
      width: "50%",
      height: "10%"
    },
    [sizes.down("sm")]: {
      width: "100%",
      height: "5%",
    }
  },
  boxContent: {
    position: "absolute",
    padding: "10px",
    width: "100%",
    left: "0",
    bottom: "0",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
    display: "flex",
    color: props => chroma(props.color).luminance() <= 0.08 ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.5)",
    justifyContent: "space-between",
  },
  deleteIcon: {
    transition: "0.3s all ease-in-out",
  }
};