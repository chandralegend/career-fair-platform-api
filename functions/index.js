const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const { createStudent, getStudent, getCompany } = require("./handlers/student");

const app = express();
app.use(cors({ origin: true }));

//STUDENT
app.post("/api/v1/student", createStudent);
app.get("/api/v1/student/:id", getStudent);
app.get("/api/v1/company/:id", getCompany);

exports.app = functions.https.onRequest(app);
