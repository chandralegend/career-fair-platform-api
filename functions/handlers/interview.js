const { db, admin } = require("../utils/admin");
const { createMeet } = require("../services/meet");
// TODO: Get All Walkin Interviews - [interview]
// TODO: Get All Interviews assigned for the panel with defined status - panel_id, interview_status - [interview]
// TODO: Remove Interview
// TODO: Create Interview

// This is not complete — A dummy interview created to test created meet links.
// Id of the doc should be changed before createing a meeting.
exports.createInterview = async (req, res) => {
	const { companyId, isWalkin, sessionId, studentId } = req.body; //Time Example: '2021-07-22T02:00:20+05:30'
	try {
		const interview = await db.collection("interviews").add({
			isWalkin: isWalkin,
			session_id: sessionId,
			student_id: studentId,
			meet_link: "",
			isCompleted: false,
			company_id: companyId,
			created_at: admin.firestore.FieldValue.serverTimestamp(),
		});
		const studentdata = await db.collection("students").doc(studentId).update({ checkedin: interview.id });
		return res.status(200).send({ interview, studentdata });
	} catch (error) {
		console.log(error);
		return res.status(500).send(error);
	}
};

exports.updateInterview = async (req, res) => {
	try {
		await db.collection("interviews").doc(`/${req.params.id}/`).update({ isCompleted: true });
		res.status(200).send();
	} catch (error) {
		res.status(500).send(error);
	}
};

exports.createMeeting = async (req, res) => {
	const { interviewId, sessionTime } = req.body;
	try {
		// const interviewDoc = db.collection("interviews").doc(`/${interviewId}/`);
		// const interview = await interviewDoc.get();

		//const conferenceInfo = await createMeet(new Date(interview.data().time)); //Example: '2021-07-22T02:00:20+05:30'
		const conferenceInfo = await createMeet(new Date(sessionTime)); //Example: '2021-07-22T02:00:20+05:30'
		await db.collection("interviews").doc(`/${interviewId}/`).update({
			meet_link: conferenceInfo.data.hangoutLink,
		});

		res.status(200).send(conferenceInfo.data.hangoutLink);
	} catch (error) {
		res.status(500).send(error);
	}
};
