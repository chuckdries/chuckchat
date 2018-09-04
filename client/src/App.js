import React, { Component } from 'react';
import { insert } from 'ramda';
import io from 'socket.io-client';
import urljoin from 'url-join';
// import logo from './logo.svg';
import config from './config';

import MessageForm from './components/MessageForm';

const socket = io.connect(config.apiURL);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // messages: {},
      loadingMessages: true,
      messages: [],
    };

    this.receiveMsg = this.receiveMsg.bind(this);
  }

  componentDidMount() {
    fetch(urljoin(config.apiURL, '/messages'))
      .then(messages => this.setState({
        messages,
        loadingMessages: false,
      }))
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
    const { messages, loadingMessages } = this.state;
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
        {!loadingMessages && <MessageForm socket={socket} />}
      </div>
    );
  }
}

export default App;
