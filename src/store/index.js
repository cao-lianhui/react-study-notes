import { createStore, combineReducers } from '../redux-mini';

// 初始化 state
const initState = {
    count: 0
}

// 声明一个计数器 reducer
const countReducer = (state = 0, { type, payload }) => {
    console.log(payload)
    switch(type){
        case 'ADD': return state + payload;
        case 'MINUS': return state - payload;
        default: return state;
    }
}

const multiState = {
    msg: '状态',
    count: 0,
    bool: 'bool'
}
const multiReducer = (state = multiState, { type, payload }) => {
    switch(type){
        case 'MSG':
            return Object.assign(state, {
                ...state,
                msg: payload
            })
        case 'COUNT':
            return Object.assign(state, {
                ...state,
                count: payload + 1
            })
        case 'BOOL':
            return Object.assign(state, {
                ...state,
                bool: payload
            })
        default:
            return state;
    }
}

const msgReducer = (state = multiState.msg, { type, payload }) => {
    switch(type){
        case 'MSG':
            return state + payload;
        default: 
        return state;
    }
}
const couReducer = (state = multiState.count, { type, payload }) => {
    switch(type){
        case 'COUNT':
            return state + payload;
        default: 
        return state;
    }
}
const boolReducer = (state = multiState.bool, { type, payload }) => {
    switch(type){
        case 'BOOL':
            return state + payload;
        default:
            return state;
    }
}

// 传入 reducer 函数，生成 store
// const store = createStore(countReducer);
const rootReducer = combineReducers({
    msg: msgReducer,
    cou: couReducer,
    bool: boolReducer,
})
const store = createStore(rootReducer);
export default store;