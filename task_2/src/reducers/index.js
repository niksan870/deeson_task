import lapsReducer from "./counter"
import { combineReducers } from "redux"

const allReducers = combineReducers({
    laps: lapsReducer
})

export default allReducers