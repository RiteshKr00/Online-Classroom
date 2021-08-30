const db = require("../models");
const Student = db.student;
const Teacher = db.teacher;
const Subject = db.subject;

exports.createSubjectClass = async (req, res) => {
  try {
    const { name, code, description } = req.body;
    if (!name || !code || !description) {
      return res.status(400).send({ error: "please add all the fields" });
    }
    const response = await Subject.findOne({ code: code });
    if (response) {
      return res.status(422).send({ message: "Class with same Code Exist Choose Another Code" });
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
