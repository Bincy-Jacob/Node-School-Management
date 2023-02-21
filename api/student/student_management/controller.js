const student = require('../../../models/student');
const { message } = require('./services');

const getStudents = async (req, res, next) => {
  let data = await student.find({});
  // let data = await student.aggregate([
  //   {
  //     $group: { _id: '$full_name' },
  //   },
  //   { $count: 'count' },
  //   {
  //     $addFields: {
  //       total: { $sum: '$marks' },
  //     },
  //   },
  //   {
  //     $project: { marks: 1 },
  //   },
  //   {
  //     $sort: { full_name: 1 },
  //   },
  //   {
  //     $limit: 5,
  //   },
  // ]);

  res.json(data);
};

const postStudent = async (req, res, next) => {
  student.create(req.body, (err) => {
    message(err, res);
  });
};

const patchStudent = async (req, res, next) => {
  let { id } = req.params;
  let updateData = req.body;

  // ===========  update skills only

  // let updateData = req.body.skills;
  // student.findById(id, (err, data) => {
  //   if (!err) {

  //     updateData.forEach((eachSkill) => data.skills.push(eachSkill));
  //     const newSkill = new student(data);

  //     newSkill.save(function (err) {
  //       if (err) console.log(err);
  //       else console.log('success');
  //       res.redirect('/student');
  //     });
  //   }
  // });

  // ===========  update full data =====

  student.findByIdAndUpdate(id, updateData, (err) => {
    message(err, res);
  });
};

const deleteStudent = async (req, res) => {
  let { id } = req.params;
  student.findByIdAndDelete(id, (err) => {
    message(err, res);
  });
};

module.exports = { getStudents, postStudent, patchStudent, deleteStudent };
