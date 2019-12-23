import {createStore, applyMiddleware} from 'redux'
import {finalReducer} from './reducer'
import thunk from 'redux-thunk';

// 生成store对象
// 内部会第一次调用reducer函数，得到初始state
// dispatch一个action之后，到达reducer之前，进行一些额外的操作，就需要用到middleware
// 你可以利用 Redux middleware 来进行日志记录、创建崩溃报告、调用异步接口或者路由等等
const store = createStore(
    finalReducer,
    applyMiddleware(thunk)
);

// store注册监听器，subscribe接收一个方法为参数，
// 目的是注册这个方法为dispatch调用后的callback方法
// 这里的逻辑是打印出变化的state
store.subscribe(() => {
    console.log("state变化了：");
    console.log(store.getState());
});

export default store;