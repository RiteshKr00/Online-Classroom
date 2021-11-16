const studentController = require("../controllers/student.controller");
const authJwtStudent = require("../middlewares/authJwtStudent");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
      //can be done by cors package
    );
    next();
  });

  app.post(
    "/api/student/joinclass",
    [authJwtStudent.verifyToken, authJwtStudent.verifyStudent],
    studentController.joinClass
  );
  app.get(
    "/api/student/classjoined",
    [authJwtStudent.verifyToken, authJwtStudent.verifyStudent],
    studentController.classJoined
  );
  app.get(
    "/api/student/subjectassignment",
    [authJwtStudent.verifyToken, authJwtStudent.verifyStudent],
    studentController.subjectAssignment
  );
  app.put(
    "/api/student/assignmentsubmit",
    [authJwtStudent.verifyToken, authJwtStudent.verifyStudent],
    studentController.assignmentSubmit
  );
  app.put(
    "/api/student/assignmentunsubmit",
    [authJwtStudent.verifyToken, authJwtStudent.verifyStudent],
    studentController.assignmentUnSubmit
  );
};
