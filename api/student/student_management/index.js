var express = require('express');
const {
  getStudents,
  postStudent,
  patchStudent,
  deleteStudent,
} = require('./controller');

const { studentPost } = require('./validate');

var router = express.Router();

router.route('/').get(getStudents).post(studentPost, postStudent);
router.route('/:id').patch(studentPost, patchStudent).delete(deleteStudent);

module.exports = router;
