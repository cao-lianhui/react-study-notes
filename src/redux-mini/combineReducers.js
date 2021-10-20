
function combineReducers(reducers){
    return function combination(state = {}, action){
        // console.log('state', state)
        const reducerKeys = Object.keys(reducers);
        // 判断状态是否改变
        let hasChanged = false;
        const nextState = {};
        for(let i = 0; i < reducerKeys.length; i++){
            // 获取当前状态属性
            const key = reducerKeys[i];
            // 获取当前状态属性对应的 reducer
            const reducer = reducers[key];
            // console.log('key', key)
            // 获取当前状态属性对应的上一个 state
            const previousStateKey = state[key];
            // 获取当前状态属性对应的最新状态
            const nextStateKey = reducer(previousStateKey, action);
            // 把最新的状态赋值给当前 state
            nextState[key] = nextStateKey;
            hasChanged = hasChanged || nextStateKey !== previousStateKey
        }
        hasChanged = hasChanged || reducerKeys.length !== Object.keys(state).length;
        // 状态没改变则返回老 state， 否则返回新的
        return hasChanged ? nextState : state;
    }
}
// const combineReducers = reducers => {
//     return (state = {}, action) => {
//         return Object.keys(reducers)
//         .reduce((newState, key) => {
//             newState[key] = reducers[key](state[key], action);
//             // console.log('newState', state)
//             return newState;
//         }, {})
//     }
// }

export default combineReducers