////////// DEPENDENCIES, MODULES, CONFIGURATIONS /////////////////

const express = require('express')
const router = express.Router()


////////// MODELS //////////
const UserModel = require('../models/Models-Index').UserModel
const OrgModel = require('../models/Models-Index').OrgModel
const RoleModel = require('../models/Models-Index').RoleModel

// const UserOrgJoinModel = require('../models/Models-Index').UserOrgJoinModel
const OrgRoleJoinModel = require('../models/Models-Index').OrgRoleJoinModel
// const UserRoleJoinModel = require('../models/Models-Index').UserRoleJoinModel






/////////// ROUTE CONTROLLER FUNCTIONS ///////////////////////////

///////// GET ALL //////////
router.get('/api/users', (req, res) => {
    UserModel.findAll({
      include: [
        {
          model: OrgModel
        },
        {
          model: OrgRoleJoinModel,
          // include: [
          //   {
          //     model: RoleModel
          //   }
          // ]
        }
      ]
    })
    .catch((err) => {
      res.status(400).send(err)
      console.log('\n\t Error: Database Query Failed \n', err)
    })
    .then((users) => res.status(200).json(users))
})



///////// CREATE //////////
router.post('/api/users', (req, res) => {

    let userId = ""

    //// create user with properties ////
    UserModel.create({
      username: req.body.username,
      first_name: req.body.first_name,
      middle_name: req.body.middle_name,
      last_name: req.body.last_name,
      command: req.body.command,
      initial_login: req.body.initial_login,
      last_login: req.body.last_login,
      authen_method: req.body.authen_method,
      status: req.body.status,
      role: req.body.role
    })
    .catch((err) => {
      res.status(400).send(err)
      console.log('\n\t Error: Database Query Failed \n\n', err)
    })

    //// loop through req.body.orgs, then add to users_orgs_join table ////
    .then((createdUser) => {

      userId = createdUser.user_id

      let orgsForUser = []

      if (req.body.user_orgs) {
        req.body.user_orgs.forEach((userOrg) => {
          orgsForUser.push(
            {
              org_id: userOrg.org_id,
              user_id: userId
            }
          )
        })
      }

      console.log(orgsForUser)
      return orgsForUser

    })
    .then((orgsForUser) => {
      UserOrgJoinModel.bulkCreate(orgsForUser)
    })
    .catch((err) => {
      res.status(400).send(err)
      console.log('\n\t Error: Database Query Failed \n\n', err)
    })

    // get the user again by ID and with all its associations, and return json to client
    .then(() => {
      UserModel.findById(userId, {
        include: [
          {
            model: OrgModel
          }
        ]
      })
      .catch((err) => {
        res.status(400).send(err)
        console.log('\n\t Error: Database Query Failed \n\n', err)
      })
      .then((returnedUser) => {
        res.status(200).json(returnedUser)
      })
    })

})




////////// GET ONE BY ID //////////
router.get('/api/users/:id', (req, res) => {
    UserModel.findById(req.params.id, {
      include: [
        {
          model: OrgModel
        }
      ]
    })
    .catch((err) => {
      res.status(400).send(err)
      console.log('\n\t Error: Database Query Failed \n\n', err)
    })
    .then((user) => res.status(200).json(user))
})





////////// UPDATE //////////
router.put('/api/users/:id', (req, res) => {

  let userId = req.params.id

  //// create user with properties ////
  UserModel.update({
    username: req.body.username,
    first_name: req.body.first_name,
    middle_name: req.body.middle_name,
    last_name: req.body.last_name,
    command: req.body.command,
    initial_login: req.body.initial_login,
    last_login: req.body.last_login,
    authen_method: req.body.authen_method,
    status: req.body.status,
    role: req.body.role
  },
  {
    where: {id: userId}
  }
  )
  .catch((err) => {
    res.status(400).send(err)
    console.log('\n\t Error: Database Query Failed \n\n', err)
  })

  //// delete all users_orgs associations for this user ////
  .then(() => {

    if (req.body.user_orgs) {
      UserOrgJoinModel.destroy({
        where: {user_id: userId}
      })
    }

  })
  .catch((err) => {
    res.status(400).send(err)
    console.log('\n\t Error: Database Query Failed \n\n', err)
  })

  //// loop through req.body.orgs, and add to users_orgs_join table, ignore duplicates ////
  .then(() => {

    let orgsOfUser = []

    if (req.body.user_orgs) {
      req.body.user_orgs.forEach((userOrg) => {
        orgsOfUser.push(
          {
            org_id: userOrg.id,
            user_id: userId
          }
        )
      })
      //// re-create the users-orgs associations
      UserOrgJoinModel.bulkCreate(orgsForUser, { ignoreDuplicates: true })
    }

  })
  .catch((err) => {
    res.status(400).send(err)
    console.log('\n\t Error: Database Query Failed \n\n', err)
  })

  // get the user again by ID and with all its associations, and return json to client
  .then(() => {
    UserModel.findById(userId, {
      include: [
        {
          model: OrgModel
        }
      ]
    })
    .catch((err) => {
      res.status(400).send(err)
      console.log('\n\t Error: Database Query Failed \n\n', err)
    })
    .then((returnedUser) => {
      res.status(200).json(returnedUser)
    })
  })

})


////////// DELETE (hard delete) ///////////
router.delete('/api/users/:id', (req, res) => {
    UserModel.destroy({
      where: {id: req.params.id}
    })
      .catch((err) => {
        res.status(400).send(err)
        console.log('\n\t Error: Database Query Failed \n\n', err)
      })
      .then((user) => res.status(200).json(user))
})






////////// EXPORT MODULES /////////////////////////////////

module.exports = router





// END
