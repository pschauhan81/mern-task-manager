const Log = require("../models/AuditLog");
const Task = require("../models/Task");

// GET TASKS
exports.getTasks = async (req, res) => {
  try {
    const { page = 1, limit = 5, search = "" } = req.query;

    const query = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ]
    };

    const tasks = await Task.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Task.countDocuments(query);

    res.json({
      tasks,
      total,
      totalPages: Math.ceil(total / limit)
    });

  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = await Task.create({ title, description });

    await Log.create({
      action: "Create Task",
      taskId: task._id,
      updatedContent: { title, description }
    });

    res.json(task);

  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const existing = await Task.findById(req.params.id);

    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

    const changes = {};
    if (req.body.title && req.body.title !== existing.title)
      changes.title = req.body.title;
    if (req.body.description && req.body.description !== existing.description)
      changes.description = req.body.description;

    await Log.create({
      action: "Update Task",
      taskId: req.params.id,
      updatedContent: changes
    });

    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    await Log.create({
      action: "Delete Task",
      taskId: req.params.id,
      updatedContent: null
    });

    res.json({ message: "Task deleted" });

  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};
