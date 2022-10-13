// import Peer from 'peerjs';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actionButtonActionNames, actionButtonActions } from '../../common/constants';
import HarmonyModal from '../../utility/harmony-modal/harmony-modal';
import { setLoggedIn } from '../store/action';
import Footer from './footer';
import Header from './header';
import Router from './router';
import Sidebar from './sidebar';
import "./styles/main.scss";
const Main = (props) => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
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

    const handleActionButtons=(actionName)=>{
        switch (actionName) {
            case actionButtonActionNames.CREATE_PLAYLIST:
                //Open Popup
                setIsPopupOpen(true);
                break;
        
            default:
                break;
        }
    }

    const createPlaylist=()=>{
        
    }

    return (
        <div className={`site-main-layout flex-column ${theme}`} >
            <HarmonyModal isOpen={isPopupOpen} onCancel={() => setIsPopupOpen(false)} onOk={createPlaylist}>This modal</HarmonyModal>
            <div className='main-layout d-flex flex-row flex-1 w-100'>
                <Sidebar toggleTheme={toggleTheme} theme={theme} />
                <div className='content-layout h-100'>
                    <Header toggleTheme={() => toggleTheme()} isDarkTheme={theme} />
                    <div className='site-content h-100 position-relative'>
                        <Router />
                        <SpeedDial
                            ariaLabel='floating-action-button'
                            className='floating-action-button-container'
                            sx={{ position: "absolute", bottom: "16px", right: "16px" }}
                            icon={<SpeedDialIcon />}
                        >
                            {actionButtonActions?.map((action, index) => {
                                return <SpeedDialAction
                                    key={action?.name}
                                    icon={action?.icon}
                                    tooltipTitle={action?.name}
                                    tooltipOpen
                                    onClick={(e) =>{
                                        handleActionButtons(action?.name)
                                    }}
                                />
                            })}
                        </SpeedDial>
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
