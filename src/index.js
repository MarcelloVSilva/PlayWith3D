import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Simple from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <div>
        <Simple />
    </div>, document.getElementById('root'));
serviceWorker.unregister();
