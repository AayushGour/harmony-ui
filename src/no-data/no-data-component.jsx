import { Empty } from 'antd';
import React from 'react';
import "./no-data-component.scss";

const NoDataComponent = (props) => {
    return (
        <Empty description={props.title || "No Data Available"} className={"no-data-component" + " " + props?.className} />
    )
}

export default NoDataComponent;