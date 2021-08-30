const db = {};

db.student = require("./student.model");
db.teacher = require("./teacher.model");
db.subject = require("./subject.model");

module.exports = db;
