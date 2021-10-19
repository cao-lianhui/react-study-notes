/**
 * 先清楚 store 中的几个概念
 * 1. action：用户创建的行为，指发生什么行为
 * 2. dispatch: 用户通过 dispatch 派发 action
 * 3. reducer：接收用户派发过来的 action，返回新的 state
 * 4. store：为状态容器，通过 createStore 生成，包含三个方法
 *  4.1. getState: 返回当前状态
 *  4.2. dispatch: 派发状态
 *  4.3. subscribe: 监听订阅事件
 */

export default function createStore(reducer){
    let currentState;
    // 该数组用于存储所有订阅事件
    let currentListeners = [];
    // 返回当前的状态
    function getState(){
        return currentState;
    }
    function dispatch(action){
        // 接收 state 和 action，返回最新的 state
        currentState = reducer(currentState, action);
        console.log(currentState, action.type);
        // 返回新的 state 后需要触发订阅事件，使视图更新
        currentListeners.forEach(lis => lis());
    }
    function subscribe(listener){
        // 监听订阅事件
        currentListeners.push(listener);
        // console.log(currentListeners.indexOf(listener), 'index')
        // 返回一个函数取消订阅
        return () => {
            currentListeners = currentListeners.filter(lis => lis !== listener);
            // 源码里通过获取索引的方式用数组的 splice 方式删除订阅事件
            // const index = nextListeners.indexOf(listener)
            // nextListeners.splice(index, 1)
        }
    }
    // 初始化状态
    dispatch({})
    
    // 返回对应的 store 方法
    return {
        getState,
        dispatch,
        subscribe
    }
}