import { Add, DragIndicator, PlayArrow, Share } from '@mui/icons-material';
import { Tooltip } from 'antd';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import NoDataComponent from '../../no-data/no-data-component';
import Loader from '../loader/loader';
import { ReactSortable } from "react-sortablejs";
import "./yt-items-list.scss";

const YTItemList = forwardRef((props, ref) => {
    const dragItem = useRef();
    const dragOverItem = useRef();
    const [list, setList] = useState(props?.elements || []);

    useEffect(() => {
        setList(props?.elements);
    }, [props?.elements])

    const renderListItems = (data) => {
        if (!!data && data?.length > 0) {
            return data?.map((item, index) => {
                return <li
                    className={`yt-list-item${index === data?.length - 1 ? " last" : ""}`}
                    key={(item?.id || item?._id) + index}
                >
                    <div className='list-item-content'>
                        {props?.draggable ? <DragIndicator
                            className={"drag-indicator"}
                        />
                            : null}
                        {props?.displayRank && <h3 className='list-item-rank mb-0'>{item?.rank}</h3>}
                        {!!item?.thumbnailUrl ?
                            <div className='thumbnail-container'>
                                <img src={item?.thumbnailUrl} className="yt-thumbnail" />
                            </div>
                            : null}
                        <div className='item-title-container'>
                            <span className='title'>{item?.title}</span>
                            <span className='author-name'>{item?.authorName}</span>
                        </div>
                    </div>
                    {props.displayButtons ?
                        <div className='btn-container'>
                            <span className='item-duration'>{item?.duration}</span>
                            <Tooltip title="Play Now">
                                <button className="action-btn play-btn"><PlayArrow /></button>
                            </Tooltip>
                            <Tooltip title="Add to Queue">
                                <button className="action-btn add-btn"><Add /></button>
                            </Tooltip>
                            {/* <button className="action-btn"><Share /></button> */}
                        </div> : null
                    }
                </li>
            })
        } else {
            return <NoDataComponent />
        }
    }

    // const CustomDraggableListContainer = forwardRef((listProps, listRef) => {
    //     return <ul ref={listRef} className="yt-list-container">{listProps.children}</ul>
    // })

    return (
        props?.isLoading ? <Loader loaderStyle={{ height: "70px", width: "70px" }} /> :
            !!list && list?.length > 0 ?
                (props?.draggable ?
                    <ReactSortable
                        handle='.drag-indicator'
                        tag={"ul"}
                        className='yt-list-container'
                        list={list}
                        setList={setList}
                        animation={500}
                        easing="ease-in-out"
                        removeCloneOnHide={true}
                    // disabled={!props.draggable}
                    >
                        {renderListItems(list)}
                    </ReactSortable>
                    :
                    <ul ref={ref} className="yt-list-container">
                        {renderListItems(list)}
                    </ul>)
                : <NoDataComponent />

    )
})

export default YTItemList;