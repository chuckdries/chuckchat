import React, { Component } from 'react';
import { insert } from 'ramda';
import io from 'socket.io-client';
// import logo from './logo.svg';
import config from './config';

import MessageForm from './components/MessageForm';

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
      <div className="App fs-1">
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
