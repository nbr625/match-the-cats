import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './components/Game,js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Cat Matching Game</h2>
        </div>
        <p className="App-intro">
          Try to match the cats
        </p>

        <Game />
      </div>
    );
  }
}

export default App;
