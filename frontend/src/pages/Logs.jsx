import { useEffect, useState } from "react";
import API from "../api";

export default function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    API.get(`/logs`).then((res) => setLogs(res.data));
  }, []);

  return (
    <div className="p-6">
      
      <h1 className="text-2xl font-bold mb-4">Audit Logs</h1>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Timestamp</th>
            <th className="border p-2">Action</th>
            <th className="border p-2">Task ID</th>
            <th className="border p-2">Updated Content</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td className="border p-2">
                {new Date(log.timestamp).toLocaleString()}
              </td>

              <td
                className={`border p-2 font-bold ${
                  log.action === "Create Task"
                    ? "text-green-600"
                    : log.action === "Update Task"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {log.action}
              </td>

              <td className="border p-2">{log.taskId}</td>

              <td className="border p-2">
                <pre>{JSON.stringify(log.updatedContent, null, 2)}</pre>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
