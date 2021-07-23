const { google } = require("googleapis");
const { v4: uuidv4 } = require("uuid");
const { data } = require("./coordinators");

// Provide the required configuration
//const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
//const calendarId = process.env.CALENDAR_ID;

// Google calendar API settings
const SCOPES = "https://www.googleapis.com/auth/calendar";
const WORKSPACE_EMAIL = "carrierfair@eespire.live";

// The duration of the meeting
const duration = 30;

exports.createMeet = async (coordinatorEmail, studentName, companyName) => {
	try {
		const filteredCoordinatorData = data.filter((element) => element.email == coordinatorEmail);
		if (filteredCoordinatorData.length < 1) {
			return;
		}

		const coordinatorData = filteredCoordinatorData[0];
		const auth = new google.auth.JWT(
			coordinatorData.client_email,
			null,
			coordinatorData.private_key,
			SCOPES,
			WORKSPACE_EMAIL
		);
		const currentTime = new Date();
		const currentUTCTime = new Date(
			currentTime.getUTCFullYear(),
			currentTime.getUTCMonth(),
			currentTime.getUTCDate(),
			currentTime.getUTCHours(),
			currentTime.getUTCMinutes(),
			currentTime.getUTCSeconds()
		);
		const startTime = new Date(currentUTCTime.getTime() + 330 * 60000);

		const calendar = google.calendar({ version: "v3", auth });
		const endTime = new Date(startTime.getTime() + duration * 60000);
		const resource = {
			summary: `${studentName} [${companyName}] - EESpire 2021`,
			description: `Official career fair of the department of Electrical Engineering, University of Moratuwa. 
                Coordinator Email: ${coordinatorEmail}
                Assigned Student: ${studentName}
                Assigend Company: ${companyName}`,
			end: {
				dateTime: endTime,
				timeZone: "Asia/Colombo",
			},
			start: {
				dateTime: startTime,
				timeZone: "Asia/Colombo",
			},
			conferenceData: {
				createRequest: {
					requestId: uuidv4(),
					conferenceSolutionKey: {
						type: "hangoutsMeet",
					},
				},
			},
		};
		let calenderData = await calendar.events.insert({
			calendarId: coordinatorData.calendar_id,
			resource: resource,
			conferenceDataVersion: "1",
		});

		return calenderData;
	} catch (error) {
		console.log(error);
	}
};
