const { isValidObjectId } = require('mongoose');
const aggregrateDemo = require('../../../models/aggregrateDemo');

const getStudentDetails = async (req, res, next) => {
  const { sortBy, orderBy, syllabus } = req.query;
  const page = req.query.page || 0;
  const perPage = req.query.offset || 10;

  let data = !syllabus
    ? await aggregrateDemo.aggregate([
        {
          $lookup: {
            from: 'courses',
            localField: 'courseId',
            foreignField: '_id',
            as: 'course',
          },
        },
        {
          $unwind: { path: '$course', preserveNullAndEmptyArrays: true },
        },
        {
          $addFields: {
            Total_Marks: {
              $sum: '$marks',
            },
          },
        },
        {
          $addFields: {
            Grand_Total: {
              $sum: [
                {
                  $sum: '$marks',
                },
                '$creditMark',
              ],
            },
          },
        },
        {
          $addFields: {
            Status: {
              $cond: [
                {
                  $gt: [{ $sum: [{ $sum: '$marks' }, '$creditMark'] }, 350],
                },
                'Pass',
                'Fail',
              ],
            },
          },
        },
        {
          $project: {
            _id: 0,
            Name: '$studentName',
            Course_Name: '$course.courseName',
            Marks: '$marks',
            Extra_Score: '$creditMark',
            Total_Marks: '$Total_Marks',
            Grand_Total: '$Grand_Total',
            Status: '$Status',
          },
        },
        {
          $group: {
            _id: '$Status',
            // students: { $push: '$$ROOT' },
            // students: { $first: '$Name' },
            // students: { $last: '$Name' },
            // students: { $push: '$Name' },
            // students: { $max: '$Grand_Total' },
            // students: { $avg: '$Grand_Total' },
            // students: { $sum: '$Grand_Total' },
            students: { $addToSet: '$Name' },
          },
        },
        {
          $sort: {
            [sortBy]: orderBy ? parseInt(orderBy) : 1,
          },
        },
        {
          $skip: page * perPage,
        },
        {
          $limit: perPage,
        },
      ])
    : await aggregrateDemo.aggregate([
        {
          $lookup: {
            from: 'syllabuses',
            localField: 'courseId',
            foreignField: 'courseId',
            as: 'courseDetails',
          },
        },
        {
          $unwind: { path: '$courseDetails', preserveNullAndEmptyArrays: true },
        },
        {
          $match: { 'courseDetails.syllabusCode': syllabus },
        },
        {
          $skip: page * perPage,
        },
        {
          $limit: perPage,
        },
      ]);

  res.json(data);
};

const viewStudentDetails = async (req, res, next) => {
  let { id } = req.params;

  if (isValidObjectId(id)) {
    aggregrateDemo
      .findById({ _id: id })
      .then((data) => {
        if (data) res.json(data);
        else res.json({ msg: 'No student with this Id' });
      })
      .catch((err) => res.json(err));
  } else res.json({ msg: 'NOT a valid object id' });
};

const postStudentDetails = async (req, res, next) => {
  let data = await aggregrateDemo.find({ studentName: req.body.studentName });
  if (data) res.json({ msg: 'Student already exist' });
  else {
    await aggregrateDemo.insertMany(req.body);
    res.redirect('/aggregrateDemo');
  }
};

module.exports = { getStudentDetails, postStudentDetails, viewStudentDetails };
