const { isValidObjectId } = require("mongoose");
const {
  errorHandler,
  checkReq,
  entityExistence,
} = require("../misc/common-helpers");
let Note = require("../model/Note");
noteController = {
  getAllNotes: async (req, res) => {
    try {
      let notesList = await Note.find().populate([
        { path: "createdBy", select: "name email" },
        { path: "upvotes", select: "name email" },
      ]);
      if (notesList.length > 0) {
        return res.status(200).send(notesList);
      } else {
        throw new Error("No Note(s) Found");
      }
    } catch (err) {
      errorHandler(err, res);
    }
  },
  getNotesById: async (req, res) => {
    try {
      let notesList = await Note.find({ createdBy: req.params.id }).populate([
        { path: "createdBy", select: "name email" },
        { path: "upvotes", select: "name email" },
      ]);
      if (notesList.length > 0) {
        return res.status(200).send(notesList);
      } else {
        throw new Error("No Note(s) Found");
      }
    } catch (err) {
      errorHandler(err, res);
    }
  },
  createNote: async (req, res) => {
    try {
      checkReq(req, res);
      await entityExistence(req, res, Note, "body");

      let { category, body } = req.body;
      let newNote = new Note({
        createdBy: req.user.id,
        category,
        body,
      });
      await newNote.save();
      return res.status(200).send("Note added Successfully");
    } catch (err) {
      errorHandler(err, res);
    }
  },
  updateNote: async (req, res) => {
    try {
      checkReq(req, res);
      let { body, category } = req.body;
      if (!isValidObjectId(req.params.id)) {
        throw new Error("Note does not exist");
      }
      let extNote = await Note.findOne({ _id: req.params.id }).populate([
        { path: "createdBy", select: "name email" },
      ]);
      if (extNote) {
        if (extNote.createdBy.id === req.user.id) {
          extNote.body = body;
          extNote.category = category;
          await extNote.save();
          return res.status(200).json(extNote);
        } else {
          throw new Error("You are not authorized to perform this operation");
        }
      } else throw new Error("Note does not exist");
    } catch (err) {
      errorHandler(err, res);
    }
  },
  upvoteNote: async (req, res) => {
    try {
      checkReq(req, res);
      if (!isValidObjectId(req.params.id)) {
        throw new Error("Note does not exist");
      }
      let extNote = await Note.findOne({ _id: req.params.id }).populate([
        { path: "createdBy", select: "name email" },
        { path: "upvotes", select: "name email" },
      ]);
      if (extNote) {
        if (extNote.upvotes.some((upvote) => upvote.id == req.user.id)) {
          throw new Error("You have already upvoted");
        } else {
          extNote.upvotes = [...extNote.upvotes, req.user.id];
          await extNote.save();
          return res.status(200).json(extNote);
        }
      } else throw new Error("Note does not exist");
    } catch (err) {
      errorHandler(err, res);
    }
  },
  deleteNote: async (req, res) => {
    try {
      if (!isValidObjectId(req.params.id)) {
        throw new Error("Note does not exist");
      }
      let extNote = await Note.findOne({ _id: req.params.id }).populate([
        { path: "createdBy", select: "name email" },
      ]);
      if (extNote) {
        if (extNote.createdBy.id === req.user.id) {
          await Note.deleteOne({ _id: req.params.id });
          return res.status(200).send();
        } else {
          throw new Error("You are not authorized to perform this operation");
        }
      } else throw new Error("Note does not exist");
    } catch (err) {
      errorHandler(err, res);
    }
  },
};
module.exports = noteController;
