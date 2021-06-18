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
app.post("/api/v1/student", createStudent);
app.get("/api/v1/student/:id", getStudent);
app.put("/api/v1/student/updatecv/:id", updateStudentCV);
app.put("/api/v1/student/updateprofilepic/:id", updateStudentPhoto);
app.put("/api/v1/student/updateprioritylist/:id", updateCompanyPriority);
app.get("/api/v1/company/:id", getCompany);

exports.app = functions.https.onRequest(app);
