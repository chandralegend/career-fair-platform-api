const { db } = require("../utils/admin");

//  Get All Walkin Interviews
exports.getWalkinInterviews = async (req, res) => {
  try {
    const walkinInterviews = await db.collection("walkin_interviews").get();
    const walkinInterviewsList = [];
    walkinInterviews.forEach((item) => {
      walkinInterviewsList.push({ [item.id]: item.data() });
    });
    res.status(200).json({ walkingInteviews: walkinInterviewsList });
  } catch (error) {
    res.status(500).send(error);
  }
};
// TODO: Get All Interviews assigned for the panel with defined status - panel_id, interview_status - [interview]
// TODO: Remove Interview
// TODO: Change Interview Status
// TODO: Create Interview
// TODO: Create Meeting using Google Calendar API
