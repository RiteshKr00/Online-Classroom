const db = require("../models");
const Student = db.student;
const Teacher = db.teacher;
const Subject = db.subject;
const Assignment = db.assignment;
exports.createSubjectClass = async (req, res) => {
  try {
    const { name, code, description } = req.body;
    if (!name || !code || !description) {
      return res.status(400).send({ error: "please add all the fields" });
    }
    const response = await Subject.findOne({ code: code });
    if (response) {
      return res
        .status(422)
        .send({ message: "Class with same Code Exist Choose Another Code" });
    }
    const subject = new Subject({
      name: name,
      code: code,
      description: description,
    });
    await subject.save();
    const teacher = await Teacher.findByIdAndUpdate(
      req.userId,
      {
        $push: { classCreated: subject._id },
      },
      { new: true }
    ).select("-password");
    console.log(teacher);
    res
      .status(200)
      .send({ message: "Class/Subject was created successfully!" });
  } catch (err) {
    res.status(500).send({ err: err });
  }
};
exports.classCreated = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ _id: req.userId }).populate(
      "classCreated",
      "_id name description code"
    );
    console.log(teacher);
    res.status(200).send(teacher.classCreated);
  } catch (err) {
    res.status(500).send({ err: err });
  }
};
exports.createAssignment = async (req, res) => {
  try {
    const { details, deadline, subjectId } = req.body;
    if (!details || !subjectId) {
      return res.status(400).send({ error: "please add Necessary fields" });
    }
    const assignment = new Assignment({
      details: details,
      deadline: deadline,
      subject: subjectId,
    });
    await assignment.save();

    console.log(assignment);
    res.status(200).send({ message: "Assignment was created successfully!" });
  } catch (err) {
    res.status(500).send({ err: err });
  }
};
exports.AssignmentCreated = async (req, res) => {
  try {
    
    console.log(req.query.subjectId);
    
    const assignments = await Assignment.find({
      subject: req.query.subjectId,
    });
    console.log(assignments);
    res.status(200).send(assignments);
  } catch (err) {
    res.status(500).send({ err: err });
  }
};
