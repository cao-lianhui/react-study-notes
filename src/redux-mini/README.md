# ððð redux åé¨åä¸­é´ä»¶çå®ç° ð
## ð¨ redux å®ç° [ä»åºé¾æ¥](https://github.com/cao-lianhui/react-study-notes/tree/main/src/redux-mini)

#### 1. redux ç®ä»
- æ¯ react ç»ä»¶éä¿¡æ¹å¼ä¹ä¸ï¼ä½¿ç»ä»¶å¨ç¶æåæ´æ¶åå¾å¯é¢æµï¼å¯æ§å¶
- æ´ä¸ªåºç¨ç¶æå­å¨å¯ä¸ç store ä¸­
- åæ´ç¶æåªè½éè¿ç»ä»¶æ´¾å(dispatch)è¡ä¸º(action)ç» storeï¼ç±çº¯å½æ° reducer æ¥æ¶å¹¶è¿åæ°çç¶æ
- ç»ä»¶éè¿åå¸è®¢éçæ¹å¼æ¥å·æ°èªå·±çè§å¾

#### 2. redux éä¿¡æ¹å¼æµç¨å¾ððð

![redux](./redux.png)

#### 3. redux ç®çå®ç°
    
3.1 redux ä¼éè¿ createStore çæ store

    ```
    /**
    * åæ¸æ¥ redux ä¸­çå ä¸ªæ¦å¿µ
    * 1. actionï¼ä¸ºä¸ä¸ªå¯¹è±¡ï¼ç¨æ·åå»ºçè¡ä¸ºï¼æåçä»ä¹å¨ä½ï¼å¯ä»¥ç±»æ¯ä¸ä¸ªæä»¤
    * 2. dispatch: ä¸ºä¸ä¸ªæ¹æ³ï¼æ¥æ¶ç¨æ·åå»ºç actionï¼æ´¾åç» store
    * 3. reducerï¼ä¸ºä¸ä¸ªçº¯å½æ°ï¼æ¥æ¶ç¨æ·æ´¾åè¿æ¥ç action åä¸ä¸æ¬¡æ´æ°ç state ï¼è¿åææ°ç state
    * 4. storeï¼ä¸ºç¶æå®¹å¨ï¼éè¿ createStore çæï¼åå«ä¸ä¸ªæ¹æ³
    *  4.1. getState: è¿åå½åç¶æ
    *  4.2. dispatch: æ´¾åç¶æï¼åæ¶è§¦åè®¢éäºä»¶
    *  4.3. subscribe: çå¬è®¢éäºä»¶
    */
    // createStore å®ç°
    function createStore(reducer){
        // å­å¨å½åç¶æ
        let currentState;
        // è¯¥æ°ç»ç¨äºå­å¨ææè®¢éäºä»¶
        let currentListeners = [];
        // è¿åå½åçç¶æ
        function getState(){
            return currentState;
        }
        function dispatch(action){
            // æ¥æ¶ state å actionï¼è¿åææ°ç state
            currentState = reducer(currentState, action);
            // è¿åæ°ç state åéè¦è§¦åè®¢éäºä»¶ï¼ä½¿è§å¾æ´æ°
            currentListeners.forEach(lis => lis());
        }
        function subscribe(listener){
            // çå¬è®¢éäºä»¶
            currentListeners.push(listener);
            // è¿åä¸ä¸ªå½æ°åæ¶è®¢é
            return () => {
                currentListeners = currentListeners.filter(lis => lis !== listener);
                // æºç ééè¿è·åç´¢å¼çæ¹å¼ç¶å splice å é¤è®¢éäºä»¶
                // const index = currentListeners.indexOf(listener)
                // currentListeners.splice(index, 1)
            }
        }
        // åå§åç¶æ
        dispatch({})
        
        // è¿åå¯¹åºç store æ¹æ³
        return {
            getState,
            dispatch,
            subscribe
        }
    }
    ```

3.2 æµè¯å®ç°ç reduxï¼ä»ç¶æ¯ç¨è®¡æ°å¨ä½ä¸ºä¾å­(è¯¥ä¾å­å¦æé·åçº¯å±å¿ç¶ð)

3.2.1 åå»º store/index.js

    ```
    import { createStore } from '../redux-mini';
    // åå§å state
    const initState = 0
    // å£°æä¸ä¸ªè®¡æ°å¨ reducer
    const countReducer = (state = initState, { type, payload }) => {
        switch(type){
            case 'ADD': return state + payload
            case 'MINUS': return state - payload
            default: return state;
        }
    }
    // ä¼ å¥ reducer å½æ°ï¼çæ store
    const store = createStore(countReducer);
    export default store;

    ```

