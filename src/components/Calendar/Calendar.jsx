import React from "react";
import classes from "./Calendar.module.css";
import * as axios from "axios";
import {Redirect} from "react-router-dom";
import QRcodePage from "../QRcode/QRcodePage";
import CodeSend from "../CodeSend/CodeSend";

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            isAuth: this.props.props.isAuth,
            isTeacher: this.props.props.isTeacher,
            userId: this.props.props.userId,
            dateEventsStart: "",
            dateEventsEnd: "",
            dayEvents: 0,
            weekDays: [],
            eventsForWeek: [],
            isClickEvent: false,
            event:[],
            isActivateEvent: false
        }
    }

    componentWillMount() {
        let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
        let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь']
        let date = new Date();
        let week=[]
        date.setDate(date.getDate() - date.getDay())
        let dateEventsStart = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
        for (let i=0; i<7; i++) {
            let dayWeek = [`${date.getDate()}`, days[i], months[date.getMonth()], new Date(date)];
            week = [...week, dayWeek];
            date.setDate(date.getDate() + 1)
        }
        date.setDate(date.getDate() - 1)
        let dateEventsEnd = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
        this.setState({
            weekDays: week,
            dayEvents: (new Date()).getDate(),
            dateEventsStart,
            dateEventsEnd
        })
    }

    instanceWithToken = () => axios.create({
        withCredentials: true,
        baseURL: "http://127.0.0.1:8000/api/",
        headers: {
            "Authorization": "Token "+localStorage.getItem("token")
        }
    });

    componentDidMount() {
        let date = new Date();
        let dateEvents = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
        this.instanceWithToken().post(`events/get_events/`,{dateEvents})
            .then(response =>{
                if (response.data.data !== undefined){
                    this.setState({
                        eventsForWeek: response.data.data
                    })
                }
            })
    }

    getEvents = (date) =>{
        let dateEvents = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
        this.instanceWithToken().post(`events/get_events/`,{dateEvents})
            .then(response =>{
                if (response.data.data !== undefined){
                    this.setState({
                        eventsForWeek: response.data.data
                    })
                }
            })
    }

    render() {

        if(this.state.isClickEvent){
            return (
                <div>
                    {this.state.isTeacher &&
                        <div>
                            {!this.state.isActivateEvent &&
                                <div>
                                    <div>Мероприятие: {this.state.event.title}</div>
                                    <div className={classes.activateEvent} onClick={()=>{
                                        this.setState({isActivateEvent: true})
                                    }}>Активировать</div>
                                </div>
                            }
                            {this.state.isActivateEvent &&
                                <QRcodePage idEvent={this.state.event.id}/>
                            }
                        </div>
                    }
                    {!this.state.isTeacher &&
                        <div>
                            <CodeSend nameEvent={this.state.event.title} />
                        </div>
                    }

                    <div className={classes.btnBack} onClick={()=>{
                        this.setState({isClickEvent: false, isActivateEvent: false})
                    }}>Вернуться</div>
                </div>

            )
        }

        console.log(this.state)
        return (
            <div className={classes.calendar}>
                <div className={classes.container}>
                    <div className={classes.days}>
                        {this.state.weekDays.map(d => {
                                return <div className={classes.dayInner + " " + (this.state.dayEvents == parseInt(d[0]) ? classes.dayActive: "")} onClick={() => {
                                    this.setState({dayEvents: parseInt(d[0])})
                                    this.getEvents(d[3])
                                }} >
                                    <div className={classes.day}>{d[0]}</div>
                                    <div className={classes.dayText}>{d[1]}</div>
                                </div>
                            })
                        }
                    </div>
                    <div className={classes.events}>
                        {this.state.eventsForWeek.map(e =>{
                                let users_existsId = []
                                for(let i=0; i< e.users_exists.length;i++){
                                    users_existsId = [...users_existsId, e.users_exists[i].id]
                                }
                                let userId = this.state.userId
                                return <div className={classes.event + " " +
                                (users_existsId.indexOf(userId) !== -1 ? classes.eventGo: "")}
                                            onClick={() =>{
                                        this.setState({isClickEvent: true, event: e})
                                }} >
                                    <div className={classes.title}>{e.title}</div>
                                    <div className={classes.time}>
                                        <div className={classes.dateStart}>{e.date_start.slice(0,5)}</div>
                                        <span>-</span>
                                        <div className={classes.dateEnd}>{e.date_end.slice(0,5)}</div>
                                    </div>

                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}



export default Calendar;