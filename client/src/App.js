import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Chuck',
    };
  }

  changeName(name) {
    this.setState({
      name,
    });
  }

  render() {
    const {
      name,
    } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React, {name}</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js </code> and save to reload.
          <input type="test" onChange={e => this.changeName(e.target.value)} value={name} />
        </p>
      </div>
    );
  }
}

export default App;
