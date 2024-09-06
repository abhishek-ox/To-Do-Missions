const ToDoModel = require("../models/ToDoModel");

module.exports.getToDo = async (req, res) => {
  try {
    const toDo = await ToDoModel.find();
    res.json(toDo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.saveToDo = async (req, res) => {
  const { text } = req.body;
  try {
    const newToDo = await ToDoModel.create({ text });
    res.json(newToDo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateToDo = async (req, res) => {
  const { id, checked } = req.body;
  try {
    const updatedToDo = await ToDoModel.findByIdAndUpdate(
      id,
      { checked },
      { new: true } // Return the updated document
    );
    res.json(updatedToDo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.deleteToDo = async (req, res) => {
  const { id } = req.body;

  try {
    const result = await ToDoModel.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send("Item not found");
    }
    res.send("Deleted successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
