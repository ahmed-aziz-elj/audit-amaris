import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

export function calculateProgress(auditItems, auditItems2) {
  const totalQuestions = auditItems.length + auditItems2.length;
  const OK_Response = auditItems.filter(item => item.response && item.response === 'OK').length;
  return totalQuestions > 0 ? Math.round((OK_Response / totalQuestions) * 100) : 0;
}

export function getResponseClass(response) {
  switch (response) {
    case 'OK': return 'bg-green-100 text-green-800';
    case 'NOT OK': return 'bg-red-100 text-red-800';
    case 'NC': return 'bg-yellow-100 text-yellow-800';
    case 'NA': return 'bg-gray-100 text-gray-800';
    default: return '';
  }
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
