require('dotenv').config();
const {google} = require('googleapis');
const { v4: uuidv4 } = require('uuid');

// Provide the required configuration
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;

// Google calendar API settings
const SCOPES = 'https://www.googleapis.com/auth/calendar';

const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES,
    'carrierfair@eespire.live'
);

// The duration of the meeting
const duration = 30;

const calendar = google.calendar({ version: "v3", auth });

exports.createMeet = async (startTime) => {
    try {
        const endTime = new Date(startTime.getTime() + duration * 60000);
        const resource = {
            "summary": "EESpire 2021",
            "description": "Official career fair of the department of Electrical Engineering, University of Moratuwa.",
            "end":{
                "dateTime": endTime,
                "timeZone": "Asia/Colombo"
            },
            "start":{
                "dateTime": startTime,
                "timeZone": "Asia/Colombo"
            },
            "conferenceData": {
                "createRequest": {
                "requestId": uuidv4(),
                "conferenceSolutionKey": {
                    "type": "hangoutsMeet"
                }
                }
            }
        }
        let data = await calendar.events.insert({
                calendarId: calendarId,
                resource: resource,
                conferenceDataVersion: '1'
            });
        return data;
    } catch (error) {
        console.log(error);
    }
};
