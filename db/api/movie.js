var express = require('express')
var router = express.Router()

var db = require('../models/movie')

// list
router.get('/', function (req, res) {
  db.find(function (err, result) {
    if (err) {
      return res.status(500).json(err)
    }
    return res.json(result)
  })
}),

router.get('/search', function (req, res) {
  db.find({$text: {$search:req.query.text}}, function (err, result) {
    if (err) {
      return res.status(500).json(err)
    }
    return res.json(result)
  })
}),

router.get('/latest', function (req, res) {
  db.find(req.query)
  .limit(100)
  .sort({released_date:-1})
  .exec((err, result) => {
    if (err) {
      return res.status(500).json(err)
    }
    return res.json(result)
  })
}),

router.get('/ranked', function (req, res) {
  db.find(req.query)
  .limit(100)
  .sort({vote_average:-1})
  .exec((err, result) => {
    if (err) {
      return res.status(500).json(err)
    }
    return res.json(result)
  })
}),

// show
router.get('/:id', function (req, res) {
  db.findOne({_id: req.params.id}, function (err, result) {
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
  db.findOneAndUpdate({_id: req.params.id}, req.body, function (err, result) {
    if (err){
      return res.status(500).json(err)
    }
    return res.json(result);
  })
}),

// delete
router.delete('/:id', function (req, res) {
  db.findOneAndDelete({_id: req.params.id}, function (err, result) {
    if (err) {
      return res.status(500).json(err)
    }
    return res.status(204).json(result)
  })
})

module.exports = router
