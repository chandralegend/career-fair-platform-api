const { db } = require("../utils/admin");

// create a student
exports.createStudent = ({ body }, res) => {
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
			return res.status(500).send(error);
		}
	})();
};

// gets student info
exports.getStudent = async (req, res) => {
	const { id } = req.params;

	try {
		const student = await db.collection("students").doc(id).get();
		return res.status(200).json(student.data());
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};

// get company info
exports.getCompany = async (req, res) => {
	const { id } = req.params;

	try {
		const company = await db.collection("companies").doc(id).get();
		return res.status(200).json(company.data());
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};

// add or update student CV with cv storage handler
exports.updateStudentCV = async (req, res) => {
	const { id } = req.params;
	const { cvUrl } = req.body;

	try {
		const student = await db.collection("students").doc(id).update({
			cvUrl,
		});
		return res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};

// add or update student CV with photo storage handler
exports.updateStudentPhoto = async (req, res) => {
	const { id } = req.params;
	const { photoUrl } = req.body;

	try {
		const student = await db.collection("students").doc(id).update({
			photoUrl,
		});
		return res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};

// add or update company priority list
exports.updateCompanyPriority = async (req, res) => {
	const { id } = req.params;
	const { company_list } = req.body;

	try {
		const student = await db.collection("students").doc(id).update({
			company_list,
		});
		return res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};

// TODO: Get all the Companies uid and name
