import './home.scss';
import React, {Component} from 'react';
import {api as axios} from '../../utils/axios';
import index from '../../config';
import {connect} from "react-redux";
import {addName_action, changeTitle_action} from "../../redux/action";
import history from '../../redux/history';

class Home extends Component {

    // 完成了React数据的初始化
    // 只要使用了constructor()就必须写super(),否则会导致this指向错误
    constructor(props, context) {
        super(props, context);
        this.homeRef = React.createRef();
        this.userRef = (element) => {
            this.homeRef1 = element;
        }
        this.state = {username: '暂无数据', myText: '', logout: ''};
    }

    // 组件已经经历了constructor()初始化数据后，但是还未渲染DOM时
    componentWillMount() {
        document.title = "React-" + this.props.portal_title;
        console.log("home-componentWillMount-即将渲染...");
    }

    // 组件第一次渲染完成，此时dom节点已经生成，可以在这里调用ajax请求
    // 返回数据setState后组件会重新渲染
    componentDidMount() {
        axios.post("/users/", {password: "login-test"}).then((res) => {
        });
        console.log("home-componentDidMount-渲染后..." + index.mode + ": " + index.serve);
    }

    // 在此处完成组件的卸载和数据的销毁
    // 1、clear你在组建中所有的setTimeout,setInterval
    // 2、移除所有组建中的监听 removeEventListener
    componentWillUnmount() {
        console.log("home-componentWillUnmount-被移除前...");
    }

    // 在接受父组件改变后的props需要重新渲染组件时用到的比较多
    // 接受一个参数nextProps
    // 通过对比nextProps和this.props，将nextProps的state为当前组件的state，从而重新渲染组件
    componentWillReceiveProps(nextProps) {
        console.log("home-componentWillReceiveProps-接收新的props时...");
    }

    // setState以后，state发生变化，组件会进入重新渲染的流程
    // 在这里return false可以阻止组件的更新（性能优化）
    shouldComponentUpdate(nextProps, nextState) {
        console.log("home-shouldComponentUpdate-组件接收到新的state时被调用");
        return true;
    }

    // shouldComponentUpdate返回true以后，组件进入重新渲染的流程
    // 此时进入componentWillUpdate
    componentWillUpdate(nextProps, nextState) {
        console.log("home-componentWillUpdate-即将更新组件...");
    }

    // 组件更新完毕后，react只会在第一次初始化成功会进入componentDidmount
    // 之后每次重新渲染后都会进入这个生命周期，这里可以拿到prevProps和prevState
    // 即更新前的props和state
    componentDidUpdate(prevProps, prevState) {
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
        // ref的使用
        // this.homeRef.current.innerHTML = "首页";
        this.props.changeTitle("设置");
        document.title = this.props.title;
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

/*Home.contextTypes = { // get store from context
    store: PropTypes.object
}

Home.propTypes = {
    portal_title: PropTypes.string
}*/

// 容器组件
const mapStateToProps = (state) => ({
    name: state.addName,
    age: state.addAge,
    title: state.changeTitle
});

// dispatch接收一个参数，这个参数是action = {动作类别, 动作参数}
// dispatch内部调用了Reducer并在Reducer执行完毕后执行subscribe注册的callback
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