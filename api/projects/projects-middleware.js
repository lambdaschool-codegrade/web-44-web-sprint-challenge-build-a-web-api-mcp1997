// add middlewares here related to projects
const Projects = require('./projects-model')

async function validateProjID(req, res, next) {
  try {
    const { id } = req.params
    const project = await Projects.get(id)
    if (project) {
      req.project = project
      next()
    } else {
      res.status(404).json({
        message: 'Project ID Not Found'
      })
    }
  } catch (err) {
    next(err)
  }
}

function validateProjBody(req, res, next) {
  const { name, description } = req.body
  if (!name || !description) {
    res.status(400).json({
      message: 'name and description required'
    })
  } else {
    next()
  }
}

function validateProjUpdate(req, res, next) {
  const { name, description, completed } = req.body
  if (!name || !description || completed === undefined) {
    res.status(400).json({
      message: 'name, description, and completed required'
    })
  } else {
    next()
  }
}

module.exports = {
  validateProjID,
  validateProjBody,
  validateProjUpdate
}
