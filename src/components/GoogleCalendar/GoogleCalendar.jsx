import React from "react";
import classes from "./GoogleCalendar.module.css";

const GoogleCalendar = (props) => {
    var gapi = window.gapi
    var CLIENT_ID = "754289276723-7p2i73mhi84rsjip6af205p32m2i5j0d.apps.googleusercontent.com"
    var API_KEY = "AIzaSyDl3gQ-qTKEUfyX83gQx-E0gvIJ34t4H9o"
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    var SCOPES = "https://www.googleapis.com/auth/calendar.events";

    const handleClick = () =>{
        gapi.load('client:auth2', () =>{
            console.log('loaded client')

            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
            })

            gapi.client.load('calendar', 'v3', () => console.log('bam!'))

            gapi.auth2.getAuthInstance().signIn()
                .then(()=>{
                    var event = {
                        'summary': 'Google I/O 2015',
                        'location': '800 Howard St., San Francisco, CA 94103',
                        'description': 'A chance to hear more about Google\'s developer products.',
                        'start': {
                            'dateTime': '2020-06-28T09:00:00-07:00',
                            'timeZone': 'America/Los_Angeles'
                        },
                        'end': {
                            'dateTime': '2020-06-28T17:00:00-07:00',
                            'timeZone': 'America/Los_Angeles'
                        },
                        'attendees': [
                            {'email': 'lpage@example.com'},
                            {'email': 'sbrin@example.com'}
                        ],
                        'reminders': {
                            'useDefault': false,
                            'overrides': [
                                {'method': 'email', 'minutes': 24 * 60},
                                {'method': 'popup', 'minutes': 10}
                            ]
                        }
                    };

                    var request = gapi.client.calendar.events.insert({
                        'calendarId': '88d63kile1qkdlerfarab9fh8k@group.calendar.google.com',
                        'resource': event
                    })

                    request.execute(event => {
                        window.open(event.htmlLink)
                    })
                })


        })
    }

    return(
        <div className={classes.footer}>
            <button onClick={handleClick} >Google</button>
        </div>
    )
}

export default GoogleCalendar;