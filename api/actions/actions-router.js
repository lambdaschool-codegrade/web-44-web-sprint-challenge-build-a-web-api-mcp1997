// Write your "actions" router here!
const express = require('express')

const Actions = require('./actions-model')

const {
  validateActionID,
  validateActionBody,
  validateActionUpdated
} = require('./actions-middleware')

const router = express.Router()

router.get('/', (req, res, next) => {
  Actions.get()
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      })
    })
})

router.get('/:id', validateActionID, (req, res, next) => {
  res.status(200).json(req.action)
})

router.post('/', validateActionBody, (req, res, next) => {
  Actions.insert(req.body)
    .then(action => {
      res.status(201).json(action)
    })
    .catch(next)
})

router.put('/:id', validateActionID, validateActionUpdated, (req, res, next) => {
  Actions.update(req.params.id, req.body)
    .then(updated => {
      res.status(200).json(updated)
    })
    .catch(next)
})

router.delete('/:id', validateActionID, (req, res, next) => {
  Actions.remove(req.params.id)
    .then(() => {
      res.status(200).json({
        message: 'action successfully deleted'
      })
    })
    .catch(next)
})

module.exports = router