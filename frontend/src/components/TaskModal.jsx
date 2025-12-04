import { useState, useEffect } from "react";
import API from "../api";

export default function TaskModal({ close, refresh, editTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
    }
  }, [editTask]);

  const handleSubmit = async () => {
    try {
      if (editTask) {
        await API.put(`/tasks/${editTask._id}`, { title, description });
      } else {
        await API.post("/tasks", { title, description });
      }

      refresh();
      close();

    } catch (err) {
      console.log(err);
      alert("Error in saving task");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl font-bold mb-3">
          {editTask ? "Edit Task" : "Add Task"}
        </h2>

        <input
          type="text"
          placeholder="Task title*"
          className="border p-2 w-full mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Task description *"
          className="border p-2 w-full mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button onClick={close}>Cancel</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleSubmit}>
            {editTask ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
