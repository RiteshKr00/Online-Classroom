var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const db = require("../models");
const Student = db.student;
const Teacher = db.teacher;
const JWT = process.env.JWT_SEC;

exports.signup = async (req, res) => {
  //save to db
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role) {
      return res.status(400).send({ error: "please add all the fields" });
    }
    if (role === "Student") {
      const student = new Student({
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 8),
        role: req.body.role,
      });
      await student.save();

      res.status(200).send({ message: "Student was registered successfully!" });
    } else if (role === "Teacher") {
      const teacher = new Teacher({
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 8),
        role: req.body.role,
      });
      await teacher.save();

      res.status(200).send({ message: "Teacher was registered successfully!" });
    } else {
      return res
        .status(422)
        .send({ message: "Select Role from Student and Teacher" });
    }
  } catch (err) {
    res.status(500).send({ err: err });
  }
};
exports.signin = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (!password || !username || !role) {
      return res.status(400).send({ error: "please add all the fields" });
    }

    if (role === "Student") {
      const student = await Student.findOne({ username: req.body.username });
      if (!student) {
        return res.status(404).send({ message: "User Not Found" });
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        student.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      var token = jwt.sign({ id: student.id }, JWT, {
        expiresIn: 86400, // 24 hours
      });
      console.log(student);
      res.status(200).send({
        id: student._id,
        username: student.username,
        email: student.email,
        role: student.role,
        accessToken: token,
      });
    } else if (role === "Teacher") {
      const teacher = await Teacher.findOne({ username: req.body.username });
      if (!teacher) {
        return res.status(404).send({ message: "User Not Found" });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        teacher.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      var token = jwt.sign({ id: teacher.id }, JWT, {
        expiresIn: 86400, // 24 hours
      });
      res.status(200).send({
        id: teacher._id,
        username: teacher.username,
        email: teacher.email,
        role: teacher.role,
        accessToken: token,
      });
    } else {
      //may need to remove
      return res
        .status(422)
        .send({ message: "Select Role from Student and Teacher" });
    }
  } catch (err) {
    res.status(500).send({ err: err });
  }
};
