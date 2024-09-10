import React from 'react';
import { createRoot } from 'react-dom/client'; // createRoot をインポート
import App from './App';

const container = document.getElementById('root'); // レンダリング先の要素を取得
const root = createRoot(container); // createRoot を使って root を作成
root.render(<App />); // root.render で App をレンダリング
