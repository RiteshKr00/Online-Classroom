const jwt = require("jsonwebtoken");
const JWT = process.env.JWT_SEC;
const db = require("../models");
const Teacher = db.teacher;

verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  console.log(token);
  if (!token) {
    return res.status(403).send({ message: "No token Provided" });
  }
  jwt.verify(token, JWT, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

verifyTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.userId).select("-password");;
    console.log(teacher);
    if (teacher) {
      if (teacher.role === "Teacher") {
        next();
        return;
      }
    }
    res.status(403).send({ message: "Login With Teacher Role!" });
    return;
  } catch (err) {
    res.status(500).send({ err: err });
  }
};

const authJwtTeacher = {
  verifyToken,
  verifyTeacher,
};
module.exports = authJwtTeacher;
