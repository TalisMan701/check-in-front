import React from "react";
import classes from "./Login.module.css";
import {Field, reduxForm} from "redux-form";
import {required} from "../../utils/validators/validators";
import {Input} from "../../common/FormsControls/FormsControls";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {login} from "../../redux/auth-reducer";

const LoginForm = (props) =>{
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Введите логин или email"} name={"login"} type={"text"}
                    validate={[required]} component={Input}/>
            </div>
            <div>
                <Field placeholder={"Введите пароль"} name={"password"} type={"password"}
                       validate={[required]} component={Input}/>
            </div>
            { props.error &&
            <div className={classes.formSummaryError}>
                {props.error}
            </div>
            }
            <div>
                <button className={classes.button}>Вход</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: "login"})(LoginForm);

const Login = (props) => {

    const login = (formData) =>{
        props.login(formData.login, formData.password)
    }

    if(props.isAuth){
        return <Redirect to={'/'}/>
    }

    return(
        <div className={classes.container}>
            <div className={classes.loginInner}>
                <h1 className={classes.title}>Авторизация</h1>
                <LoginReduxForm onSubmit={login} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {login})(Login);