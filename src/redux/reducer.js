import {combineReducers} from 'redux';
import utils from '../utils/crypto';

const nameState = sessionStorage.getItem("auth") ? utils.decrypt(sessionStorage.getItem("name")) : "";

function addName(state = nameState, action) {
    switch (action.type) {
        case "TEST1":
            sessionStorage.setItem("name", utils.encrypt(action.data));
            return action.data;
        default:
            return state;
    }
}

function addAge(state = 0, action) {
    switch (action.type) {
        case "TEST2":
            return action.data;
        default:
            return state;
    }
}

function addInfo(state = {name: "张三", age: 28}, action) {
    switch (action.type) {
        case "TEST3":
            return action.data;
        default:
            return state;
    }

}

function changeTitle(state = "主页", action) {
    switch (action.type) {
        case "TEST4":
            return action.data;
        default:
            return state;
    }
}

export const finalReducer = combineReducers({
    addName, addAge, addInfo, changeTitle
});
