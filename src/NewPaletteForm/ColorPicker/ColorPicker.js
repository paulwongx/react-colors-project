import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
import chroma from 'chroma-js';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/styles';
import Button from "@material-ui/core/Button";

import styles from '../../Styles/ColorPickerStyles';

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorName: "",
      color: "pink",
    };

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.changeColorPicker = this.changeColorPicker.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isColorNameUnique', val => {
      return this.props.colors.every(color => color.name.toLowerCase() !== val.toLowerCase());
    });
    ValidatorForm.addValidationRule('isColorUnique', () => {
      return this.props.colors.every(c => c.color !== this.state.color);
    });
  }

  handleChange(e) {
    this.setState({ colorName: e.target.value });
  }

  changeColorPicker(color) {
    this.setState({ color: color.hex });
  }

  submit() {
    const newColor = {
      name: this.state.colorName,
      color: this.state.color
    };
    this.props.handleSubmitColor(newColor);
    this.setState({ colorName: "" });
  }

  render() {
    const { classes, paletteIsFull } = this.props;
    const { colorName, color } = this.state;

    return (
      <div>
        <ChromePicker className={classes.picker} color={color} onChangeComplete={this.changeColorPicker} />
        <ValidatorForm onSubmit={this.submit} instantValidate={false}>
          <TextValidator
            className={classes.colorInput}
            onChange={this.handleChange}
            variant="filled"
            margin="normal"
            value={colorName}
            name="colorName"
            placeholder="Color Name"
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={['this field is required', 'Name must be unique.', 'Color already used']}
          />
          <Button
            className={classes.addColor}
            variant="contained"
            type="submit"
            style={{ 
              backgroundColor: paletteIsFull ? "gray" : color,
              color: chroma(color).luminance() < 0.08 ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.5)",
            }}
            disabled={paletteIsFull}
          >
            {paletteIsFull ? "Palette Full" : "Add Color"}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default withStyles(styles)(ColorPicker);