import axios from "axios"
import { GET_PLAYLISTS, SET_SELECTED_PLAYLIST } from "./action-types"

const setPlaylists = (data) => {
    return ({ type: GET_PLAYLISTS, payload: data });
}
const setSelectedPlaylist = (data) => {
    return ({ type: SET_SELECTED_PLAYLIST, payload: data });
}

export const getPlaylists = () => {
    return (dispatch) => {
        return axios.get(process.env.GET_PLAYLISTS, {
            params: {
                username: localStorage.getItem("username")
            }
        }).then(resp => {
            dispatch(setPlaylists(resp?.data));
        })
    }
}

export const getPlaylistData = (playlistId) => {
    return (dispatch) => {
        if (!!playlistId) {
            dispatch(setSelectedPlaylist({ _id: playlistId }));
            return axios.get(process.env.GET_PLAYLIST_DATA, {
                params: {
                    id: playlistId,
                    username: localStorage.getItem("username")
                }
            }).then(async resp => {
                let formattedResponse = resp?.data?.playlist?.map(({ author: authorName, ...rest }) => {
                    return { authorName, ...rest }
                })
                await Promise.all([formattedResponse]);
                resp.data.playlist = formattedResponse;
                dispatch(setSelectedPlaylist(resp?.data));
                return resp?.data;
            })
        } else {
            dispatch(setSelectedPlaylist(null));
        }
    }
}

export const updatePlaylist = (params) => {
    return axios.put(process.env.UPDATE_PLAYLIST, params);
}