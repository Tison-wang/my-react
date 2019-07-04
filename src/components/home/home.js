import React, {Component} from 'react';
import axios from 'axios';
import index from '../../config/index';
import './home.scss';

class home extends Component {

    constructor(props) {
        super(props);
        this.state = {username: '', myText: ''};
    }

    componentDidMount() {
        console.log(index.mode + ": " + index.serve);
    }

    handleClick = (e) => {
        axios.get("http://127.0.0.1:5000/account/test", {params: {password: this.state.myText}}).then((res) => {
            console.log(res);
            this.setState({myText: res.data.user});
        }).catch((e) => {
            console.log(e);
        });
    }

    handleClick1 = (e) => {
        axios.post("http://127.0.0.1:5000/users", {password: this.state.username}).then((res) => {
            console.log(res);
            this.setState({username: res.data.user});
        }).catch((e) => {
            console.log(e);
        });
    }

    render() {
        return (
            <div>首页3000<br/>
                <input value={this.state.myText} onChange={e => this.setState({myText: e.target.value})}
                       placeholder='get' autoFocus='true' required/>&nbsp;&nbsp;
                <button onClick={this.handleClick}>get 请求</button>
                <br/>
                <input value={this.state.username} onChange={e => this.setState({username: e.target.value})}
                       placeholder='post' autoFocus='true' required/>&nbsp;&nbsp;
                <button onClick={this.handleClick1}>post请求</button>
                <div>{this.state.myText}</div>
                <div>{this.state.username}</div>
            </div>
        )
    }

}

export default home;