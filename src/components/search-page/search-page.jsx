import { message } from 'antd';
import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Loader from '../loader/loader';
import { ytSearch } from '../store/action';
import YTItemList from '../yt-items-list/yt-items-list';
import "./search-page.scss";
const SearchPage = (props) => {
    const location = useLocation();
    let searchParam = new URLSearchParams(location.search)?.get("search")?.toString();
    const [queryCorrected, setQueryCorrected] = useState(false);
    const [searchItems, setSearchItems] = useState(null);
    const [channel, setChannel] = useState(null);
    const [shelf, setShelf] = useState(null);
    const [searchContinuation, setSearchContinuation] = useState(null);
    const [isListLoading, setIsListLoading] = useState(false);
    const searchListRef = useRef(null);
    const [isDataLoading, setIsDataLoading] = useState(true);

    const refObserver = new IntersectionObserver((entities, observer) => {
        console.log(entities, observer)
        if (entities[0].isIntersecting) {
            loadMore();
        }
    }, {
        root: searchListRef.current || null, rootMargin: "0px 0px 0px 0px", threshold: 0.0
    })
    const loadMore = () => {
        setIsListLoading(true);
        ytSearch({ continuation: searchContinuation }).then(resp => {
            setSearchItems([...searchItems, ...resp.searchItems]);
            setSearchContinuation(resp.continuation);
            setIsListLoading(false);
        })
    }
    useEffect(() => {
        if (!!searchParam) {
            setIsDataLoading(true);
            setIsListLoading(true);
            ytSearch({ search: searchParam }).then((response) => {
                console.log(response);
                if (response?.originalQuery === response?.correctedQuery) {
                    setQueryCorrected(false)
                } else {
                    setQueryCorrected(response?.correctedQuery);
                }
                setSearchItems(response?.searchItems);
                setSearchContinuation(response?.continuation);
                setChannel(response.channel);
                setShelf(response.shelf);
                setIsListLoading(false);
                setIsDataLoading(false);
            }).catch(error => {
                console.error(error);
                message.info({ content: "Something went wrong.", className: "msg-popup" });
                setSearchItems([]);
                setChannel(null);
                setShelf(null);
                setIsListLoading(false);
                setIsDataLoading(false);
            })
        } else {
            //No data
            setSearchItems([]);
            setIsListLoading(false);
            setIsDataLoading(false);
            message.info({ content: "No Data Available.", className: "msg-popup" });

        }
    }, [location.search])

    useEffect(() => {
        return () => {
            searchListRef?.current?.removeEventListener("scroll", setListScrollListener)
        }
    }, [])

    const setListScrollListener = () => {
        let obj = document.querySelector(".yt-list-container");
        if (obj.scrollTop === (obj.scrollHeight - obj.offsetHeight)) {
            loadMore();
        }
    }

    return (
        <div className='content-container search-page-container'>
            <div className='search-header'>
                {!!queryCorrected ?
                    <h2 className='search-title'>Did you mean {queryCorrected}?</h2>
                    :
                    isDataLoading ? <h2 className='search-title'>Searching for {searchParam}...</h2> : <h2 className='search-title'>Searched for {searchParam}</h2>
                }
            </div>
            {isDataLoading ?
                <Loader className="w-100 h-100" />
                :
                <div className='search-result-content'>
                    {!!searchItems &&
                        <div className='card yt-list-card'>
                            <YTItemList displayButtons={true} ref={el => {
                                searchListRef.current = el;
                                searchListRef?.current?.addEventListener("scroll", setListScrollListener)
                            }} elements={searchItems} isContinuationLoading={isListLoading} />
                        </div>
                    }
                    {!!channel && <div className='card channel-card'>
                        <img src={channel?.authorAvatarUrl} className="avatar-image" />
                        <h3 className='card-title channel-name'>{channel?.authorName}</h3>
                        <div><span>{channel?.subscribers}</span></div>
                    </div>}
                    {!!shelf && <div className='card shelf-card'>
                        <h3 className='card-title shelf-name'>{shelf?.name}</h3>
                        <YTItemList displayButtons={true} elements={shelf.items} />
                    </div>}
                </div>
            }
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


export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);