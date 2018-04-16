var isEmail = require('validator/lib/isEmail')
var isDate = require('validator/lib/isISO8601')

exports.post = function (req, res) {
  var status = 400
  var statusMsg = ''
  if (req.body.email) {
    if (!isEmail(req.body.email)) {
      statusMsg += 'Not a valid email address: ' + req.body.email + '. '
    }
  } else {
    statusMsg += 'No email address provided. '
  }

  if (!req.body.name) {
    statusMsg += 'No name provided. '
  }

  if (req.body.dob) {
    if (!isDate(req.body.dob)) {
      statusMsg += 'Not a valid date: ' + req.body.dob + '. '
    }
  } else {
    statusMsg += 'No date of birth provided.'
  }

  if (statusMsg === '') {
    status = 201
    statusMsg += 'Thank you ' + req.body.name + '. Your information was recieved!'
  }

  res.status(status).json({ msg: statusMsg })
}
