// add middlewares here related to actions
const Projects = require('../projects/projects-model')
const Actions = require('./actions-model')

async function validateActionID(req, res, next) {
  try {
    const { id } = req.params
    const action = await Actions.get(id)
    if (action) {
      req.action = action
      next()
    } else {
      res.status(404).json({
        message: 'Action ID Not Found'
      })
    }
  } catch (err) {
    next(err)
  }
}

async function validateActionBody(req, res, next) {
  const {
    project_id,
    description,
    notes
  } = req.body
  const existingProject = await Projects.get(project_id)
  if (!project_id || !description || !notes) {
    res.status(400).json({
      message: 'project id, description, and notes required'
    })
  } else if (!existingProject) {
    res.status(404).json({
      message: `Project with id ${project_id} not found`
    })
  } else if (description.length > 128) {
    res.status(400).json({
      message: 'Description cannot exceed 128 characters'
    })
  } else {
    next()
  }
}

module.exports = {
  validateActionID,
  validateActionBody
}