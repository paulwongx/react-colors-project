import React, { Component } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: "form",
      paletteName: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.showEmojiPicker = this.showEmojiPicker.bind(this);
    this.showForm = this.showForm.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isPaletteNameUnique', val => {
      return this.props.palettesNames.every(p => p.toLowerCase() !== val.toLowerCase());
    });
  }

  handleChange(e) {
    this.setState({ paletteName: e.target.value });
  }

  submit(emoji) {
    this.props.handleSubmit(this.state.paletteName, emoji.native);
    this.setState({ stage: "" });
  }

  showEmojiPicker() {
    this.setState({ stage: "picker" });
  }

  showForm() {
    this.setState({ stage: "form" });
  }
  render() {
    const { handleDialogeToggle } = this.props;
    const { paletteName, stage } = this.state;

    return (
      <div>
        <Dialog open={stage === "picker"} onClose={this.showForm} aria-labelledby="form-dialog-title">
          {/* <DialogTitle id="form-dialog-title">Choose Emoji</DialogTitle> */}
          <Picker title="Pick a Palette Emoji" onClick={this.submit} />
        </Dialog>

        <Dialog open={stage === "form"} onClose={handleDialogeToggle} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Choose a Palette Name <span role='img' aria-label='emoji'>🎨</span></DialogTitle>
          <ValidatorForm>
            <DialogContent>
              <DialogContentText>
                Enter a name for your new beautiful palette.
                Make sure it's unique!
              </DialogContentText>
              <TextValidator
                onChange={this.handleChange}
                value={paletteName}
                name="paletteName"
                fullWidth
                margin="normal"
                placeholder="Palette Name"
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={['this field is required', 'Palette name must be unique.']}
              />
              <DialogActions>
                <Button onClick={handleDialogeToggle} color="primary">
                  Cancel
                  </Button>
                <Button onClick={this.showEmojiPicker} color="primary">
                  Save
                  </Button>
              </DialogActions>
            </DialogContent>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}

export default PaletteMetaForm;