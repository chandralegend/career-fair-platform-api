const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});
const app = express();
app.use(cors({ origin: true }));
const db = admin.firestore();

// ROUTES

// CREATE
// create a student
app.post("/api/v1/student", ({ body }, res) => {
	const { uuid, universityid, email, name, department, phone } = body;
	(async () => {
		try {
			await db.collection("students").doc(`/${uuid}/`).create({
				username: universityid,
				email,
				name,
				department,
				phone,
			});

			return res.status(200).send();
		} catch (error) {
			console.log("🚀 ~ file: index.js ~ line 33 ~ error", error);
			return res.status(500).send(error);
		}
	})();
});

// READ
// get student info
app.get("/api/v1/student/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const student = await db.collection("students").doc(id).get();
		return res.status(200).json(student.data());
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
});
// get company info
app.get("/api/v1/company/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const company = await db.collection("companies").doc(id).get();
		return res.status(200).json(company.data());
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
});

// UPDATE

// DELETE

exports.app = functions.https.onRequest(app);
