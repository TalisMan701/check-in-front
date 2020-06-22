import React from "react";
import classes from "./Main.module.css";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";
import {Route} from "react-router-dom";
import PrivateOffice from "../PrivateOffice/PrivateOffice";
import CalendarContainer from "../Calendar/CalendarContainer";

const Main = (props) => {
    return(
        <div className={classes.main}>
            <div className={classes.container}>
                <Route path={"/login"} render={() => <Login/>} />
                <Route path={"/registration"} render={() => <Registration/>} />
                <Route path={"/private_office"} render={() => <PrivateOffice/>} />
                <Route exact path={"/"} render={() => <CalendarContainer/>} />
            </div>
        </div>
    )
}

export default Main;