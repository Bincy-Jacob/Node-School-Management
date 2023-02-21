const message = (err, res) => {
  if (err) {
    res.json({
      msg: 'Fail',
    });
  } else {
    res.json({
      msg: 'sucess',
    });
  }
};

module.exports = { message };
