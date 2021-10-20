import { createStore, combineReducers, applyMiddleware } from '../redux-mini';
// import { createStore, combineReducers, applyMiddleware } from 'redux';
// 引入 thunk 中间件使 dispatch 支持函数和异步形式
// import thunk from 'redux-thunk';
// // 打印变更日志
// import logger from 'redux-logger';
// // 支持 promise
// import promise from 'redux-promise';
import isPromise from 'is-promise';

function thunk({ getState, dispatch }){
    return function(next){
        return function(action){
            if(typeof action === 'function'){
                // 判断如何 action 类型为函数，则向该函数传入 dispatch 和 getState
                return action(dispatch, getState)
            }
            return next(action)
        }
    }
}

function logger({ getState }){
    return function(next){
        return function(action){
            console.log('**********************************');
            console.log(action.type + '执行了！');
            // 获取上一个 state
            const prevState = getState();
            console.log('prev state', prevState);
            // 获取下一个 state
            // returnedValue 变量声明和源码来相同
            const returnedValue = next(action);
            const nextState = getState();
            console.log('next state', nextState);
            console.log('**********************************');
            return returnedValue
        }
    }
}

function promise({ dispatch }){
    return function (next){
        return function (action){
            if(isPromise(action)){
                // 判断 action 是否为 promise，是则通过 .then 获取返回的 action，传入dispatch
                // 源码里还判断了 action.payload 是否为 promise，代码也很简洁，可以去源码看看
                return action.then(dispatch)
            }
            return next(action);
        }
    }
}


// 初始化 state
const initState = 0
// 声明一个计数器 reducer
const countReducer = (state = initState, { type, payload }) => {
    console.log(payload)
    switch(type){
        case 'ADD': return state + payload;
        case 'MINUS': return state - payload;
        default: return state;
    }
}

// 声明一个对象包含多个状态属性
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
        case 'ADD': return state + payload;
        case 'MINUS': return state - payload;
        default: return state;
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
const store = createStore(rootReducer, applyMiddleware(logger, thunk, promise));
export default store;