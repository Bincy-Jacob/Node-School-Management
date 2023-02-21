const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const syllabusSchema = new Schema(
  {
    syllabusCode: String,

    courseId: {
      type: ObjectId,
      ref: 'courses',
      index: true,
      required: true,
    },

    duration: Number,

    syllabus: Array,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('syllabus', syllabusSchema);
