const db = {};

db.student = require("./student.model");
db.teacher = require("./teacher.model");
db.subject = require("./subject.model");
db.assignment = require("./assignment.model");
module.exports = db;
