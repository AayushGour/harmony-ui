// import Peer from 'peerjs';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoggedIn } from '../store/action';
import Footer from './footer';
import Header from './header';
import Router from './router';
import Sidebar from './sidebar';
import "./styles/main.scss";
const Main = (props) => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    // const peer = new Peer("my-peer");
    // peer.on("open", (id) => {
    //     console.log("Open", id)
    // })
    // peer.on("connection", (conn) => {
    //     console.log("Connection", conn)
    // })
    // peer.on("call", (call) => {
    //     console.log("Call", call);
    //     call.answer();
    // })
    // peer.on("error", (error) => {
    //     console.log("error", error);
    // })

    let navigate = useNavigate();

    useEffect(() => {
        if (!props.isLoggedIn) {
            //Logout
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            localStorage.setItem("isAuthorized", false);
            navigate("/login");
        }
    }, [props.isLoggedIn])

    const toggleTheme = () => {
        let themeName = theme === "light" ? "dark" : "light";
        document.body.className = themeName
        localStorage.setItem("theme", themeName);
        setTheme(themeName);
    }
    return (
        <div className={`site-main-layout flex-column ${theme}`} >
            <div className='main-layout d-flex flex-row flex-1 w-100'>
                <Sidebar />
                <div className='content-layout h-100'>
                    <Header toggleTheme={() => toggleTheme()} isDarkTheme={theme} />
                    <div className='site-content h-100'>
                        <Router />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.app.isLoggedIn
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setLoggedIn: (value) => dispatch(setLoggedIn(value))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main); 
