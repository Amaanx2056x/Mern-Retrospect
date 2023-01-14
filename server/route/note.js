let express = require("express");
const noteController = require("../controller/note");
let { validateNote } = require("../middleware/validate-json");
let authenticateUser = require("../middleware/auth");
let router = express.Router();

router.get("", authenticateUser, noteController.getAllNotes);
router.get("/:id", authenticateUser, noteController.getNotesById);

router.post(
  "/create",
  [authenticateUser, validateNote],
  noteController.createNote
);
router.post(
  "/update/:id",
  [authenticateUser, validateNote],
  noteController.updateNote
);

router.post("/upvote/:id", [authenticateUser], noteController.upvoteNote);
router.post("/delete/:id", [authenticateUser], noteController.deleteNote);

module.exports = router;
