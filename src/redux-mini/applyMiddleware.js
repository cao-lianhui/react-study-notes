/**
 * 
 * @param  {...any} middlewares 传入的中间件集合，比如：applyMiddleware(logger, thunk)
 */
export default function applyMiddleware(...middlewares){
    return function (createStore){
        return function (reducer){
            // 获取 store 最后需要返回
            const store = createStore(reducer);
            // 获取 dispatch 函数
            let dispatch = store.dispatch;
            // 遍历中间件函数，增强 dispatch
            middlewares.forEach(middleware => {
                // middleware 为 logger 或 thunk 这些 redux 中间件
                // 中间件最终会返回新的 dispatch 函数，改变原始的 dispatch，
                // 改变的 dispatch 在作为参数传入，这样一层层叠加，形成链式调用的效果
                dispatch = middleware(store)(dispatch)
            })
            // 返回 store, 增强后的 dispatch
            return {
                ...store,
                dispatch
            }
        }
    }
}