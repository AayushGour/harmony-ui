// Application Level Store 
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import playlistReducer from "../playlist/store/reducer";
import appReducer from "./reducer";
// Combine all reducers 
const rootReducer = combineReducers({
    app: appReducer,
    playlist: playlistReducer
})
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store; 
