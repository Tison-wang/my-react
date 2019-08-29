import React, {Component} from 'react';
import {Router, Route, Switch, Redirect} from 'react-router';
import Home from './components/home/home';
import Login from './components/login/login';
import {connect} from 'react-redux';
import history from "./redux/history";

function requireAuthentication(Component) {

    // 组件有已登陆的模块 直接返回 (防止从新渲染)
    if (Component.AuthenticatedComponent) {
        return Component.AuthenticatedComponent
    }

    // 创建验证组件
    class AuthenticatedComponent extends React.Component {
        static contextTypes = {
            router: React.PropTypes.object.isRequired,
        }

        state = {
            login: true,
        }

        componentWillMount() {
            this.checkAuth();
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth();
        }

        checkAuth() {
            // 判断登陆
            const token = this.props.token;
            const login = token ? token.login : null;
            // 未登陆重定向到登陆页面
            if (!login) {
                let redirect = this.props.location.pathname + this.props.location.search;
                this.context.router.push('/login?message=401&redirect_uri=' + encodeURIComponent(redirect));
                return;
            }
            this.setState({login});
        }

        render() {
            if (this.state.login) {
                return <Component {...this.props}/>
            }
            return ''
        }
    }

    // 不使用 react-redux 的话直接返回
    // Component.AuthenticatedComponent = AuthenticatedComponent
    // return Component.AuthenticatedComponent
    function mapStateToProps(state) {
        return {
            token: state.token,
        };
    }

    function mapDispatchToProps(dispatch) {
        return {};
    }

    Component.AuthenticatedComponent = connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
    return Component.AuthenticatedComponent;
}

let PortalRouter = (props) => {
    console.log("props: " + JSON.stringify(props));
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path='/home' render={() => (
                    (props.name !== "null") ? (<Home/>) : (<Redirect to="/"/>)
                )}/>
            </Switch>
        </Router>
    )
};

/*class PortalRouter extends Component {

    componentDidMount() {

    }

    render() {
        console.log("路由=" + JSON.stringify(store.getState()));
        console.log("路由=" + JSON.stringify(this.props));
        // 已登录
        //if (sessionStorage.getItem("auth") === "true") {
        return (
            <Router history={createHashHistory()}>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route exact path='/home' render={() => (
                        this.props.name !== "null" ? (<Home/>) : (<Redirect to="/"/>)
                    )}/>
                </Switch>
            </Router>
        )
        /!*}
        // 未登录
        else {
            return (
                <Login/>
            )
        }*!/
    }

}*/

// 容器组件
const mapStateToProps = (state) => ({
    name: state.addName
});

export default connect(
    mapStateToProps
)(PortalRouter);