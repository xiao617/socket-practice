import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import {Row,Col} from 'antd';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import SocketTest from './pages/socketTest';
import SocketChat from './pages/socketChat';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Row>
        <Col span={8} />
        <Col span={8} >
          <SocketChat />
        </Col>
        <Col span={8} />
      </Row>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
