import React, { Component } from "react";
import { arrayMove } from "react-sortable-hoc";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import DraggableColorList from '../DraggableColorBox/DraggableColorList';
import NewPaletteNav from './NewPaletteNav/NewPaletteNav';
import ColorPicker from "./ColorPicker/ColorPicker";
import styles from '../Styles/NewPaletteFormStyles';

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20,
  };
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: true,
      dialogOpen: false,
      colors: [...this.props.defaultPalette.colors],
      emoji: "🎨",
    };

    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitColor = this.handleSubmitColor.bind(this);
    this.addNewPalette = this.addNewPalette.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
    this.deleteColorHandler = this.deleteColorHandler.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
    this.clearPaletteHandler = this.clearPaletteHandler.bind(this);
    this.randomColorHandler = this.randomColorHandler.bind(this);
    this.handleDialogeToggle = this.handleDialogeToggle.bind(this);
  }

  addNewPalette(paletteName, emoji) {
    const palette = {
      paletteName: paletteName,
      id: paletteName.toLowerCase().replace(/ /g, "-"),
      emoji: emoji,
      colors: this.state.colors,
    }

    this.props.addNewPalette(palette);
    this.props.history.push("/");
  }

  handleSubmitColor(newColor) {
    this.setState({
      colors: [...this.state.colors, newColor],
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleDrawerToggle() {
    this.setState(st => ({ drawerOpen: !st.drawerOpen }));
  }

  handleDialogeToggle() {
    this.setState(st => ({ dialogOpen: !st.dialogOpen }));
  }

  handleGoBack() {
    this.props.history.push('/');
  }

  deleteColorHandler(colorName) {
    const newColors = this.state.colors.filter(c => c.name !== colorName);
    this.setState({ colors: newColors });
  }

  onSortEnd({ oldIndex, newIndex }) {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  }

  clearPaletteHandler() {
    this.setState({ colors: [] });
  }

  randomColorHandler() {
    if (this.state.colors.length < this.props.maxColors) {
      let randomColor = this.props.getRandomColor();
      while (this.state.colors.some(c => c.name.toLowerCase() === randomColor.name.toLowerCase())) {
        randomColor = this.props.getRandomColor();
      }
      this.setState({
        colors: [...this.state.colors, randomColor],
      });
    }
  }

  render() {
    const { classes, maxColors } = this.props;
    const { drawerOpen, colors, dialogOpen } = this.state;

    const paletteIsFull = colors.length === maxColors;

    return (
      <div className={classes.root}>
        <NewPaletteNav
          open={drawerOpen}
          dialogOpen={dialogOpen}
          handleDialogeToggle={this.handleDialogeToggle}
          palettesNames={this.props.palettesNames}
          handleDrawerToggle={this.handleDrawerToggle}
          addNewPalette={this.addNewPalette}
          handleGoBack={this.handleGoBack}
        />
        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={drawerOpen}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerToggle}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.container}>
            <Typography variant='h4' gutterBottom>Design your palette</Typography>
            <div className={classes.btns}>
              <Button className={classes.btn} variant="contained" color="secondary" onClick={this.clearPaletteHandler} disabled={colors.length === 0}>Clear Palette</Button>
              <Button className={classes.btn} variant="contained" color="primary" onClick={this.randomColorHandler} disabled={paletteIsFull}>Random Color</Button>
            </div>
            <ColorPicker
              colors={colors}
              paletteIsFull={paletteIsFull}
              handleSubmitColor={this.handleSubmitColor}
              maxColors={maxColors}
            />
          </div>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: drawerOpen
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList
            colors={colors}
            distance={20}
            deleteColorHandler={this.deleteColorHandler}
            onSortEnd={this.onSortEnd}
            axis='xy'
          />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);