const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const {
	createStudent,
	getStudent,
	getCompany,
	updateStudentCV,
	updateStudentInfo,
	updateCompanyPriority,
	getAllCompanies,
	getAssignedSessions,
} = require("./handlers/student");

const {
	getPanel,
	getAllPanels,
	updatePanelAvailabilty,
	updateWalkinStatus,
	getPanelSessions,
} = require("./handlers/panel");

const {
	createMeeting,
	createInterview
} = require("./handlers/interview")

const { updateInterview } = require("./handlers/interview");

const app = express();
app.use(cors({ origin: true }));

//BOTH
app.get("/v1/panels/:id", getPanel);

//STUDENT
app.post("/v1/student", createStudent);
app.put("/v1/student/:id", updateStudentInfo);
app.put("/v1/student/updateprioritylist/:id", updateCompanyPriority);
app.get("/v1/company", getAllCompanies);
app.get("/v1/student/:id", getStudent);
app.put("/v1/student/updatecv/:id", updateStudentCV);
app.get("/v1/student/sessions/:id", getAssignedSessions);

//RECRUITER
app.get("/v1/company/:id", getCompany);
app.get("/v1/company/panels/:id", getAllPanels);
app.post("/v1/company/panel/updateavalabilty/:id", updatePanelAvailabilty);
app.post("/v1/company/panel/updatewalkin/:id", updateWalkinStatus);
app.post("/v1/company/interview/updateinterview/:id", updateInterview);
app.get("/v1/company/panels/sessions/:id", getPanelSessions);

//MEET
app.post("/v1/interview/create", createInterview);
app.post("/v1/meeting/create", createMeeting);

exports.api = functions.https.onRequest(app);
