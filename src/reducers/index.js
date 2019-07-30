import { combineReducers } from "redux";
import { LAUNCHES_RECEIVED, LAUNCH_SELECTED } from "screens/Launches/redux-config";

const initialState = {
    launchList: [],
    selectedLaunch: {}
}

const App = (state = initialState, action) => {
    switch (action.type) {
        case LAUNCHES_RECEIVED: {
            return { ...state, launchList: action.launches }
        }
        case LAUNCH_SELECTED: {
            return { ...state, selectedLaunch: action.launch }
        }
        default:
            return { ...state }
    }
}

export default combineReducers({
    App
});