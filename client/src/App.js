import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Chuck',
    };

    this.changeName = this.changeName.bind(this);
  }

  changeName(e) {
    this.setState({
      name: e.target.value,
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
          <input type="test" onChange={this.changeName} value={name} />
        </p>
      </div>
    );
  }
}

export default App;
