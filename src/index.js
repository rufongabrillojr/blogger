import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App';

const AppWithStore = () => (
    <App />
);

ReactDOM.render(<AppWithStore />, document.getElementById('root'));
