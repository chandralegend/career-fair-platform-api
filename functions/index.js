const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const {
  createStudent,
  getStudent,
  getCompany,
  updateStudentCV,
  updateStudentPhoto,
  getCompaniesList,
} = require("./handlers/student");

const { getWalkinInterviews } = require("./handlers/interview");

const app = express();
app.use(cors({ origin: true }));

//STUDENT
app.post("/api/v1/student", createStudent);
app.get("/api/v1/student/:id", getStudent);
app.put("/api/v1/student/:id", updateStudentCV);
app.put("/api/v1/student/:id", updateStudentPhoto);
app.get("/api/v1/company/:id", getCompany);
app.get("/api/v1/getCompaniesList", getCompaniesList);

//INTERVIEWS
app.get("/api/v1/getWalkinInterviews", getWalkinInterviews);

exports.app = functions.https.onRequest(app);
