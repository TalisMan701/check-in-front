import React from "react";
import classes from "./QRcodePage.module.css";
import QRCode from "qrcode.react";
import * as axios from "axios";

class QRcodePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: ""
        }
    }
    /*randomInteger(min, max){
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }*/

    instanceWithToken = () => axios.create({
        withCredentials: true,
        baseURL: "http://127.0.0.1:8000/api/",
        headers: {
            "Authorization": "Token "+localStorage.getItem("token")
        }
    });

    componentWillMount() {
        /*this.code = String(this.randomInteger(1000,9999))*/
        this.setState({code: String(Date.now())})
    }

    componentDidMount() {
        this.instanceWithToken().post(`events/activate_event/`,{code: this.state.code, id: this.props.idEvent})
            .then(response =>{
                if (response.data.data !== undefined){
                    this.setState({
                        eventsForWeek: response.data.data
                    })
                }
            })
    }

    render() {
        console.log(this.state.code)
        return (
            <div className={classes.container}>
                <QRCode
                    id="1"
                    value={this.state.code}
                    size={384}
                    level={"H"}
                    includeMargin={true}
                />
            </div>
        )
    }
}

export default QRcodePage;