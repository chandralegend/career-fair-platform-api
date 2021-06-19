const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const {
	createStudent,
	getStudent,
	getCompany,
	updateStudentCV,
	updateStudentPhoto,
	updateCompanyPriority,
} = require("./handlers/student");

const app = express();
app.use(cors({ origin: true }));

//STUDENT
app.post("/v1/student", createStudent);
app.get("/v1/student/:id", getStudent);
app.put("/v1/student/updatecv/:id", updateStudentCV);
app.put("/v1/student/updateprofilepic/:id", updateStudentPhoto);
app.put("/v1/student/updateprioritylist/:id", updateCompanyPriority);
app.get("/v1/company/:id", getCompany);

exports.api = functions.https.onRequest(app);
