import { Component } from 'react';
// 引入 store
import store from '../store';

export default class ReduxPage extends Component{
    componentDidMount(){
        // 注册监听事件
        this.cancel = store.subscribe(() => {
            // console.log('进来了')
            // 状态变更时更新视图
            this.forceUpdate()
        })
    }

    componentWillUnmount(){
        // 组件卸载时取消订阅
        this.cancel && this.cancel();
    }

    handleAdd = () => {
        // 触发 dispatch
        store.dispatch({ type: 'ADD', payload: 1 })
    }
    handleMinus = () => {
        // 触发 dispatch
        store.dispatch({ type: 'MINUS', payload: 1 })
    }

    handleMSG = () => {
        // store.dispatch({ type: 'MSG', payload: '信息' })
        // dispatch 传入函数
        store.dispatch((dispatch, getState) => {
            setTimeout(() => {
                dispatch({ type: 'MSG', payload: '信息' })
            }, 1000)
        })
    }
    handleCOUNT = () => {
        // store.dispatch({ type: 'ADD', payload: 1 })
        store.dispatch(Promise.resolve({
            type: 'ADD',
            payload: 1
        }))
    }
    handleBOOL = () => {
        // dispatch 传入 promise
        store.dispatch({ type: 'BOOL', payload: 'bool' })
    }

    render(){
        return (
            <div>
                <h2>reduxPage</h2>
                {/* <div>count:{ store.getState().count }</div> */}
                <div>msg:{ store.getState().msg }</div>
                <div>cou:{ store.getState().cou }</div>
                <div>bool:{ store.getState().bool }</div>
                {/* <button onClick={this.handleAdd}>+</button>
                <button onClick={this.handleMinus}>-</button> */}
                <button onClick={this.handleMSG}>msg-异步函数形式</button>
                <button onClick={this.handleCOUNT}>count-add-promise形式</button>
                <button onClick={this.handleBOOL}>bool</button>
            </div>
        )
    }
}