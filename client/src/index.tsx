import 'basscss/css/basscss.css';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root')); // eslint-disable-line no-undef
registerServiceWorker();