3.2.2 åå»º ReduxPage.js ç»ä»¶ï¼å¹¶å¨ index.js ä¸­å¼å¥è¯¥ç»ä»¶

    ```
    // ReduxPage.js
    import { Component } from 'react';
    // å¼å¥ store
    import store from '../store';

    export default class ReduxPage extends Component{
        componentDidMount(){
            // æ³¨åçå¬äºä»¶
            this.cancel = store.subscribe(() => {
                // ç¶æåæ´æ¶æ´æ°è§å¾
                this.forceUpdate()
            })
        }

        componentWillUnmount(){
            // ç»ä»¶å¸è½½æ¶åæ¶è®¢é
            this.cancel && this.cancel();
        }

        handleAdd = () => {
            // è§¦å dispatch
            store.dispatch({ type: 'ADD', payload: 1 })
        }
        handleMinus = () => {
            // è§¦å dispatch
            store.dispatch({ type: 'MINUS', payload: 1 })
        }

        render(){
            return (
                <div>
                    <h2>reduxPage</h2>
                    <div>count:{ store.getState().count }</div>
                    <button onClick={this.handleAdd}>+</button>
                    <button onClick={this.handleMinus}>-</button>
                </div>
            )
        }
    }
    // index.js
    import React from 'react';
    import ReactDOM from 'react-dom';
    import './index.css';
    import ReduxPage from './pages/ReduxPage';
    ReactDOM.render(
    <React.StrictMode>
        <ReduxPage />
    </React.StrictMode>,
    document.getElementById('root')
    );
    ```

å¦å¾æµè§å¨ä¸­æ¾ç¤ºçç»æï¼è¿ç»­æ´¾åå¤æ¬¡ action åï¼è§å¾å¯¹åºåæ´ï¼
    
ç¶ææå°å¨æµè§å¨æ§å¶å°ï¼ç¬¬ä¸æ¬¡æå° undefinedï¼ä¸º dispatch 

å¨ createStore éåå§åçæ¶å

![redux2](./redux2.png)

#### 4. redux ä¸­ combinReducers å®ç°

éå¸¸å¨ä¸ä¸ªé¡¹ç®ä¸­è¯å®ä¸æ­¢ä¸ä¸ªç¶æéè¦åæ´ï¼èæ¯å¤ä¸ªç¶æï¼æ¯ä¸ªç¶æå¯¹åºçä¿¡æ¯åä¼æä¸åï¼

æ¾å¨ä¸ä¸ª reducer éï¼ä¼éå¸¸åºå¤§ï¼å¯è¯»æ§ä¹ä¼åå·®ï¼è¿æ¶å°±éè¦åå»ºå¤ä¸ª reducerï¼å¯¹åºä¸åçç¶æã

å¦ä¸æç¤º

    ```
    const multiState = {
        msg: 'ç¶æ',
        count: 0,
        bool: true
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
    ```

ç¶æä¸­æä¸ä¸ªå±æ§éè¦åæ´ï¼æ¯ä¸ªå±æ§ä¹é´æ²¡æèç³»ï¼åæ´çæ¹å¼å¯è½ä¼ä¸åï¼æä»¥éè¦åå»º

å¤ä¸ª reducerï¼æ¯ä¸ª reducer è¿åå¯¹åºçå±æ§ç¶æãä½å¨ redux ä¸­createStore ä¸­åªä¼ å¥å

