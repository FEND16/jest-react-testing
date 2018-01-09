import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';

const mountPoint = document.getElementById('root');

/**
 * For example: to get in Swedish krona on 20 feb 2010
 * <App base="SEK" date="2010-02-20" />
 */
ReactDOM.render(<App />, mountPoint);

registerServiceWorker();
