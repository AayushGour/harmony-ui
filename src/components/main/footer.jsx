import React from 'react';
import "./styles/footer.scss";
import { connect } from 'react-redux';
import { useState } from 'react';
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material"

const Footer = (props) => {
    const [isFooterOpen, setIsFooterOpen] = useState(false);
    return (
        <div className={`footer ${isFooterOpen ? "open" : "closed"}`}>
            <button className='toggle-footer' onClick={() => setIsFooterOpen(!isFooterOpen)}>
                {isFooterOpen ? <ArrowDropDown /> : <ArrowDropUp />}
            </button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Footer);