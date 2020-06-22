import React from "react";
import Calendar from "./Calendar";
import {connect} from "react-redux";

class CalendarContainer extends React.Component{
    render() {
        return(
            <div>
                {this.props.isAuth &&
                    <Calendar props={this.props} />
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    isTeacher: state.auth.isTeacher,
    userId: state.auth.userId,
})

export default connect(mapStateToProps,{})(CalendarContainer);