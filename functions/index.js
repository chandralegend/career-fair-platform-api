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

const { getPanel } = require("./handlers/panel");

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

exports.api = functions.https.onRequest(app);
