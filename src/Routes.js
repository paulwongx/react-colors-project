import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Page from './Page/Page';
import PaletteList from './PaletteList/PaletteList';
import Palette from './Palette/Palette';
import SingleColorPalette from './SingleColorPalette/SingleColorPalette';
import NewPaletteForm from './NewPaletteForm/NewPaletteForm';

class Routes extends Component {
  render() {
    const { palettes, addNewPalette, deletePalette, getRandomColor, location, defaultPalette } = this.props;
    const palettesNames = palettes.map(p => p.paletteName);

    return (
      <Switch location={location}>
        <Route
          exact
          path='/'
          render={(routerProps) => (
            <Page>
              <PaletteList {...routerProps} deletePalette={deletePalette} palettes={palettes} />
            </Page>
          )}
        />
        <Route
          exact
          path='/palette/new'
          render={(routerProps) => (
            <Page>
              <NewPaletteForm {...routerProps} getRandomColor={getRandomColor} defaultPalette={defaultPalette} palettesNames={palettesNames} addNewPalette={addNewPalette} />
            </Page>
          )}
        />
        <Route
          exact
          path='/palette/:paletteId'
          render={(routerProps) => (
            <Page>
              <Palette {...routerProps} palettes={palettes} />
            </Page>
          )}
        />
        <Route
          exact
          path='/palette/:paletteId/:colorName'
          render={(routerProps) => (
            <Page>
              <SingleColorPalette {...routerProps} palettes={palettes} />
            </Page>
          )}
        />
        <Redirect to='/' />
      </Switch>
    );
  }
}

export default Routes;