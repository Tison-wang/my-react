import React, {Component} from 'react';
import request from '../../utils/helper';
import axios from 'axios';
import './home.scss';

class home extends Component {

    constructor(props) {
        super(props);
        this.state = {username: '', lastGistUrl: '', myText: ''};
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        /*this.serverRequest = $.get(this.props.source, function (result) {
            var lastGist = result[0];
            this.setState({
                username: lastGist.owner.login,
                lastGistUrl: lastGist.html_url
            });
        }.bind(this));*/
    }

    handleClick(e) {
        /*request({
            url: '/users/name',
            method: 'get',
            data: {
                "Header": {"AccessToken": "eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFM1MTIifQ.eyJzdWIiOiIxMDYiLCJleHBpciI6MTUxMDczODAzNjA5MiwiaXNzIjoiIn0.eo000vRNb_zQOibg_ndhlWbi27hPt3KaDwVk7lQiS5NJ4GS4esaaXxfoCbRc7-hjlyQ8tY_NZ24BTVLwUEoXlA"},
                "Body": {}
            }
        }).then(function (res) {
            console.log(res);
            //this.setState({myText: res});
        });*/
        axios.get("http://127.0.0.1:4000/")
            .then(function (response) {
                console.log(response);
            });
    }

    render() {
        return (
            <div>首页3000
                <input value={this.state.myText} onChange={e => this.setState({myText: e.target.value})}
                       placeholder='请输入' autoFocus='true' required/>
                <button onClick={this.handleClick}>请求</button>
                <div>{this.state.myText}</div>
            </div>
        )
    }

}

export default home;