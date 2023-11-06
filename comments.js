// Create web server

var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');

// GET request
router.get('/', function(req, res, next) {
  // Find all comments
  Comment.find(function(err, comments) {
    if (err) {
      return next(err);
    }
    // Send comments as JSON object
    res.json(comments);
  });
});

// POST request
router.post('/', function(req, res, next) {
  // Create new comment
  var comment = new Comment(req.body);
  // Save comment
  comment.save(function(err, comment) {
    if (err) {
      return next(err);
    }
    // Send comment as JSON object
    res.status(201).json(comment);
  });
});

// PUT request
router.put('/:id', function(req, res) {
  // Find comment by ID
  Comment.findById(req.params.id, function(err, comment) {
    if (err) {
      return next(err);
    }
    // Update comment
    comment.update(req.body, function(err) {
      if (err) {
        return next(err);
      }
      // Send comment as JSON object
      res.json(comment);
    });
  });
});

// DELETE request
router.delete('/:id', function(req, res) {
  // Find comment by ID
  Comment.findById(req.params.id, function(err, comment) {
    if (err) {
      return next(err);
    }
    // Remove comment
    comment.remove(function(err) {
      if (err) {
        return next(err);
      }
      // Send empty response
      res.json(comment);
    });
});
});
