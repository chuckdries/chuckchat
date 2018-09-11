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
  id: number;
}

interface State {
  loadingMessages: boolean;
  messages: Message[];
}


class App extends Component<object, State> {
  private messageContainer: HTMLElement;

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
      .then((messages: Message[]) => {
        this.setState({
          loadingMessages: false,
          messages,
        })
        console.log(messages) // tslint:disable-line:no-console
      })

    socket.on('message', this.receiveMsg);
  }

  public receiveMsg(message: any) {
    console.log('received message', message); // tslint:disable-line:no-console
    const { messages } = this.state;
    const newMessages = insert(messages.length, message, messages);
    this.setState({
      messages: newMessages,
    });
    setImmediate(() => this.messageContainer.scrollTop = this.messageContainer.scrollHeight);
  }

  public render() {
    const { messages, loadingMessages } = this.state;
    return (
      <div className="App fs-1 flex flex-column">
        <h1 className="my1">Chat.</h1>
        <ul ref={ref => this.messageContainer = ref as HTMLElement} className="flex-auto px0 py1 mt0 mx0 mb1 overflow-scroll">
          {messages.map(message => (
            <li
              key={message.id}
              style={{ listStyle: "none" }}
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
