import { insert } from 'ramda';
import React, { Component } from 'react';
import io from 'socket.io-client';
import urljoin from 'url-join';
// import logo from './logo.svg';
import config from './config';

import MessageForm from './components/MessageForm';

const socket = io.connect(config.apiURL);

interface Message {
  user: string;
  message: string;
}

interface State {
  loadingMessages: boolean;
  messages: Message[];
}


class App extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      // loadingMessages: true,
      loadingMessages: false,
      messages: [],
    };

    this.receiveMsg = this.receiveMsg.bind(this);
  }

  public componentDidMount() {
    fetch(urljoin(config.apiURL, '/messages'))
      .then(response => response.json())
      .then((messages: Message[]) => this.setState({
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
      <div className="App fs-1 flex flex-column">
        <h1>Chat.</h1>
        <ul className="flex-auto p0">
          {messages.map(message => (
            <li
              key={message.user + message.message}
              style={{ listStyle: "none"}}
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
