import React from 'react';
import "./styles/footer.scss";
import { connect } from 'react-redux';
import { useState } from 'react';
import { ArrowDropDown, ArrowDropUp, Loop, PlayArrow, Shuffle, SkipNext, SkipPrevious } from "@mui/icons-material"

const Footer = (props) => {
    const [isFooterOpen, setIsFooterOpen] = useState(false);
    return (
        <div className={`footer ${isFooterOpen ? "open" : "closed"}`}>
            <button className='toggle-footer' onClick={() => setIsFooterOpen(!isFooterOpen)}>
                {isFooterOpen ? <ArrowDropDown /> : <ArrowDropUp />}
            </button>
            <div className="player-container"></div>
            <div className="controller-panel">
                <div className="btn-panel">
                    <Shuffle />
                    <SkipPrevious />
                    <PlayArrow />
                    <SkipNext />
                    <Loop />
                </div>
                <div className="progress-panel">
                    hello
                </div>
            </div>
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