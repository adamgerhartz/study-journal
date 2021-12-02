const express = require("express");
const Note = require("../models/note");

const router = express.Router();

/***
 * GET
 */
router.get("/", (req, res, next) => {
  Note.find()
    .then(notes => {
      res.status(200).json({
        message: "Notes fetched successfully",
        notes: notes
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "An error occured",
        error: error
      });
    });
});

/***
 * POST
 */
router.post("/", (req, res, next) => {
  const now = Date.now();

  const note = new Note({
    uri: req.body.uri,
    title: req.body.title,
    content: req.body.content,
    context: req.body.context,
    tags: req.body.tags,
    lastUpdated: now,
    created: now
  });

  note.save()
    .then(createdNote => {
      res.status(201).json({
        message: "Note added successfully",
        note: createdNote
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "An error occured",
        error: error
      });
    });
});

/***
 * PUT
 */
router.put("/:id", (req, res, next) => {
  const now = Date.now();

  Note.findOne({ _id: req.params.id })
    .then(note => {
      note.uri = req.body.uri;
      note.title = req.body.title;
      note.content = req.body.content;
      note.context = req.body.context;
      note.tags = req.body.tags;
      note.lastUpdated = now;
      note.created = req.body.created;

      Note.updateOne({ _id: req.params.id }, note)
        .then(result => {
          res.status(204).json({
            message: "Note updated successfully"
          });
        })
        .catch(error => {
          res.status(500).json({
            message: "An error occured",
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: "An error occured",
        error: error
      });
    });
});

/***
 * DELETE
 */
router.delete("/:id", (req, res, next) => {
  Note.findOne({ _id: req.params.id })
    .then(note => {
      Note.deleteOne({ _id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Note deleted successfully"
          });
        })
        .catch(error => {
          res.status(500).json({
            message: "An error occured",
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: "An error occured",
        error: error
      });
    });
});

module.exports = router;
