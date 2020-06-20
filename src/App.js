import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import {connect} from "react-redux";
import {getAuthUserData} from "./redux/auth-reducer";

class App extends React.Component {
    componentDidMount() {
        this.props.getAuthUserData()
    }

    render() {
        return (
            <div className="App">
                <Header/>
                <Main/>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = (state) =>({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps,{getAuthUserData})(App);
