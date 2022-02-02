const db = require("../models");
const Student = db.student;
const Teacher = db.teacher;
const Subject = db.subject;
const Assignment = db.assignment;

exports.joinClass = async (req, res) => {
  try {
    const { code, subjectId } = req.body;
    if (!code) {
      return res.status(400).send({ error: "please enter the code" });
    }
    const subject = await Subject.findOne({ code: code });
    console.log(subject);
    if (!subject) {
      return res.status(200).send({ message: "Class/Subject Not Found!" });
    }
    const isJoined = await Student.findOne({ _id: req.userId }).select(
      "-password"
    );
    console.log(isJoined);
    console.log(isJoined.classJoined);
    const assignment = await Assignment.find({ subject: subjectId });
    console.log(assignment);

    if (isJoined.classJoined.includes(subject._id)) {
      return res
        .status(200)
        .send({ message: "Class/Subject Already joined !" });
    }
    const student = await Student.findByIdAndUpdate(
      req.userId,
      {
        $push: { classJoined: subject._id, assignmentNotDone: assignment },
      },
      { new: true }
    ).select("-password");

    res.status(200).send({ message: "Class/Subject joined successfully!" });
  } catch (err) {
    res.status(500).send({ err: err });
  }
};
exports.classJoined = async (req, res) => {
  try {
    const student = await Student.findOne({ _id: req.userId }).populate(
      "classJoined",
      "_id name description code"
    );
    console.log(student);
    res.status(200).send(student.classJoined);
  } catch (err) {
    res.status(500).send({ err: err });
  }
};
exports.subjectAssignment = async (req, res) => {
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
exports.assignmentSubmit = async (req, res) => {
  try {
    console.log(req.body.assignmentId);
    const student = await Student.findByIdAndUpdate(
      req.userId,
      {
        $push: { assignmentDone: req.body.assignmentId },
        $pull: { assignmentNotDone: req.body.assignmentId },
      },
      { new: true }
    ).select("-password");

    console.log(student);
    res.status(200).send(student);
  } catch (err) {
    res.status(500).send({ err: err });
  }
};
exports.assignmentUnSubmit = async (req, res) => {
  try {
    console.log(req.body.assignmentId);
    const student = await Student.findByIdAndUpdate(
      req.userId,
      {
        $pull: { assignmentDone: req.body.assignmentId },
        $push: { assignmentNotDone: req.body.assignmentId },
      },
      { new: true }
    ).select("-password");

    console.log(student);
    res.status(200).send(student);
  } catch (err) {
    res.status(500).send({ err: err });
  }
};
