// TODO: Get All Walkin Interviews - [interview]
// TODO: Get All Interviews assigned for the panel with defined status - panel_id, interview_status - [interview]
// TODO: Remove Interview
// TODO: Create Interview
// TODO: Create Meeting using Google Calendar API

exports.updateInterview = async (req, res) => {
	try {
		await db
			.collection("interviews")
			.doc(`/${req.params.id}/`)
			.update({ isCompleted: true });
		res.status(200).send();
	} catch (error) {
		res.status(500).send(error);
	}
};
