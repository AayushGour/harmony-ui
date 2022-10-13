import { Close } from '@mui/icons-material';
import { Switch, Tooltip } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Logo, sidebarBottomMenuItems, sidebarMenuItems } from '../../common/constants';
import { toggleSidebar } from '../store/action';
import "./styles/sidebar.scss";
const Sidebar = (props) => {
    let location = useLocation();

    return <div className={`left-sidebar ${props.isSidebarCollapsed ? "collapsed" : "expanded"}`} id="left-sidebar">
        <div className='logo-container'>
            <Logo className="logo" height={props.isSidebarCollapsed ? "50px" : "100px"} width={props.isSidebarCollapsed ? "50px" : "100px"} strokeWidth={props.isSidebarCollapsed ? 2.5 : 2} />
            <h3 className='logo-title'>Harmony</h3>
            <button className='sidebar-close-btn' onClick={() => { props.toggleSidebar(true) }} ><Close /> </button>
        </div>
        <ul className='nav-list-container'>
            {sidebarMenuItems?.map((item, index) => {
                if (item?.type === "divider") {
                    return <div className='sidebar-divider' key={item?.id}></div>
                } else {
                    return <Tooltip title={props?.isSidebarCollapsed ? item?.title : ""} placement="right"  key={item?.id || index}>
                        <Link title={`${item?.title}`} to={item?.route} className={`nav-list-item ${location?.pathname === item?.route ? "selected" : ""}`} key={item?.id} >
                            {item?.icon}
                            <span className='nav-list-title'>
                                {item?.title}
                            </span>
                        </Link>
                    </Tooltip>
                }
            })}
        </ul>
        <div className='sidebar-divider'></div>
        <ul className='bottom-nav-list nav-list-container'>
            {sidebarBottomMenuItems?.map((elem, index) => {
                let listElement;
                switch (elem?.type) {
                    case "nav-link":
                        listElement = <Link key={elem?.title + index} title={`${elem?.title}`} to={elem?.route} className={`nav-list-item ${location?.pathname === elem?.route ? "selected" : ""}`} key={elem?.id} >
                            {elem?.icon}
                            <span className='nav-list-title'>
                                {elem?.title}
                            </span>
                        </Link>
                        break;
                    case "switch":
                        listElement = <SwitchElement key={elem?.title + index} element={elem} onSwitchClick={props.toggleTheme} value={props.theme} onValue="dark" offValue="light" />
                }

                return <Tooltip key={elem?.title + "tooltip" + index} title={props?.isSidebarCollapsed ? elem?.title : ""} placement="right">
                    {listElement}
                </Tooltip>
            })}
        </ul>
    </div>
}

const SwitchElement = (props) => {
    let icon = props?.value === props?.onValue ? props?.element?.onIcon : props?.element?.offIcon
    return <li className="nav-list-item" onClick={props?.onSwitchClick}>
        {icon}
        <span className='nav-list-title'>
            {props?.element?.title}
        </span>
        <Switch className='switch-element-switch' checked={props.value === props?.onValue} onChange={props?.onSwitchClick} />
    </li>
}
const mapStateToProps = (state) => {
    return {
        isSidebarCollapsed: state.app.isSidebarCollapsed
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        toggleSidebar: (value) => dispatch(toggleSidebar(value)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);