const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const Teacher = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    course_id: {
      type: ObjectId,
      ref: 'courses',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('teachers', Teacher);
