import { combineReducers } from "redux";
import {

} from 'actions/actions'


const initialState = {

}

const App = (state = initialState, action) => {
    switch (action.type) {
        default:
            return { ...state }
    }
}

export default combineReducers({
    App
});