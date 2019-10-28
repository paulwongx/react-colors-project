import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Routes from './Routes';
import palettes from './seedColors';

class App extends Component {
  constructor(props) {
    super(props);
    const savedPalttes = JSON.parse(window.localStorage.getItem("palettes")) || palettes;
    this.state = {
      palettes: savedPalttes,
    };

    this.addNewPalette = this.addNewPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
    this.getRandomColor = this.getRandomColor.bind(this);
  }

  addNewPalette(palette) {
    this.setState({ palettes: [...this.state.palettes, palette] }, this.synchLocalStorage);
  }

  deletePalette(id) {
    const updatedPalettes = this.state.palettes.filter(p => p.id !== id);
    this.setState({ palettes: updatedPalettes }, this.synchLocalStorage);
  }

  synchLocalStorage() {
    window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes));
  }

  getRandomColor() {
    const randomPaletteIndex = Math.floor(Math.random() * palettes.length);
    const randomPalette = { ...palettes[randomPaletteIndex] };

    const randomColorIndex = Math.floor(Math.random() * randomPalette.colors.length);
    const randomColor = randomPalette.colors[randomColorIndex];

    return randomColor;
  }

  render() {
    return (
      <Route render={({ location }) => (
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            classNames='page'
            timeout={500}
          >
            <Routes
              location={location}
              palettes={this.state.palettes}
              defaultPalette={palettes[0]}
              addNewPalette={this.addNewPalette}
              deletePalette={this.deletePalette}
              getRandomColor={this.getRandomColor}
            />
          </CSSTransition>
        </TransitionGroup>
      )}
      />
    );
  }
}

export default App;
