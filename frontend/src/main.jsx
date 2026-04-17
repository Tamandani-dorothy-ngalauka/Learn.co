import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App.jsx';
import { CourseProvider } from "../context/CourseContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CourseProvider>
      <App />
    </CourseProvider>
  </React.StrictMode>
);

