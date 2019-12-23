import React, {Component} from 'react';
import {api as axios} from '../../utils/axios';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import history from '../../redux/history';
import {addName_action, addAge_action, addInfo_action} from '../../redux/action';
import './login.scss';

class Login extends Component {

    //声明属性（组件调用时在标签中传递用的属性）
    static propTypes = {
        name: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
        info: PropTypes.object
    }

    constructor(props) {
        super(props);
        // 类似 vue 中的 data
        this.state = {
            username: '1',
            myText: '',
            logout: ''
        };
    }

    componentDidMount() {

    }

    login = (e) => {
        axios.get("/account/login", {
            params: {password: this.state.myText}
        }).then((res) => {
            //let {history} = this.props;
            if (res.data.msg === "OK") {
                sessionStorage.setItem("auth", "true");
                this.props.methodName(this.state.myText);
                this.props.methodAge(30);
                history.push('/home');
            }
        }).catch((e) => {
            console.log(e);
        });
    }

    render() {
        return (
            <div id="login"><span>登录</span><br/>
                <input value={this.state.myText} onChange={e => this.setState({myText: e.target.value})}
                       placeholder='username' autoFocus={true} required/>
                <br/>
                <button onClick={this.login}>登录</button>
            </div>
        )
    }

}

// 容器组件
const mapStateToProps = (state) => ({
    // 参数state内容是reducer中的函数返回后组成的对象作为当前state树
    name: state.addName,
    age: state.addAge,
    info: state.addInfo
});

const mapActionToProps = (dispatch) => {
    return {
        methodName: (name) => dispatch(addName_action(name)),
        methodAge: (age) => dispatch(addAge_action(age)),
        methodInfo: (name, age) => dispatch(addInfo_action(name, age))
    }
};

// connect功能
// 1、接受一个组件，把数据放到组件内部，返回一个组件
// 2、数据发生变化的时候，通知到组件
export default connect(
    mapStateToProps,
    mapActionToProps
    //{addName_action, addAge_action, addInfo_action}
)(Login);