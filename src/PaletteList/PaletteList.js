import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import styles from '../Styles/PaletteListStyles';
import MiniPalette from './MiniPalette/MiniPalette';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogIsOpen: false,
      deleteingId: "",
    };

    this.goToPalette = this.goToPalette.bind(this);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleDeletePalette = this.handleDeletePalette.bind(this);
  }

  goToPalette(id) {
    this.props.history.push(`/palette/${id}`)
  }


  handleOpenDialog(id) {
    this.setState({ dialogIsOpen: true, deleteingId: id });
  }

  handleCloseDialog() {
    this.setState({ dialogIsOpen: false, deleteingId: "" });
  }

  handleDeletePalette() {
    this.props.deletePalette(this.state.deleteingId);
    this.handleCloseDialog();
  }

  //** RENDER **/
  render() {
    const { palettes, classes } = this.props;
    const { dialogIsOpen } = this.state;

    const miniPalettes = palettes.map(p => (
      <CSSTransition
        key={p.id}
        classNames='fade'
        timeout={500}
      >
        <MiniPalette
          {...p}
          goToPalette={this.goToPalette}
          openDialog={this.handleOpenDialog}
        />
      </CSSTransition>
    ));

    const dialog = (
      <div>
        <Dialog
          open={dialogIsOpen}
          onClose={this.handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Delete This Palette ?</DialogTitle>
          <List>
            <ListItem button onClick={this.handleDeletePalette} >
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Delete</ListItemText>
            </ListItem>
            <ListItem button onClick={this.handleCloseDialog} >
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Cancel</ListItemText>
            </ListItem>
          </List>
        </Dialog>
      </div>
    );

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.heading}>React Color Picker</h1>
            <Link to='/palette/new'>create palette</Link>
          </nav>
          <TransitionGroup
            className={classes.palettes}
          >
            {miniPalettes}
          </TransitionGroup>
        </div>
        {dialog}
        {/* {dialogIsOpen && dialog} */}
      </div>
    );
  }
}

export default withStyles(styles)(Home);