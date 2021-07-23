const { db } = require("../utils/admin");

//get Panel details
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

//get All panel details
exports.getAllPanels = async (req, res) => {
	try {
		const panels_collection = await db
			.collection("panels")
			.where("company_id", "==", req.params.id)
			.orderBy("panel_no")
			.get();
		const panels = [];
		panels_collection.forEach((panel) => {
			panels.push({
				id: panel.id,
				...panel.data(),
			});
		});
		res.status(200).json(panels);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};

// change the panel availabilty
exports.updatePanelAvailabilty = async (req, res) => {
	try {
		await db.collection("panels").doc(`/${req.params.id}/`).update({ availability: req.body.availability });
		res.status(200).send();
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};

exports.getPanelSessions = async (req, res) => {
	try {
		const sessions_ref = await db
			.collection("sessions")
			.where("panel_id", "==", req.params.id)
			.orderBy("start_time", "asc")
			.get();
		const sessions = [];
		sessions_ref.forEach((ref) => {
			sessions.push({
				id: ref.id,
				...ref.data(),
			});
		});
		res.status(200).send(sessions);
	} catch (error) {
		console.log("🚀 ~ file: panel.js ~ line 69 ~ exports.getPanelSessions=async ~ error", error);
		res.status(500).send(error);
	}
};
