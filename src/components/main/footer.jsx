import React from 'react';
import "./styles/footer.scss";
import { connect } from 'react-redux';

const Footer = (props) => {
    return (
        <div className="footer">Footer</div>
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