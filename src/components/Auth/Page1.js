import React from 'react';
import {NavLink} from 'react-router-dom';
import Home from '../home/home';
import PropTypes from "prop-types";
import {connect} from "react-redux";

class Page1 extends React.Component {

    componentDidMount() {
        this.props.changeTitle();
        document.title = this.props.title;
    }

    render() {
        return <div>
            <Home/>
            this is page1./{this.props.introduce}-{this.props.name}
            <br/>
            <NavLink to='/home/page1/about' exact>公司简介</NavLink>
            <br/>
            <NavLink to='/home/page1/aboutAddress' activeStyle={{
                fontWeight: '700',
                color: 'red'
            }} exact>公司地址</NavLink>
        </div>
    }
}

Page1.propTypes = {
    introduce: PropTypes.string
}

export const Company = () => (
    <div>
        <Page1/>
        <p>公司简介.....{this.props.name}</p>
    </div>
)

export const CompanyAddress = ({match}) => {
    let a = "temp1", b = "temp2", c = "temp3";
    const props = {a, b, c};
    return (
        <section>
            <Page1/>
            <p>公司地址.....</p>
            <Template {...props}>
                <div>bottom-{match.url}</div>
            </Template>
        </section>
    )
}

function Template(props) {
    return <div className={"template"}>
        <hr/>
        {props.a}-
        {props.b}-
        {props.c}
        {/* Template标签下的元素 */}
        {props.children}
    </div>
}

// 容器组件
const mapStateToProps = (state) => ({
    name: state.addName,
    age: state.addAge,
    title: "页1"
});

// dispatch接收一个参数，这个参数是action = {动作类别, 动作参数}
// dispatch内部调用了Reducer并在Reducer执行完毕后执行subscribe注册的callback
const mapActionToProps = (dispatch) => ({
    changeTitle: () => dispatch({type: "TEST4", data: "page1"})
});

export default connect(
    mapStateToProps,
    mapActionToProps
)(Page1);