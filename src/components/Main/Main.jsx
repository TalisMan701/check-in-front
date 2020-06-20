import React from "react";
import classes from "./Main.module.css";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";
import {Route} from "react-router-dom";

const Main = (props) => {
    return(
        <div className={classes.main}>
            <div className={classes.container}>
                <Route path={"/login"} render={() => <Login/>} />
                <Route path={"/registration"} render={() => <Registration/>} />
            </div>
        </div>
    )
}

export default Main;