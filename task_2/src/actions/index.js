export const lap = (payload) => {
    return {
        type: "ADD_LAP", payload: payload
    }
}

export const resetLaps = (payload) => {
    return {
        type: "RESET_LAPS", payload: payload
    }
}