ä¸ª reducerï¼æä»¥æä»¬éè¦æåå»ºçå¤ä¸ª reducer åå¹¶æåä¸ªï¼ç§°ä¸º combineReducersã

    ```
    // combineReducers æ¥æ¶ä¸ä¸ª reducer ç»æçå¯¹è±¡éå
    // ä¼ å¥ç reducers å¯¹è±¡ä¸­çå±æ§å¿é¡»ä¸ state å±æ§åç¸åï¼å¦åæ æ³è·åå°å¯¹åºç reducer ä¿®æ¹ç¶æ
    function combineReducers(reducers){
        return function combination(state = {}, action){
            const reducerKeys = Object.keys(reducers);
            // å¤æ­ç¶ææ¯å¦æ¹å
            let hasChanged = false;
            const nextState = {};
            for(let i = 0; i < reducerKeys.length; i++){
                // è·åå½åç¶æå±æ§
                const key = reducerKeys[i];
                // è·åå½åç¶æå±æ§å¯¹åºç reducer
                const reducer = reducers[key];
                // è·åå½åç¶æå±æ§å¯¹åºçä¸ä¸ä¸ª state
                const previousStateKey = state[key];
                // è·åå½åç¶æå±æ§å¯¹åºçææ°ç¶æ
                const nextStateKey = reducer(previousStateKey, action);
                // æææ°çç¶æèµå¼ç»å½å state
                nextState[key] = nextStateKey;
                hasChanged = hasChanged || nextStateKey !== previousStateKey
            }
            hasChanged = hasChanged || reducerKeys.length !== Object.keys(state).length;
            // ç¶ææ²¡æ¹ååè¿åè stateï¼ å¦åè¿åæ°ç
            return hasChanged ? nextState : state;
        }
    }

    ```

ä¸é¢ä»£ç é¤äº ts åä¸äºå¼å¸¸å¤çä¹å¤ï¼å®ç°æ¹å¼åºæ¬æ¯æ redux æºç æ¬è¿æ¥çï¼

