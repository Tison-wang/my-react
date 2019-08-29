import './home.scss';
import React, {Component} from 'react';
import {api as axios} from '../../utils/axios';
import index from '../../config';
import {connect} from "react-redux";
import {addName_action} from "../../redux/action";
import history from '../../redux/history';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {username: '暂无数据', myText: '', logout: ''};
    }

    componentDidMount() {
        console.log(index.mode + ": " + index.serve);
    }

    logout = (e) => {
        console.log("logout: " + JSON.stringify(history));
        axios.post("/account/logout", {password: this.state.username}).then((res) => {
            this.setState({logout: res.data.msg});
            if (res.data.msg === 401) {
                sessionStorage.removeItem("auth");
                this.props.addName_home("null");
                console.log(this.props);
                history.push('/home');
            }
        }).catch((e) => {
            console.log(e);
        });
    }

    setup = (e) => {
        axios.post("/users/", {password: "test"}).then((res) => {
            this.setState({username: res.data.user});
        }).catch((e) => {
            console.log(e);
        });
    }

    render() {
        console.log("home-render:");
        console.log(this.props);
        console.log("this.state=" + JSON.stringify(this.state));
        let username = this.state.username;
        return (
            <div id="header">
                <div id="content">
                    <div id="home-title">home</div>
                    <div id="home-blank"></div>
                    <div id="home-content">{this.props.name}</div>
                    <div id="home-content" onClick={this.setup}><span>设置</span></div>
                    <div id="home-content" onClick={this.logout}><span>退出</span></div>
                </div>
                <span>{username}</span>
            </div>
        )
    }

}

// 容器组件
const mapStateToProps = (state) => ({
    name: state.addName
});

const mapActionToProps = (dispatch) => ({
    addName_home: (name) => dispatch(addName_action(name))
});

// 只能使用connect
// 才能在其他组件页面得到全局的state中的内容
export default connect(
    mapStateToProps,
    mapActionToProps
)(Home);