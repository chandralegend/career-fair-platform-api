const { db } = require("../utils/admin");

// create a student
exports.createStudent = async ({ body }, res) => {
  const { uuid, universityid, email, name, department, phone, photoUrl } = body;

  try {
    const re = await db
      .collection("students")
      .doc(uuid)
      .set({
        name: name || "",
        username: universityid || "",
        phone: phone || "",
        email: email || "",
        photoUrl: photoUrl || "",
        department: department || "",
        cvUrl: "",
      });
    res.status(200).send();
  } catch (error) {
    return res.status(500).send(error);
  }
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

// Get all the companies [responese style =>{companies:[company1,company2]}]
//only name of company
exports.getCompaniesList = async (req, res) => {
  try {
    const companies = await db.collection("companies").get();
    const companyList = [];
    companies.forEach((item) => {
      //or else we can use item.data().name
      //if want all details about comany we can use item.data()
      companyList.push(item.data().name);
    });
    res.status(200).json({ companies: companyList });
  } catch (error) {
    res.status(500).send(error);
  }
};
// TODO: Update Student with Compnay Priority list - student_id, [company_id] - status
