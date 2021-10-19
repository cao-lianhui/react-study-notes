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
        store.dispatch({ type: 'MSG', payload: '信息' })
    }
    handleCOUNT = () => {
        store.dispatch({ type: 'COUNT', payload: 1 })
    }
    handleBOOL = () => {
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
                <button onClick={this.handleMSG}>msg</button>
                <button onClick={this.handleCOUNT}>count</button>
                <button onClick={this.handleBOOL}>bool</button>
            </div>
        )
    }
}