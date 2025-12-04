import { useEffect, useState, useCallback } from "react";
import API from "../api";
import TaskModal from "../components/TaskModal";

export default function Dashboard({ logout }) {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const loadTasks = useCallback(async () => {
    const res = await API.get(`/tasks?search=${search}&page=${page}&limit=5`);
    setTasks(res.data.tasks);
    setTotalPages(res.data.totalPages);
  }, [search, page]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-semibold">Task Manager</h1>

        <div className="flex items-center gap-6">
          <a href="/dashboard" className="hover:text-blue-300 transition">
            Dashboard
          </a>
          <a href="/logs" className="hover:text-blue-300 transition">
            Logs
          </a>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-medium transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* HEADER */}
      <div className="px-6 pt-6">
        <h2 className="text-3xl font-bold text-gray-800">Tasks</h2>
        <p className="text-gray-600 mt-1">Manage all your tasks with ease</p>
      </div>

      {/* SEARCH + ADD */}
      <div className="px-6 mt-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search tasks..."
          className="border border-gray-300 p-3 rounded w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={() => {
            setEditTask(null);
            setOpenModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded transition shadow-md"
        >
          + Add Task
        </button>

        <a
          href="/logs"
          className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-3 rounded transition shadow-md"
        >
          Audit Logs
        </a>
      </div>

      {/* TABLE */}
      <div className="px-6 mt-6">
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="border p-3">ID</th>
                <th className="border p-3">Title</th>
                <th className="border p-3">Description</th>
                <th className="border p-3">Created</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((t) => (
                <tr
                  key={t._id}
                  className="hover:bg-gray-100 transition cursor-pointer"
                >
                  <td className="border p-3 text-sm">{t._id}</td>
                  <td className="border p-3 font-medium">{t.title}</td>
                  <td className="border p-3">{t.description}</td>
                  <td className="border p-3 text-gray-600">
                    {new Date(t.createdAt).toLocaleString()}
                  </td>

                  <td className="border p-3">
                    <button
                      onClick={() => {
                        setEditTask(t);
                        setOpenModal(true);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={async () => {
                        await API.delete(`/tasks/${t._id}`);
                        loadTasks();
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {tasks.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-600 text-lg"
                  >
                    No tasks found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="mt-6 flex gap-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 border rounded shadow-sm transition ${
                page === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {openModal && (
        <TaskModal
          close={() => setOpenModal(false)}
          refresh={loadTasks}
          editTask={editTask}
        />
      )}
    </div>
  );
}
