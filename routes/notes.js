const express = require("express");
const { addNote, getAllNotes, updateNote, deleteNote } = require("../controllers/notes");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const { handleNoteIdParam } = require("../middleware/notemiddleware");

router.param("noteID", handleNoteIdParam);

router.post("/add", verifyToken, addNote);
router.get("/getallnotes", verifyToken, getAllNotes);
router.put("/update/:noteID", verifyToken, updateNote);
router.delete("/delete/:noteID", verifyToken, deleteNote);

module.exports = router;


// router.post("/add",);
// router.put("/update/:noteID",);
// router.get("/getallnotes",)