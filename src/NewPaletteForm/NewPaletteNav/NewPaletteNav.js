import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from "classnames";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import PaletteMetaForm from '../PaletteMetaForm/PaletteMetaForm';
import styles from '../../Styles/NewPaletteNavStyles';

class NewPaletteNav extends Component {
  render() {
    const { classes, open, handleDrawerToggle, handleGoBack, dialogOpen } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position='fixed'
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            {open || <IconButton
              color='inherit'
              aria-label='Open drawer'
              onClick={handleDrawerToggle}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <AddToPhotosIcon />
            </IconButton>}
            <Typography variant='h6' color='inherit' noWrap>
              Create A Palette
            </Typography>
          </Toolbar>
          <div className={classes.navBtns}>
            <Button className={classes.navBtn} variant="contained" color="primary" onClick={this.props.handleDialogeToggle}>
              Save
            </Button>
            <Button className={classes.navBtn} variant="contained" color="secondary" onClick={handleGoBack}>
              Go Back
            </Button>
          </div>
        </AppBar>
        {dialogOpen &&
          <PaletteMetaForm
            palettesNames={this.props.palettesNames}
            handleDialogeToggle={this.props.handleDialogeToggle}
            handleSubmit={this.props.addNewPalette}
          />}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteNav);