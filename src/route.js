import React from 'react';
import {Router, Route, Switch, Redirect} from 'react-router';
import Home from './components/home/home';
import Page1 from './components/Auth/Page1';
import Page2 from './components/Auth/Page2';
import {Company, CompanyAddress} from './components/Auth/Page1';
import Login from './components/login/login';
import {connect} from 'react-redux';
import history from "./redux/history";
import PropTypes from 'prop-types';
import {Component} from 'react';

/*function requireAuthentication(Component) {

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
}*/

function HomePage(props) {
    return <Home portal_title={"第一页"}/>;
}

function Page1HOC() {
    return <Page1 introduce={"介绍"}/>;
}

class PortalRouter extends Component {

    childContextTypes = {
        store: PropTypes.object    // childContextTypes必须声明  这一句很重要
    }

    getChildContext() {
        return {
            store: this.props.store
        };
    }

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route children={() => (
                        (sessionStorage.getItem("auth")) ? (
                            <Route children={() => (
                                <Switch>
                                    <Route exact path='/home' component={HomePage}/>
                                    <Route exact path='/home/page1' component={Page1HOC}/>
                                    <Route exact path='/home/page1/about' component={Company}/>
                                    <Route exact path='/home/page1/aboutAddress' component={CompanyAddress}/>
                                    <Route path='/home/page2' component={Page2}/>
                                </Switch>
                            )}/>
                        ) : (<Redirect to="/"/>)
                    )}/>
                </Switch>
            </Router>
        )
    }

};

// 容器组件
const mapStateToProps = (state) => ({
    name: state.addName
});

export default connect(
    mapStateToProps
)(PortalRouter);