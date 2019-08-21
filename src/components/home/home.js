import React, {Component} from 'react';
import axios from 'axios';
import index from '../../config/index';
import './home.scss';

axios.defaults.withCredentials = true;
axios.interceptors.response.use(
    response => {
        if (response.data.msg === 401) {
            window.location.href = "http://www.baidu.com";
        }
        return response;
    },
    error => {
        console.log("请求错误，请重试");
        return Promise.reject(error);
    }
);

class home extends Component {

    constructor(props) {
        super(props);
        this.state = {username: '', myText: '', logout: ''};
    }

    componentDidMount() {
        console.log(index.mode + ": " + index.serve);
    }

    handleClick = (e) => {
        axios.get("http://127.0.0.1:5000/back/account/login", {
            params: {password: this.state.myText},
            headers: {
                'content-type': 'text/html;charset=utf8'
            }
        }).then((res) => {
            console.log(res);
            this.setState({myText: res.data.user});
        }).catch((e) => {
            console.log(e);
        });
    }

    handleClick1 = (e) => {
        axios.post("http://127.0.0.1:5000/back/users/", {password: this.state.username}).then((res) => {
            console.log(res);
            this.setState({username: res.data.user});
        }).catch((e) => {
            console.log(e);
        });
    }

    handleClick2 = (e) => {
        axios.post("http://127.0.0.1:5000/back/account/logout", {password: this.state.username}).then((res) => {
            console.log(res);
            this.setState({logout: res.data.msg});
        }).catch((e) => {
            console.log(e);
        });
    }

    render() {
        return (
            <div>首页 3000<br/>
                <input value={this.state.myText} onChange={e => this.setState({myText: e.target.value})}
                       placeholder='get' autoFocus='true' required/>&nbsp;&nbsp;
                <button onClick={this.handleClick}>登录</button>
                <br/>
                <input value={this.state.username} onChange={e => this.setState({username: e.target.value})}
                       placeholder='post' autoFocus='true' required/>&nbsp;&nbsp;
                <button onClick={this.handleClick1}>post请求</button>
                <button onClick={this.handleClick2}>退出</button>
                <div>{this.state.myText}</div>
                <div>{this.state.username}</div>
                <div>{this.state.logout}</div>
            </div>
        )
    }

}

export default home;