const { db } = require("../utils/admin");
const {
	createMeet
} = require("../services/meet")
// TODO: Get All Walkin Interviews - [interview]
// TODO: Get All Interviews assigned for the panel with defined status - panel_id, interview_status - [interview]
// TODO: Remove Interview
// TODO: Create Interview

// This is not complete — A dummy interviews created to test created meet links
exports.createInterview = async (req, res) => {
	const { time } = req.body; //Time Example: '2021-07-22T02:00:20+05:30'
	try {
		const interview = await db.collection("interviews").doc('123mn15').set({
			time
		});
		console.log(interview);
		return res.status(200).send(interview);
	} catch (error) {
		console.log(error);
		return res.status(500).send(error);
	}
};

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

exports.createMeeting = async (req, res) => {
	const { interviewId } = req.body;
	console.log(interviewId);
	try {
		const interviewDoc = db.collection("interviews").doc(`/${interviewId}/`);
		const interview = await interviewDoc.get();

		const conferenceInfo = await createMeet(new Date(interview.data().time)); //Example: '2021-07-22T02:00:20+05:30'
		await db.collection("interviews").doc(`/${interviewId}/`).update({
			meeting: conferenceInfo.data.hangoutLink
		});

		res.status(200).send(true);
	} catch (error) {
		res.status(500).send(error);
	}
};