é®ä¸å³°èå¸åå®¢æ¯éè¿ reduceï¼[é¾æ¥ð](https://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)

æ¥å®ç°çï¼ä»£ç å¦ä¸ï¼ððð

    ```
    
    const combineReducers = reducers => {
        return (state = {}, action) => {
            return Object.keys(reducers)
            .reduce((newState, key) => {
                newState[key] = reducers[key](state[key], action);
                // console.log('newState', state)
                return newState;
            }, {})
        }
    }
    ```

4.1  combineReducers æµè¯

ä¿®æ¹ store/index.js

    ```
    const multiState = {
        msg: 'ç¶æ',
        count: 0,
        bool: 'bool'
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
    // ä¼ å¥ reducer å½æ°ï¼çæ store
    const rootReducer = combineReducers({
        msg: msgReducer,
        count: couReducer,
        bool: boolReducer,
    })
    const store = createStore(rootReducer);
    export default store;
    ```
    ä¿®æ¹ ReduxPage.js å¢å äºä¸ä¸ªå½æ°åå¯¹åºçç¶ææ¾ç¤º
    ```
    handleMSG = () => {
        store.dispatch({ type: 'MSG', payload: 'ä¿¡æ¯' })
    }
    handleCOUNT = () => {
        store.dispatch({ type: 'ADD', payload: 1 })
    }
    handleBOOL = () => {
        store.dispatch({ type: 'BOOL', payload: 'bool' })
    }

    render(){
        return (
            <div>
                <h2>reduxPage</h2>
                <div>msg:{ store.getState().msg }</div>
                <div>cou:{ store.getState().cou }</div>
                <div>bool:{ store.getState().bool }</div>
                <button onClick={this.handleMSG}>msg</button>
                <button onClick={this.handleCOUNT}>count</button>
                <button onClick={this.handleBOOL}>bool</button>
            </div>
        )
    }
    ```
ç»æå¾ï¼

![redux3](./redux3.png)

#### 5. å®ç° applyMiddleware ä¸­é´ä»¶æºå¶

å°è¿éä¸ä¸ªåºæ¬ç redux å°±å®ç°äºï¼ä¸è¿è¿æ¯æä¸ä¸ªé®é¢ï¼ç®åå®ç°ç redux ä¸­ç dispatch å½æ°åªæ¯æå¯¹è±¡å½¢å¼ï¼

é½æ¯åæ­¥çï¼å¹¶ä¸æ¯æå¼æ­¥çæ¹å¼ï¼å¨å®éé¡¹ç®ä¸­è¯å®å°ä¸äºæ¥å£è¯·æ±ï¼è¿æåç¦»æ¥å¿è®°å½ãå´©æºæ¥åç­ç­ï¼è¿æ¶å°±éè¦éè¿ä¸ä¸ªä¸­é´ä»¶æºå¶æ¥å å¼º dispatch å½æ°ï¼

å¨ redux ééè¿ applyMiddleware æ¥å¼å¢å¼º dispatch å½æ°ï¼

ð[reduxä¸­æææ¡£éææè¿° applyMiddleware çç±æ¥](https://www.redux.org.cn/docs/advanced/Middleware.html)ï¼ææä¸é¢ä¸æ®µï¼

- applyMiddlewareåªæ´é²ä¸ä¸ª store API çå­éç» middlewareï¼dispatch(action) å getState()ã

- å®ç¨äºä¸ä¸ªéå¸¸å·§å¦çæ¹å¼ï¼ä»¥ç¡®ä¿å¦æä½ å¨ middleware ä¸­è°ç¨çæ¯ store.dispatch(action) èä¸æ¯ next(action)ï¼é£ä¹è¿ä¸ªæä½ä¼åæ¬¡éååå«å½å middleware å¨åçæ´ä¸ª middleware é¾ãè¿å¯¹å¼æ­¥ç middleware éå¸¸æç¨ï¼æ­£å¦æä»¬å¨ä¹åçç« èä¸­æå°çã

- ä¸ºäºä¿è¯ä½ åªè½åºç¨ middleware ä¸æ¬¡ï¼å®ä½ç¨å¨ createStore() ä¸èä¸æ¯ store æ¬èº«ãå æ­¤å®çç­¾åä¸æ¯ (store, middlewares) => storeï¼ èæ¯ (...middlewares) => (createStore) => createStoreã

ä¸é¢ä¸æ®µè¯æ»ç»ä¸æ¥ï¼è¯¥ä¸­é´ä»¶æºå¶çå®ç°éè¦æ createStore ä½ä¸ºåæ°ä¼ è¿å»ï¼å¨ applyMiddleware éè°ç¨ 

createStore è·å storeï¼ç¶åæ¶é store çä¸äºå­é APIï¼å¹¶å¯¹ dispatch å½æ°å å¼ºãå¯ï¼å°±æ¯è¿æ ·ð¤

æ¥ä¸æ¥è¿å¥ createStore.js ä¿®æ¹è¯¥å½æ°ãå¨åæ¥çåºç¡ä¸åäºä¸¤å¤ä¿®æ¹ï¼è¿éç´æ¥æªå¾ï¼

![redux4.png](./redux4.png)

ä¸é¢å½æ°ä¿®æ¹å¥½åï¼æ°å»º applyMiddleware æä»¶ï¼å®ç°è¯¥ä¸­é´ä»¶æºå¶ï¼å·ä½çä»£ç æ³¨éï¼)

    ```
    /**
    * 
    * @param  {...any} middlewares ä¼ å¥çä¸­é´ä»¶éå
    * æ¯å¦ï¼applyMiddleware(thunk, logger)
    */
    export default function applyMiddleware(...middlewares){
        // ä¼ å¥ createStore è·å store åä¸äºå­é API
        return function (createStore){
            // ä¼ å¥ reducerï¼æåè¿å store åå¢å¼ºç dispatch
            return function (reducer){
                // è·å store æåéè¦è¿å
                const store = createStore(reducer);
                // è·å dispatch å½æ°
                let dispatch = store.dispatch;
                // æ´é²ä¸äº store API ç»ä¸­é´ä»¶ï¼reudx æºç åä¹æ¯è¿æ ·åç
                const midAPI = {
                    getState: store.getState,
                    dispatch: (action, ...args) => dispatch(action, ...args)
                }
                // éåä¸­é´ä»¶å½æ°ï¼å¢å¼º dispatch
                // è¿éæç¨äº redux  ä¸­æææ¡£æè¿°çå½¢å¼ï¼ç´æ¥ forEach éå
                // redux æºç éç¨çæ¯ç»å compose å½¢å¼ï¼ç¨ reduce éåå½¢æé¾å¼è°ç¨
                middlewares.forEach(middleware => {
                    // middleware è¡¨ç¤º logger æ thunk è¿äº redux ä¸­é´ä»¶
                    // ä¸­é´ä»¶æç»ä¼è¿åæ°ç dispatch å½æ°ï¼æ¹ååå§ç dispatchï¼
                    // æ¹åç dispatch å¨ä½ä¸ºåæ°ä¼ å¥ï¼è¿æ ·ä¸å±å±å å ï¼å½¢æé¾å¼è°ç¨çææ
                    dispatch = middleware(midAPI)(dispatch)
                    // æ¯ä¸ªä¸­é´ä»¶çå½¢å¼å¤§æ¦æ¯ä¸é¢è¿æ ·çï¼æåè¿åæ°ç dispatch
                    // dispatch = ({ getState, dispatch }) => ( dispatch ) => action => {}
                    // æ¯å¦ä¸­é´ä»¶ middlewares çéåä¸º[M1, M2, M3]
                    // æåçè¿åç»æä»å·¦åå³åè£¹ä¸º M3(M2(M1(dispatch)))
                    // æºç écompose å½¢å¼ä¸ºä»å³åå·¦åè£¹è¿å M1(M2(M3(dispatch)))
                })
                // è¿å store, å¢å¼ºåç dispatch
                return {
                    ...store,
                    dispatch
                }
            }
        }
    }
    ```

ä¸é¢å®ç°äº applyMiddleware å½æ°ï¼æ¥ä¸æµè¯ä¸è½ä¸è½æ­£å¸¸ä½¿ç¨

åå®è£ä¸ä¸ª redux ä¸­é´ä»¶

    ```
    yarn add redux-thunk redux-logger redux-pormise -D
    ```

ä¿®æ¹ store/index.js æä»¶

å¼å¥ä¸ä¸ªä¸­é´ä»¶å applyMiddleware å½æ°

![redux5](./redux5.png)

åä¿®æ¹ createStore å½æ°

![redux6](./redux6.png)

æ¥ä¸æ¥è¿è¦å¯¹ ReduxPage.js è¿è¡æ¹å¨

![redux7](./redux7.png)

æåçç»æå¾
![redux8](./redux8.png)

å¯ä»¥çå°æµè§å¨ä¸­ redux å¯ä»¥æ¯æå½æ°å promise å½¢å¼è¿è¡ç¶æåæ´ï¼åæ¶æµè§å¨æ§å¶å°

æå°åºäºç¸åºçæ¥å¿è®°å½â

#### 6. å®ç° bindActionCreators 

ä¸é¢ redux API å®ç°çåºæ¬é½å®ç°äºï¼è¿å©ä¸æåä¸ä¸ª API: bindActionCreatorsãè¯¥å½æ°ä¸»è¦æ¯éå react-redux ä½¿ç¨

ä½ç¨æ¯æä¸ä¸ªä¸å¸¦ dispatch çå½æ°åçº§ä¸º dispatch(func(...args))ï¼æ³¨æ func è¿åå¼ä¸º action

    ```
    // bindActionCreators å®ç°ï¼ä¹æ¯åç§æºç æ¥çð
    export default function bindActionCreators(creators, dispatch){
        const bindCreators = {}
        for(const key in creators){
            if(typeof creators[key] === 'function'){
                // å¨è¿éæ¥æ¶å¸¦æ dispatch çå½æ°
                bindCreators[key] = bindActionCreator(creators[key], dispatch);
            }
        }
        return bindCreators;
    }

    // ä¸ºå½æ°æ·»å ä¸ dispatch
    function bindActionCreator(creators, dispatch){
        return (...args) => dispatch(creators(...args))
    }
    ```

å°è¿é redux çææ API å°±é½å®ç°äºï¼æ¥ä¸æ¥æä»¬å¯ä»¥æå¨å®ç°ä¸é¢å®è£è¿çä¸ä¸ªä¸­é´ä»¶ï¼é¡ºä¾¿æµè¯ä¸ç®çç redux

## ð¨ redux ä¸­é´ä»¶å®ç°

#### 1. ä¸­é´ä»¶ç®ä»

å³äº redux ä¸­é´ä»¶çè¡¨ç°å½¢å¼å¨[redux ä¸­æææ¡£éææè¿°](https://www.redux.org.cn/docs/advanced/Middleware.html)ï¼

å¨ä¸é¢å®ç° applyMiddleware æ¶ï¼å¯ä»¥ç¥éä¸­é´ä»¶çè¡¨ç°å½¢å¼å¤§æ¦æ¯è¿æ ·ç

 ({ getState, dispatch }) => (next) => (action) => { /*ä¸­é´ä»¶è¦å¤ççäºæ*/ }

 ä¸ºäºæ¹ä¾¿çè§£äºï¼ä¸é¢å®ç°æ²¡æéç¨ç®­å¤´å½æ°çæ¹å¼

#### 2. ä¸­é´ä»¶ redux-thunk å®ç° [åçæºç ](https://github.com/reduxjs/redux-thunk/blob/master/src/index.js)
    ```
    // redux-thunk ä¸­é´ä»¶è®© dispatch æ¯æå½æ°åå¼æ­¥å½¢å¼ï¼ä¸»è¦å¯¹ä¼ å¥ç action è¿è¡ç±»åå¤æ­ï¼å®çç®çå®ç°æ¹å¼ä¸º
    function thunk({ getState, dispatch }){
        return function(next){
            return function(action){
                if(typeof action === 'function'){
                    // å¤æ­å¦ä½ action ç±»åä¸ºå½æ°ï¼ååè¯¥å½æ°ä¼ å¥ dispatch å getState
                    return action(dispatch, getState)
                }
                return next(action)
            }
        }
    }
    ```
#### 3. ä¸­é´ä»¶ redux-promise å®ç° [åçæºç ](https://github.com/redux-utilities/redux-promise/blob/master/src/index.js)
    ```
    // è¯¥ä¸­é´ä»¶è®© dispatch æ¯æ promise å½¢å¼ï¼å redux-thunk ä¸æ ·ä¹æ¯å¤æ­ action ç±»å
    // åªä¸è¿ä¸ä¸ªæ¯å¤æ­å½æ°ï¼ä¸ä¸ªæ¯ promise
    // è¿éæå®è£äºä¸ä¸ªæä»¶ is-promise å¤æ­æ¯å¦ä¸º promise
    // yarn add is-promise -D
    // import isPromise from 'is-promise'
    function promise({ dispatch }){
        return function (next){
            return function (action){
                if(isPromise(action)){
                    // å¤æ­ action æ¯å¦ä¸º promiseï¼æ¯åéè¿ .then è·åè¿åç actionï¼ä¼ å¥dispatch
                    // æºç éè¿å¤æ­äº action.payload æ¯å¦ä¸º promiseï¼ä»£ç ä¹å¾ç®æ´ï¼å¯ä»¥å»æºç çç
                    return action.then(dispatch)
                }
                return next(action);
            }
        }
    }
    ```
#### 4. ä¸­é´ä»¶ redux-logger å®ç° [åçæºç ](https://github.com/LogRocket/redux-logger/blob/master/src/index.js)
    ```
    // è¯¥ä¸­é´ä»¶è´è´£æå°æ¥å¿è®°å½ï¼æä»¥ä¸»è¦è°ç¨çæ¯ getState å½æ°è·åç¶æå¼
    function logger({ getState }){
        return function(next){
            return function(action){
                console.log('**********************************');
                console.log(action.type + 'æ§è¡äºï¼');
                // è·åä¸ä¸ä¸ª state
                const prevState = getState();
                console.log('prev state', prevState);
                // è·åä¸ä¸ä¸ª state
                // returnedValue åéå£°æåæºç æ¥ç¸å
                const returnedValue = next(action);
                const nextState = getState();
                console.log('next state', nextState);
                console.log('**********************************');
                return returnedValue
            }
        }
    }
    ```
#### 5. ä¸­é´ä»¶æµè¯

æ¥ä¸æ¥ççå®ç°çä¸­é´ä»¶æ¯å¦è½æ­£å¸¸å·¥ä½ï¼

ä¿®æ¹ store/index.jsï¼æä¸ä¸ªä¸­é´ä»¶å½æ°é½åå¥è¯¥æä»¶ä¸­ï¼è®°å¾è¦å¼å¥ is-promise

![redux10](./redux10.png)
![redux11](./redux11.png)

å¶ä»å°æ¹ä¸éè¦ä¿®æ¹ï¼ç»æå¾å¦ä¸ï¼ððð

![redux9](./redux9.png)

å¯ä»¥çå°å¼å¥èªå·±å®ç°çä¸­é´ä»¶åï¼dispatch ä»ç¶æ¯æå½æ°å promise å½¢å¼ï¼æµè§å¨ä¹æå°äºæ¥å¿è®°å½ï¼

è½ç¶æ²¡é£ä¹ç¾è§ï¼ä¸è¿ä¹å¯ä»¥ç¨äºâ

## æ»ç»

å°è¿éä¸ä¸ªç®çç redux åæ¬ä¸äºä¸­é´ä»¶å°±åºæ¬å®ç°äºï¼åç°åªéåºéææé®é¢çæ¬¢è¿æ¨è¯è®ºåºçè¨

ææ issue ï¼) [ä»åºå°å](https://github.com/cao-lianhui/react-study-notes/tree/main/src/redux-mini)

## åèé¾æ¥

[1.é®ä¸å³°-Redux å¥é¨æç¨ï¼ä¸ï¼ï¼åºæ¬ç¨æ³](https://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)

[2.Redux è¿é¶æç¨](https://github.com/kenberkeley/redux-simple-tutorial/blob/master/redux-advanced-tutorial.md)

[3.redux ä¸­æææ¡£](https://www.redux.org.cn/)



















