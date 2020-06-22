import React from "react";
import classes from "./CodeSend.module.css"
import {Field, reduxForm} from "redux-form";
import {required} from "../../utils/validators/validators";
import {Input} from "../../common/FormsControls/FormsControls";
import * as axios from "axios";

const CodeSendForm = (props) =>{
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Введите код"} name={"code"} type={"text"}
                       validate={[required]} component={Input}/>
            </div>
            { props.error &&
            <div className={classes.formSummaryError}>
                {props.error}
            </div>
            }
            <div>
                <button className={classes.button}>Отправить</button>
            </div>
        </form>
    )
}

const CodeSendReduxForm = reduxForm({form: "code"})(CodeSendForm);

const CodeSend = (props) =>{

    const instanceWithToken = () => axios.create({
        withCredentials: true,
        baseURL: "http://127.0.0.1:8000/api/",
        headers: {
            "Authorization": "Token "+localStorage.getItem("token")
        }
    });

    const sendCode = (formData) =>{
        instanceWithToken().post(`events/activate_code/`,{code: formData.code})
            .then(response =>{
                alert("Регистрация прошла успешно! Обновите страницу")
                if (response.data.data !== undefined){
                    this.setState({
                        eventsForWeek: response.data.data
                    })
                }
            })
    }

    return(
        <div className={classes.container}>
            <div className={classes.loginInner}>
                <h1 className={classes.title}>Регистрация на {props.nameEvent}</h1>
                <CodeSendReduxForm onSubmit={sendCode} />
            </div>
        </div>
    )
}

export default CodeSend;