// Application Level Reducer 

import { LOGIN_STATUS, TOGGLE_SIDEBAR } from "./action-types";

// Initial Application state 
const initialState = {
    isSidebarCollapsed: false,
    isLoggedIn: localStorage.getItem("isAuthorized")
}
// Reducer to change state based on the action 
const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_SIDEBAR:
            return Object.assign({}, state, { isSidebarCollapsed: action.payload });
        case LOGIN_STATUS:
            return Object.assign({}, state, { isLoggedIn: action.payload });
        default:
            return state;
    }
}
export default appReducer; 
