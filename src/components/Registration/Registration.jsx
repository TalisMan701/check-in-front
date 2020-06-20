import React from "react";
import classes from "./Registration.module.css";
import {Field, reduxForm} from "redux-form";
import {required} from "../../utils/validators/validators";
import {Input} from "../../common/FormsControls/FormsControls";
import {connect} from "react-redux";
import {registration, setUserFinal} from "../../redux/registration-reducer";
import {Redirect} from "react-router-dom";

const RegistrationForm = (props) =>{
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Введите логин"} name={"login"} type={"text"}
                       validate={[required]} component={Input}/>
            </div>
            <div>
                <Field placeholder={"Введите email"} name={"email"} type={"text"}
                       validate={[required]} component={Input}/>
            </div>
            <div>
                <Field placeholder={"Введите имя"} name={"name"} type={"text"}
                       validate={[required]} component={Input}/>
            </div>
            <div>
                <Field placeholder={"Введите фамилию"} name={"surname"} type={"text"}
                       validate={[required]} component={Input}/>
            </div>
            <div>
                <Field placeholder={"Введите отчество"} name={"patronymic"} type={"text"}
                       validate={[required]} component={Input}/>
            </div>
            <div>
                <Field placeholder={"Введите Вашу группу"} name={"group"} type={"text"}
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
                <button className={classes.button}>Зарегистрироваться</button>
            </div>
        </form>
    )
}

const RegistrationReduxForm = reduxForm({form: "registration"})(RegistrationForm);

const Registration = (props) => {

    const registration = (formData) => {
        let userInfo ={
            name: formData.name,
            surname: formData.surname,
            patronymic: formData.patronymic,
            group: formData.group
        }
        props.registration(formData.login, formData.email, userInfo, formData.password)
    }

    /*if(props.isRegistrated){
        setUserFinal();
        /!*endRegistration();*!/
        return <Redirect to="/login"/>
    }*/

    if(props.isRegistrated){
        setUserFinal();
        /*endRegistration();*/
        return <Redirect to="/login"/>
    }

    if(props.isAuth){
        return <Redirect to={'/'}/>
    }

    return(
        <div className={classes.container}>
            <div className={classes.registrationInner}>
                <h1 className={classes.title}>Регистрация</h1>
                <RegistrationReduxForm onSubmit={registration} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>({
    isAuth: state.auth.isAuth,
    isRegistrated: state.registration.isRegistrated
})

export default connect(mapStateToProps, {setUserFinal, registration})(Registration);