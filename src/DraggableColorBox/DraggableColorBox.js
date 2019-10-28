import React from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { SortableElement } from 'react-sortable-hoc';
import styles from '../Styles/DraggableColorBoxStyles';

const DraggableColorBox = SortableElement(({ classes, name, deleteColorHandler }) => {
  return (
    <div className={classes.root}>
      <div className={classes.boxContent}>
        <span className={classes.name}>{name}</span>
        <DeleteIcon className={classes.deleteIcon} onClick={deleteColorHandler} />
      </div>
    </div>
  );
});


export default withStyles(styles)(DraggableColorBox);