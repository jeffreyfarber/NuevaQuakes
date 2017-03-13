import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import QuakeView from './quakeView.js';

export default class NuevaQuakes extends Component {
  render() {
    return (
      <QuakeView />
    );
  }
}

AppRegistry.registerComponent('NuevaQuakes', () => NuevaQuakes);

