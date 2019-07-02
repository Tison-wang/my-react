import React from 'react';
import logo from './logo.svg';
import './App.scss';

const config = require('./config/index');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: 1};
    }

    componentWillMount() {
        this.setState({value: 2});
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React {config.mode}
                    </a>
                </header>
            </div>
        );
    }
}

export default App;
