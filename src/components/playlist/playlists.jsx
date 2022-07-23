import { ArrowBack } from '@mui/icons-material';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import NoDataComponent from '../../no-data/no-data-component';
import Loader from '../loader/loader';
import YTItemList from '../yt-items-list/yt-items-list';
import "./playlists.scss";
import { getPlaylistData, getPlaylists } from './store/actions';

const PlaylistsPage = (props) => {
    const [isPlaylistsLoading, setIsPlaylistsLoading] = useState(false);
    const [isPlaylistDataLoading, setIsPlaylistDataLoading] = useState(false);
    useEffect(() => {
        setIsPlaylistsLoading(true);
        props.getPlaylists()?.then(() => setIsPlaylistsLoading(false));
    }, [])

    const handleItemClick = (id) => {
        setIsPlaylistDataLoading(true);
        props.setSelectedPlaylist(id)?.then(() => {
            setIsPlaylistDataLoading(false);
        });
    }

    return (
        <div className="content-container playlists-page">
            <div className={`panel left-panel card ${!!props.selectedPlaylist || isPlaylistDataLoading ? "collapsed" : "expanded"}`}>
                {isPlaylistsLoading ? <Loader />
                    :
                    <ul className='playlist-list-container'>
                        {!!props.playlists && props?.playlists?.length > 0 ?
                            props?.playlists?.map(list => {
                                return <li key={list?._id} onClick={() => props.selectedPlaylist?._id !== list._id && handleItemClick(list?._id)} className={`playlist-item ${props.selectedPlaylist?._id === list._id ? "selected" : ""}`}>{list?.title}</li>
                            }) : <NoDataComponent />}
                    </ul>
                }
            </div>
            <div className={`panel right-panel card ${!!props.selectedPlaylist || isPlaylistDataLoading ? "expanded" : "collapsed"}`}>
                <div className='back-btn-container'><ArrowBack onClick={() => props.setSelectedPlaylist(null)} className='back-btn' /><h4 className='playlist-title'>{props.selectedPlaylist?.title}</h4></div>
                <YTItemList draggable={true} elements={props?.selectedPlaylist?.playlist} displayButtons={true} isLoading={isPlaylistDataLoading} />
            </div>
        </div>
    )

}
const mapStateToProps = (state) => {
    return {
        playlists: state.playlist.playlists,
        selectedPlaylist: state.playlist.selectedPlaylist
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPlaylists: () => dispatch(getPlaylists()),
        setSelectedPlaylist: (id) => dispatch(getPlaylistData(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PlaylistsPage);