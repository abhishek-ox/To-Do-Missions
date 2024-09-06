const { Router } = require("express");
const {
  getToDo,
  saveToDo,
  updateToDo,
  deleteToDo,
} = require("../controllers/ToDoController");

const router = Router();

router.get("/", getToDo); // Route to get all to-do items
router.post("/save", saveToDo); // Route to save a new to-do item
router.post("/update", updateToDo); // Route to update an existing to-do item (checkbox status)
router.delete("/delete", deleteToDo);  // Route to delete a to-do item


module.exports = router;
