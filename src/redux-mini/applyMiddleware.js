/**
 * 
 * @param  {...any} middlewares 传入的中间件集合
 * 比如：applyMiddleware(thunk, logger)
 */
export default function applyMiddleware(...middlewares){
    // 传入 createStore 获取 store 和一些子集 API
    return function (createStore){
        // 传入 reducer，最后返回 store 和增强的 dispatch
        return function (reducer){
            // 获取 store 最后需要返回
            const store = createStore(reducer);
            // 获取 dispatch 函数
            let dispatch = store.dispatch;
            // 暴露一些 store API 给中间件，reudx 源码内也是这样写的
            const midAPI = {
                getState: store.getState,
                dispatch: (action, ...args) => dispatch(action, ...args)
            }
            // 遍历中间件函数，增强 dispatch
            // 这里我用了 redux  中文文档描述的形式，直接 forEach 遍历
            // redux 源码采用的是组合 compose 形式，用 reduce 遍历形成链式调用
            middlewares.forEach(middleware => {
                // middleware 表示 logger 或 thunk 这些 redux 中间件
                // 中间件最终会返回新的 dispatch 函数，改变原始的 dispatch，
                // 改变的 dispatch 在作为参数传入，这样一层层叠加，形成链式调用的效果
                dispatch = middleware(midAPI)(dispatch)
                // 每个中间件的形式大概是下面这样的，最后返回新的 dispatch
                // dispatch = ({ getState, dispatch }) => ( dispatch ) => action => {}
                // 比如中间件 middlewares 的集合为[M1, M2, M3]
                // 最后的返回结果从左向右包裹为 M3(M2(M1(dispatch)))
                // 源码里compose 形式为从右向左包裹返回 M1(M2(M3(dispatch)))
            })
            // 返回 store, 增强后的 dispatch
            return {
                ...store,
                dispatch
            }
        }
        
    }
}
