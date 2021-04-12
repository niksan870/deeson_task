const lapsReducer = (state = [], { type, payload }) => {
    switch (type) {
        case "ADD_LAP":
            return [...state, payload];
        case "RESET_LAPS":
            return state = [];
        default:
            return state;
    }
}

export default lapsReducer;