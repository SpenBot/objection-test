////////// DEPENDENCIES, MODULES, CONFIGURATIONS /////////////////

const express = require('express')
const router = express.Router()


////////// MODELS ///////////

const StudentModel = require('../models/student-Model')






/////////// ROUTE CONTROLLER FUNCTIONS ///////////////////////////

///////// GET ALL //////////
router.get('/api/students', (req, res) => {
    StudentModel.query()
    .catch((err) => {
      res.status(400).send(err)
      console.log('\n\t Error: Database Query Failed \n', err)
    })
    .then((students) => res.status(200).json(students))
})





////////// EXPORT MODULES /////////////////////////////////

module.exports = router





// END
