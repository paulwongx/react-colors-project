import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import classNames from 'classnames';
import { withStyles } from '@material-ui/styles';

import styles from '../../Styles/ColorBoxStyles';

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = { copied: false };

    this.handleOverlayBackground = this.handleOverlayBackground.bind(this);
    this.moreClickHandler = this.moreClickHandler.bind(this);
  }

  moreClickHandler(e) {
    e.stopPropagation();
    this.props.push(`/palette/${this.props.paletteId}/${this.props.color.id}`);
  }

  handleOverlayBackground() {
    this.setState({ copied: true }, () => {
      setTimeout(() => {
        this.setState({ copied: false });
      }, 1500);
    });
  }

  render() {
    const { color, format, classes } = this.props;
    const { copied } = this.state;

    return (
      <CopyToClipboard text={color[format]} onCopy={this.handleOverlayBackground}>
        <div className={classes.colorBox}>
          <div className={classNames(classes.copyOverlay, {[classes.showOverlay] : copied})} />
          <div className={classNames(classes.copyMessage, {[classes.showMessage] : copied})}>
            <h1>Copied!</h1>
            <p className={classes.luminance}>{color[format]}</p>
          </div>
          <div>
            <div className={classes.boxContent}>
              <span className={classes.luminance}>{color.name}</span>
            </div>
            <button className={`${classes.copyButton} ${classes.luminance}`} disabled={copied}>Copy</button>
          </div>
          {this.props.showLink && <button className={classes.seeMore} onClick={this.moreClickHandler}>More</button>}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);