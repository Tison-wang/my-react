import React from 'react';
import Home from '../home/home';

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';

export const connectHOC = (mapObjectToProps, mapObjToProps) => (params) => (WrappedComponent) => class ComponentHOC extends React.Component {
    static displayName = `connectHOC(${getDisplayName(WrappedComponent)})`;

    render() {
        const {temp, temp1} = this.props;
        let new_props = null;
        if (typeof mapObjToProps === 'function') {
            let state = {name: "just test"};
            new_props = mapObjToProps(state);
        }
        console.log("params: " + params);
        return (
            <WrappedComponent {...this.props} {...mapObjectToProps} {...new_props}>
                <h2>{temp}</h2>
                <h2>{JSON.parse(temp1).name}</h2>
            </WrappedComponent>
        )
    }
}

function childComponent(props) {
    console.log(props);
    return <div>child-{props.temp}-{props.temp1}-{props.name}-{props.title}-{props.test1}{props.children}</div>
}

const mapObjectToProps = {
    name: "姓名：张三",
    title: "标题：react"
};

const mapObjToProps = (state) => ({
    test1: state.name
});

const WrappedComp = connectHOC(
    mapObjectToProps,
    mapObjToProps
)("多个参数传递")(childComponent);

class Page2 extends React.Component {

    componentDidMount() {
        document.title = "React-联系";
    }

    render() {
        let param = {
            name: "张三",
            age: 27
        }
        return <div>
            <Home/>
            this is page2 @
            <WrappedComp temp={"hello"} temp1={JSON.stringify(param)}/>
        </div>
    }
}

export default Page2;