import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import uuid from 'uuid/v4';

import ColorBox from './ColorBox/ColorBox';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { generatePalette } from '../colorHelpers';
import styles from '../Styles/PaletteStyles';

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 500,
      colorFormat: "hex",
    };

    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }

  changeLevel(level) {
    this.setState({ level: level });
  }

  changeFormat(colorFormat) {
    this.setState({ colorFormat: colorFormat });
  }

  getPalette() {
    const paletteId = this.props.match.params.paletteId;
    const palette = this.props.palettes.find(palette => palette.id === paletteId);
    const newPalette = generatePalette(palette);
    return newPalette;
  }

  render() {
    const palette = this.getPalette();
    const { level, colorFormat } = this.state;
    const { classes } = this.props;
    const colorBoxes = palette.colors[level].map(color => {
      return <ColorBox
        key={uuid()}
        color={color}
        paletteId={palette.id}
        format={colorFormat}
        push={this.props.history.push}
        showLink
      />
    });

    return (
      <div className={classes.palette}>
        {/* HEADER */}
        <Navbar
          showSlider
          showSelect
          level={level}
          changeLevelHandler={this.changeLevel}
          changeFormatHandler={this.changeFormat}
        />

        {/* COLOR BOXES */}
        <div className={classes.paletteColors}>{colorBoxes}</div>

        {/* FOOTER */}
        <Footer paletteName={palette.paletteName} emoji={palette.emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(Palette);