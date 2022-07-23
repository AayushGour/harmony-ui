import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import "./App.scss";
import 'antd/dist/antd.css';
import "./theme.scss";
import Main from './components/main/main';
import store from './components/store/store';
import { axios } from './common/axios';
import Login from './components/auth/login';
const App = () => {
    document.body.className = localStorage.getItem("theme") || "light";
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<Login type="login" />} />
                    <Route path="/signup" element={<Login type="signup" />} />
                    <Route path="/error" element={<h1>Error</h1>} />
                    <Route path="/*" element={<Main />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}
export default App; 
