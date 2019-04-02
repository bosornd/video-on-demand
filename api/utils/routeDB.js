module.exports = (db, id) => {
  var express = require('express')
  var router = express.Router()

  if (id === undefined) id = '_id';
  // list
  router.get('/', function (req, res) {
    db.find(function (err, result) {
      if (err) {
        return res.status(500).json(err)
      }
      return res.json(result)
    })
  }),

  // search
  router.get('/search', function (req, res) {
    db.find(req.query, function (err, result) {
      if (err) {
        return res.status(500).json(err)
      }
      return res.json(result)
    })
  }),

  // show
  router.get('/:id', function (req, res) {
    db.findOne({[id]: req.params.id}, function (err, result) {
      if (err) {
        return res.status(500).json(err)
      }
      if (!result) {
        return res.status(404).json({
          message: 'No such data'
        })
      }
      return res.json(result)
    })
  }),

  // create
  router.post('/', function (req, res) {
    db.create(req.body, function (err, result) {
      if (err) {
        return res.status(500).json(err)
      }
      return res.status(201).json(result)
    })
  }),

  // update
  router.put('/:id', function (req, res) {
    db.findOneAndUpdate({[id]: req.params.id}, req.body, function (err, result) {
      if (err){
        return res.status(500).json(err)
      }
      return res.json(result);
    })
  }),

  // delete
  router.delete('/:id', function (req, res) {
    db.findOneAndDelete({[id]: req.params.id}, function (err, result) {
      if (err) {
        return res.status(500).json(err)
      }
      return res.status(204).json(result)
    })
  })

  return router
}
