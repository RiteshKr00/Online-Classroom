const db = require("../models");
const Student = db.student;
const Teacher = db.teacher;
const Subject = db.subject;

exports.joinClass = async (req, res) => {
  try {
    const { code } = req.body;
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
    if (isJoined.classJoined.includes(subject._id)) {
      return res
        .status(200)
        .send({ message: "Class/Subject Already joined !" });
    }
    const student = await Student.findByIdAndUpdate(
      req.userId,
      {
        $push: { classJoined: subject._id },
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