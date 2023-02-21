var express = require('express');
var router = express.Router();

const teacherRoutes = require('../api/teacher/teacher_management/index');
const courseRoutes = require('../api/course/course_management/index');
const studentRoutes = require('../api/student/student_management/index');
const demoRoutes = require('../api/aggregrateDemo/aggregrateManagement/index');
const syllabusRoutes = require('../api/syllabus/syllabusManagemant/index');
const authRoutes = require('../api/auth/index');
const bookRoutes = require('../api/swaggerDemo/index');

router.use('/teacher', teacherRoutes);
router.use('/course', courseRoutes);
router.use('/student', studentRoutes);
router.use('/aggregrateDemo', demoRoutes);
router.use('/syllabus', syllabusRoutes);
router.use('/auth', authRoutes);
router.use('/books', bookRoutes);

// router.use('/*', [require('../middleware/auth'), syllabusRoutes]);
module.exports = router;
