import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Appコンポーネントをルート要素にレンダリング
ReactDOM.render(
    <App />, // Appコンポーネントを描画
  document.getElementById('root') // HTMLファイル内のid="root"の要素に描画
);
