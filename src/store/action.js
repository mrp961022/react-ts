export default {
    setKeyPath(state, action) {
        return {
            ...state,
            keyPath: action.keyPath
        }
    },
    setIsMini(state, action) {
        return {
            ...state,
            isMini: action.isMini
        }
    },
    setBackColor(state, action) {
        return {
            ...state,
            backColor: action.backColor
        }
    }
}