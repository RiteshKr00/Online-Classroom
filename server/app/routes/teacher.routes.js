const teacherController = require("../controllers/teacher.controller");
const authJwtTeacher = require("../middlewares/authJwtTeacher");
/// NEW - Add CORS headers - see https://enable-cors.org/server_expressjs.html
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
    "/api/teacher/createclass",
    [authJwtTeacher.verifyToken, authJwtTeacher.verifyTeacher],
    teacherController.createSubjectClass
  );
  app.get(
    "/api/teacher/classcreated",
    [authJwtTeacher.verifyToken, authJwtTeacher.verifyTeacher],
    teacherController.classCreated
  );
};
