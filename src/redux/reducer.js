import {combineReducers} from 'redux'

function addName(state = 'null', action) {
    switch (action.type) {
        case "TEST1":
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

export const finalReducer = combineReducers({
    addName, addAge, addInfo
});
