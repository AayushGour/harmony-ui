import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.scss";
import Main from './components/main/main';
import Test from './components/main/test';
import store from './components/store/store';
import { axios } from './common/axios';
const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/test" element={<Test />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}
export default App; 
