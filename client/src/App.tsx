import { insert } from 'ramda';
import React, { Component } from 'react';
import io from 'socket.io-client';
import urljoin from 'url-join';
// import logo from './logo.svg';
import config from './config';

import MessageForm from './components/MessageForm';

const socket = io.connect(config.apiURL);

class App extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      loadingMessages: true,
      messages: [],
    };

    this.receiveMsg = this.receiveMsg.bind(this);
  }

  public componentDidMount() {
    fetch(urljoin(config.apiURL, '/messages'))
      .then(messages => this.setState({
        loadingMessages: false,
        messages,
      }))
    socket.on('message', this.receiveMsg);
  }

  public receiveMsg(message: any) {
    console.log('received message', message); // tslint:disable-line:no-console
    const { messages } = this.state;
    const newMessages = insert(messages.length, message, messages);
    this.setState({
      messages: newMessages,
    });
  }

  public render() {
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
