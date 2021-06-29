// TODO: Get All Students assigned to a Panel - panel_id
// TODO: Change Panel Status
// TODO: Enable/Disable Walkin Interviews

const { db } = require("../utils/admin");

exports.getPanel = async (req, res) => {
	const { id } = req.params;
	try {
		const session = await db.collection("panels").doc(id).get();
		const session_data = session.data();
		res.status(200).json(session_data);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};
