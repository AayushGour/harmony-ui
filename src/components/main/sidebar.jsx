import React from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Logo, sidebarMenuItems } from '../../common/constants';
import "./styles/sidebar.scss";
const Sidebar = (props) => {
    let location = useLocation();

    return <div className={`left-sidebar ${props.isSidebarCollapsed ? "collapsed" : ""}`} id="left-sidebar">
        <div className='logo-container'>
            <Logo className="logo" height={props.isSidebarCollapsed ? "50px" : "100px"} width={props.isSidebarCollapsed ? "50px" : "100px"} strokeWidth={props.isSidebarCollapsed ? 2.5 : 2} />
            <h3 className='logo-title'>Harmony</h3>
        </div>
        <ul className='nav-list-container'>
            {sidebarMenuItems?.map((item, index) => {
                if (item?.type === "divider") {
                    return <div className='sidebar-divider' key={item?.id}></div>
                } else {
                    return <Link to={item?.route} className={`nav-list-item ${location?.pathname === item?.route ? "selected" : ""}`} key={item?.id} >
                        {item?.icon}
                        <span className='nav-list-title'>
                            {item?.title}
                        </span>
                    </Link>
                }
            })}
        </ul>
    </div>
}

const mapStateToProps = (state) => {
    return {
        isSidebarCollapsed: state.app.isSidebarCollapsed
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);