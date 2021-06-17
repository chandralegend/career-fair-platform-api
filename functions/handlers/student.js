const { db } = require("./utils/admin");

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

// TODO: Update student with cvURL - student_id, cv_url - status
// TODO: Update Studnet with photoURL - student_id, cv_url - status
// TODO: Update Student with Compnay Priority list - student_id, [company_id] - status
// TODO: Get all the companies
