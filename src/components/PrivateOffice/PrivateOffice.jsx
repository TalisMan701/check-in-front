import React from "react";
import classes from "./PrivateOffice.module.css";
import {connect} from "react-redux";
import {NavLink, Redirect} from "react-router-dom";

class PrivateOffice extends React.Component {
    render() {
        if(!this.props.isAuth){
            return <Redirect to={"/login"}/>
        }
        return (
            <div className={classes.privateOffice}>
                <div className={classes.container}>
                    <div className={classes.officeInnner}>
                        <div className={classes.title}>Личный кабинет</div>
                        <div className={classes.userInfo}>
                            <div className={classes.text} ><span>{this.props.userInfo.surname} {this.props.userInfo.name} {this.props.userInfo.patronymic}</span></div>
                            <div className={classes.phone}>Логин: <span>{this.props.login}</span></div>
                            <div className={classes.email}>Email: <span>{this.props.email}</span></div>
                            <div className={classes.text}>Группа: <span>{this.props.userInfo.group}</span></div>
                        </div>
                        <div className={classes.btns}>
                            <NavLink to={'/'} className={classes.btn}>На главную</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    login: state.auth.login,
    email: state.auth.email,
    userInfo: state.auth.userInfo,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps,{})(PrivateOffice);