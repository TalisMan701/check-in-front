import React from "react";
import classes from "./Header.module.css";
import {NavLink} from "react-router-dom";
import mapDispatchToProps from "react-redux/lib/connect/mapDispatchToProps";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";

const Header = (props) => {
    return(
        <header className={classes.header}>
            <div className={classes.header_inner}>
                <div className={classes.header__user}>
                    <div className={classes.header__info}>
                        <img src='' className={classes.header__logo} alt="logo" />
                        <div className={classes.header__text}>Студент</div>
                    </div>
                    <div className={classes.header__userSettings}>
                        <a href="#" className={classes.header__text}>
                            Учетная запись
                        </a>
                        <a href="#" className={classes.header__text}>
                            Уведомления
                        </a>
                    </div>
                </div>
                <div className={classes.header__input}>
                    <NavLink to={"/login"} className={classes.header__login}>Войти</NavLink>
                    <NavLink to={"/registration"} className={classes.header__registration}>Зарегистрироваться</NavLink>
                    <a onClick={()=>{props.logout()}} href="#" className={classes.header__exit}>
                        Выход
                    </a>
                </div>
            </div>
        </header>
    )
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps,{logout})(Header);