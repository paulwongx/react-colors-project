import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import { withStyles } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import 'rc-slider/assets/index.css';
import styles from '../Styles/NavbarStyles';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: "hex",
      snackBarOpen: false,
    };

    this.changeFormatHandler = this.changeFormatHandler.bind(this);
    this.toggleSnackbar = this.toggleSnackbar.bind(this);
  }

  toggleSnackbar() {
    this.setState(st => ({ snackBarOpen: !st.snackBarOpen }));
  }

  changeFormatHandler(e) {
    const format = e.target.value;
    this.props.changeFormatHandler(format);
    this.setState(st => {
      if(st.format !== format) return {format: format};
    }, () => this.toggleSnackbar());
  }

  render() {
    const { level, changeLevelHandler, classes } = this.props;
    const { format, snackBarOpen } = this.state;
    
    return (
      <header className={classes.navbar}>
        <div className={classes.brand}>
          <Link to='/'>reactcolorpicker</Link>
        </div>
        {this.props.showSlider && <div>
          <span>Level: {level}</span>
          <div className={classes.slider}>
            <Slider
              default={level}
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onChange={changeLevelHandler}
            />
          </div>
        </div>}

        {this.props.showSelect && <div className={classes.selectContainer}>
          <FormControl>
            <InputLabel htmlFor="age-simple">Mode</InputLabel>
            <Select
              value={format}
              onChange={this.changeFormatHandler}
              inputProps={{
                name: 'age',
                id: 'age-simple',
              }}
            >
              <MenuItem value={"hex"}>HEX - #ffffff</MenuItem>
              <MenuItem value={"rgb"}>RGB - rgb(255,255,255)</MenuItem>
              <MenuItem value={"rgba"}>RGBA - rgba(255,255,255,1)</MenuItem>
            </Select>
          </FormControl>
        </div>}

        {/* SNACKBAR */}
        <div>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={snackBarOpen}
            autoHideDuration={2000}
            ClickAwayListenerProps={{ onClickAway: () => null }}
            onClose={this.toggleSnackbar}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Format changed to {format.toUpperCase()}!</span>}
            action={[
              <IconButton
                key="close"
                aria-label="close"
                color="inherit"
                onClick={this.toggleSnackbar}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
        </div>
      </header>
    );
  }
}

export default withStyles(styles)(Navbar);