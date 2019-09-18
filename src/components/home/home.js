import './home.scss';
import React, {Component} from 'react';
import {api as axios} from '../../utils/axios';
import index from '../../config';
import {connect} from "react-redux";
import {addName_action, changeTitle_action} from "../../redux/action";
import history from '../../redux/history';
import PropTypes from 'prop-types';

class Home extends Component {

    constructor(props) {
        super(props);
        this.homeRef = React.createRef();
        this.userRef = (element) => {
            this.homeRef1 = element;
        }
        this.state = {username: '暂无数据', myText: '', logout: ''};
    }

    componentWillMount() {
        document.title = "React-" + this.props.portal_title;
        console.log("home-componentWillMount-即将渲染...");
    }

    componentWillUnmount() {
        console.log("home-componentWillUnmount-被移除前...");
    }

    componentDidMount() {
        console.log("home-componentDidMount-渲染后..." + index.mode + ": " + index.serve);
    }

    componentWillReceiveProps() {
        console.log("home-componentWillReceiveProps-接收新的props时...");
    }

    shouldComponentUpdate() {
        console.log("home-shouldComponentUpdate-组件接收到新的props或者state时被调用");
        return true;
    }

    componentWillUpdate() {
        console.log("home-componentWillUpdate-即将更新组件...");
    }

    componentDidUpdate() {
        console.log("home-componentDidUpdate-更新组件后...");
    }

    logout = (e) => {
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

        this.homeRef.current.innerHTML = "首页";
        this.props.changeTitle("门户");
    }

    render() {
        return (
            <div id="header">
                <div id="content">
                    <div id="home-title" ref={this.homeRef}>{this.props.title}</div>
                    <div id="home-blank"></div>
                    <div id="home-content">{this.props.name}</div>
                    <div id="home-content"><span onClick={this.setup}>设置</span></div>
                    <div id="home-content"><span onClick={this.logout}>退出</span></div>
                    <div id="home-content" ref={this.userRef}>
                            <span onClick={e => {
                                history.push('/home/page1');
                            }}>关于</span>
                    </div>
                    <div id="home-content" ref={el => this.homeRef2 = el}>
                            <span onClick={e => {
                                history.push('/home/page2');
                            }}>联系</span>
                    </div>
                </div>
                <span>{this.state.username}</span>
            </div>
        )
    }

}

Home.propTypes = {
    portal_title: PropTypes.string
}

// 容器组件
const mapStateToProps = (state) => ({
    name: state.addName,
    title: state.changeTitle
});

const mapActionToProps = (dispatch) => ({
    addName_home: (name) => dispatch(addName_action(name)),
    changeTitle: (name) => dispatch(changeTitle_action(name))
});

// 只能使用connect
// 才能在其他组件页面得到全局的state中的内容
export default connect(
    mapStateToProps,
    mapActionToProps
)(Home);