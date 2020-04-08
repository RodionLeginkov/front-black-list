import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom'
import store from './Redux/Store';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Provider store={store}>
<BrowserRouter>
<App />
</BrowserRouter>
</Provider>, document.getElementById('root'));
serviceWorker.unregister();
