export default {
    setname(state, action ){
        return {
            ...state,
            name:action.name
        }
    },
    setage(state, action ){
        return {
            ...state,
            age: action.age
        }
    },
    setyzm(state, action){
        return {
            ...state,
            yzm: action.yzm
        }
    }
}