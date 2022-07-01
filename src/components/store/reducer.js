// Application Level Reducer 
// import { TEST_ACTION } from "./action-types"; 
// Initial Application state 
const initialState = { 
} 
// Reducer to change state based on the action 
const appReducer = (state = initialState, action) => { 
    switch (action.type) { 
        case "": 
            break; 
        // case TEST_ACTION: 
        //     break; 
        default: 
            return state; 
    } 
} 
export default appReducer; 
