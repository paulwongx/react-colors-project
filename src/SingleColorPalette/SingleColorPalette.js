import React, { Component } from 'react';
import { generatePalette } from '../colorHelpers';
import { withStyles } from '@material-ui/styles';
import Navbar from '../Navbar/Navbar';
import ColorBox from '../Palette/ColorBox/ColorBox';
import Footer from '../Footer/Footer';
import styles from '../Styles/PaletteStyles';

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this._shades = this.getColorShades();

    this.state = {
      colorFormat: "hex",
      snackBarOpen: false,
    };

    this.getColorShades = this.getColorShades.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
    this.toggleSnackbar = this.toggleSnackbar.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.goBack();
  }

  getColorShades() {
    const { paletteId, colorName } = this.props.match.params;

    const palette = this.props.palettes.find(p => p.id === paletteId);
    const colorId = palette.colors.find(c => c.name.toLowerCase() === colorName).name;

    const newPalette = generatePalette(palette);
    const allColors = newPalette.colors;
    const shades = Object.keys(allColors).map(color => {
      const singleShade = allColors[color];
      return singleShade.find(c => c.id === colorId.toLowerCase());
    }).slice(1);

    return shades;
  }

  changeFormat(colorFormat) {
    this.setState({ colorFormat: colorFormat });
  }

  toggleSnackbar() {
    this.setState(st => ({ snackBarOpen: !st.snackBarOpen }));
  }

  render() {
    const { palettes, classes } = this.props;
    const { paletteId } = this.props.match.params;

    const palette = palettes.find(p => p.id === paletteId);
    const colorBoxes = this._shades.map(color => {
      return <ColorBox
        modeSingleColor
        key={color.id + color.hex}
        color={color}
        paletteId={paletteId}
        format={this.state.colorFormat}
        showLink={false}
      />
    });

    return (
      <div className={classes.palette}>
        <Navbar
          showSelect
          showSlider={false}
          changeFormatHandler={this.changeFormat}
          toggleSnackbarHandler={this.toggleSnackbar}
        />

        <div className={classes.paletteColors}>
          {colorBoxes}
          <div className={classes.backBox} onClick={this.goBack}>
            <div>
              <button className={classes.backButton}>Go Back</button>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <Footer paletteName={palette.paletteName} emoji={palette.emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);