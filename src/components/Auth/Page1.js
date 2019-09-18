import React from 'react';
import {NavLink} from 'react-router-dom';
import Home from '../home/home';
import PropTypes from "prop-types";

class Page1 extends React.Component {

    componentDidMount() {
        document.title = "React-关于";
    }

    render() {
        return <div>
            <Home/>
            this is page1./{this.props.introduce}
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
        <p>公司简介.....</p>
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

export default Page1;