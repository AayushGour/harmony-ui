import { Logout, Search } from '@mui/icons-material';
import { Autocomplete, message } from 'antd';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoggedIn, toggleSidebar, ytSearch } from '../store/action';
import "./styles/header.scss";

const Header = (props) => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const userName = localStorage.getItem("username");

    const onSearch = () => {
        if (search?.toString()?.trim() !== "") {
            navigate(`/search?search=${search?.toString()?.trim()}`)
        } else {
            message.warning({ content: "Enter Search Text", className: "msg-popup" })
        }
    }

    return (
        <div className="site-header">
            <form className='search-panel-container' onSubmit={(e) => { e.preventDefault(); onSearch(); }}>
                <Search />
                <input
                    className='search'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for a song, artist, etc."
                />
            </form>
            <button onClick={() => { props.toggleSidebar(!props.isSidebarCollapsed) }}>
                collapse
            </button>
            <button onClick={() => { props.toggleTheme(); }} >{props.isDarkTheme === "light" ? "Light" : "Dark"}</button>
            <span>{userName}</span>
            <button onClick={() => { props.setLoggedIn(false) }}><Logout /> </button>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        isSidebarCollapsed: state.app.isSidebarCollapsed
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        toggleSidebar: (value) => dispatch(toggleSidebar(value)),
        setLoggedIn: (value) => dispatch(setLoggedIn(value))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);