// Plalist Level Reducer 

import { GET_PLAYLISTS, SET_SELECTED_PLAYLIST } from "./action-types";


// Initial Application state 
const initialState = {
    selectedPlaylist: null,
    playlists: [],
}
// Reducer to change state based on the action 
const playlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SELECTED_PLAYLIST:
            return Object.assign({}, state, { selectedPlaylist: action.payload });
        case GET_PLAYLISTS:
            return Object.assign({}, state, { playlists: action.payload });
        default:
            return state;
    }
}
export default playlistReducer; 
