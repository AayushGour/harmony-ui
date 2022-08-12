import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from "react-dom/client"
import App from './App';
import "./index.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />); 
