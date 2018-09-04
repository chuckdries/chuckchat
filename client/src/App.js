import React, { Component } from 'react';
import { insert } from 'ramda';
import io from 'socket.io-client';
// import logo from './logo.svg';
import config from './config';
import './App.css';

import MessageForm from './MessageForm';

const socket = io.connect(config.apiURL);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // messages: {},
      messages: [],
    };

    this.receiveMsg = this.receiveMsg.bind(this);
  }

  componentDidMount() {
    socket.on('message', this.receiveMsg);
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json)); // eslint-disable-line no-console
  }

  receiveMsg(message) {
    console.log('received message', message);
    const { messages } = this.state;
    const newMessages = insert(messages.length, message, messages);
    this.setState({
      messages: newMessages,
    });
  }

  render() {
    const { messages } = this.state;
    return (
      <div className="App">
        <ul>
          {messages.map(message => (
            <li
              key={message.user + message.message}
            >
              {message.user}: {message.message}
            </li>))
          }
        </ul>
        <MessageForm socket={socket} />
      </div>
    );
  }
}

export default App;
