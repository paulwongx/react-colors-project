import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from '../../Styles/MiniPaletteStyles';

class MiniPalette extends PureComponent {
  constructor(props) {
    super(props);

    this.goToPaletteHandler = this.goToPaletteHandler.bind(this);
    this.openDialogHandler = this.openDialogHandler.bind(this);
  }

  goToPaletteHandler() {
    this.props.goToPalette(this.props.id);
  }

  openDialogHandler(e) {
    e.stopPropagation();
    this.props.openDialog(this.props.id);
  }

  render() {
    const { paletteName, emoji, colors, classes } = this.props;
    
    return (
      <div className={classes.root} onClick={this.goToPaletteHandler}>
        <DeleteIcon className={classes.deleteIcon} onClick={this.openDialogHandler} />
        <div className={classes.colors}>
          {colors.map(c => <div key={c.name} className={classes.miniColor} style={{ backgroundColor: c.color }} />)}
        </div>
        <h5 className={classes.title}>
          {paletteName}<span className={classes.emoji}>{emoji}</span>
        </h5>
      </div>
    );
  }
}

export default withStyles(styles)(MiniPalette);