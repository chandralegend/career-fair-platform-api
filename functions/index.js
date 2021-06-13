const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const app = express();

// ROUTES
app.get("/hello-world", (req, res) => {
	return res.status(200).send("Hello World");
});

// CREATE

// READ

// UPDATE

// DELETE

exports.app = functions.https.onRequest(app);
