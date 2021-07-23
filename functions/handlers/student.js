const { db } = require("../utils/admin");

// create a student
exports.createStudent = ({ body }, res) => {
	const { uuid, universityid, email, name, department, phone, photoUrl } = body;
	(async () => {
		try {
			await db.collection("students").doc(`/${uuid}/`).create({
				username: universityid,
				email,
				name,
				department,
				phone,
				photoUrl,
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

exports.updateStudentInfo = async (req, res) => {
	const { id } = req.params;
	const body = req.body;

	try {
		await db.collection("students").doc(id).update(body);
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
		await db.collection("students").doc(id).update({
			company_list,
		});
		return res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};

//get assigned sessions corresponding to a student
exports.getAssignedSessions = async (req, res) => {
	const { id } = req.params;
	try {
		const sessions = await db.collection("sessions").where("assigned_students", "array-contains", id).get();
		const sessionsList = [];
		sessions.forEach((session) => {
			const session_data = session.data();
			sessionsList.push({
				id: session.id,
				...session_data,
			});
		});
		return res.status(200).json(sessionsList);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};

//get all the companies
exports.getAllCompanies = async (req, res) => {
	try {
		const companies = await db.collection("companies").get();
		const companiesList = [];
		companies.forEach((item) => {
			companiesList.push({ id: item.id, ...item.data() });
		});
		res.status(200).json({ companiesList });
	} catch (error) {
		res.status(500).send(error);
	}
};
