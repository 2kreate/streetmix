var isEmail = require('validator/lib/isEmail')
var isDate = require('validator/lib/isISO8601')

exports.post = function (req, res) {
  // var email
  // var name
  // var dob
  var success = true

  if (req.body.email) {
    if (isEmail(req.body.email)) {
      // email = req.body.email
    } else {
      res.status(400).json({ msg: 'Not a valid email address: ' + req.body.email })
    }
  } else {
    res.status(400).json({ msg: 'No email address provided.' })
    success = false
  }

  if (req.body.name) {
    // name = req.body.name
  } else {
    res.status(400).json({ msg: 'No name provided.' })
    success = false
  }

  if (req.body.dob) {
    if (isDate(req.body.dob)) {
      // dob = req.body.dob
    } else {
      res.status(400).json({ msg: 'Not a valid date: ' + req.body.dob })
    }
  } else {
    res.status(400).json({ msg: 'No date of birth provided.' })
    success = false
  }

  if (success) {
    res.status(201).json({ msg: 'Thank you ' + req.body.name + '. Your information was recieved!' })
  }
}
