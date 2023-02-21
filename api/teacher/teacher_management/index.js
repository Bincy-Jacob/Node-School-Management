var express = require('express');
var router = express.Router();

const {
  getTeachers,
  postTeacher,
  patchTeacher,
  deleteTeacher,
  getAddForm,
} = require('./controller');

/* listing and add */
router.route('/').get(getTeachers).post(postTeacher);

// edit and delete
router.route('/:id').put(patchTeacher).delete(deleteTeacher);

router.get('/add/', getAddForm);

module.exports = router;
