import React from "react";
import classes from "./Header.module.css";
import {NavLink} from "react-router-dom";
import mapDispatchToProps from "react-redux/lib/connect/mapDispatchToProps";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import userIcon from "./male.svg"

const Header = (props) => {
    return(
        <header className={classes.header}>
            <div className={classes.container}>
                <div className={classes.header_inner}>
                    {props.isAuth &&
                        <div className={classes.header__user}>
                            <div className={classes.userName}>
                                <img src={userIcon} className={classes.headerLogo} alt="logo" />
                                <div className={classes.headerNameText}>{props.userInfo.name}</div>
                            </div>
                            <div className={classes.header__info}>
                                <NavLink to={"/private_office"} className={classes.header__text}>
                                    Личный кабинет
                                </NavLink>
                                <NavLink to="#" className={classes.header__text}>
                                    Уведомления
                                </NavLink>
                            </div>
                        </div>
                    }
                    {!props.isAuth &&
                        <div>CheckIn</div>
                    }
                    <div className={classes.header__auth}>
                        {!props.isAuth &&
                            <div className={classes.headerNoAuth}>
                                <NavLink to={"/login"} className={classes.headerLink}>Войти</NavLink>
                                <span> / </span>
                                <NavLink to={"/registration"} className={classes.headerLink}>Зарегистрироваться</NavLink>
                            </div>
                        }
                        {props.isAuth &&
                            <div onClick={() => {props.logout()}} className={classes.header__exit}>Выход</div>
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}

const mapStateToProps = (state) => ({
    login: state.auth.login,
    email: state.auth.email,
    userInfo: state.auth.userInfo,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps,{logout})(Header);