import React, { useState } from "react";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [urls, setUrls] = useState(null);
  const [loading, setLoading] = useState(false);
  const API = import.meta.env.VITE_API_BASE_URL || "";

  const loginAndFetch = async () => {
    if (!password) return alert("Enter admin password");
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/admin/urls`, {
        headers: { "x-admin-secret": password },
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) return alert(data.error || "Unauthorized");
      setUrls(data);
    } catch (err) {
      setLoading(false);
      alert("Network error");
    }
  };

  const doDelete = async (shortCode) => {
    if (!confirm(`Delete ${shortCode}?`)) return;
    try {
      await fetch(`${API}/api/admin/urls/${shortCode}`, {
        method: "DELETE",
        headers: { "x-admin-secret": password },
      });
      setUrls(urls.filter((u) => u.shortCode !== shortCode));
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 px-4 py-10">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900">Admin Page</h1>
      </header>

      <main className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl">
        {!urls ? (
          <>
            <p className="text-gray-600">
              Enter admin password to view all shortened URLs.
            </p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-3 w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="mt-3">
              <button
                onClick={loginAndFetch}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 disabled:opacity-50"
              >
                {loading ? "Loading..." : "Login & Fetch"}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-200 mt-4">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 border-b border-gray-200 text-left">
                      Short
                    </th>
                    <th className="px-3 py-2 border-b border-gray-200 text-left">
                      Original URL
                    </th>
                    <th className="px-3 py-2 border-b border-gray-200 text-left">
                      Clicks
                    </th>
                    <th className="px-3 py-2 border-b border-gray-200 text-left">
                      Created
                    </th>
                    {/* <th className="px-3 py-2 border-b border-gray-200 text-left">Last</th> */}
                    <th className="px-3 py-2 border-b border-gray-200 text-left">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {urls.map((u) => (
                    <tr key={u._id} className="hover:bg-gray-50">
                      <td className="px-3 py-2 border-b border-gray-200">
                        <a
                          href={`http://localhost:5000/${u.shortCode}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {u.shortCode}
                        </a>
                      </td>
                      <td className="px-3 py-2 border-b border-gray-200 max-w-xs truncate">
                        {u.longUrl}
                      </td>
                      <td className="px-3 py-2 border-b border-gray-200">
                        {u.clicks || 0}
                      </td>
                      <td className="px-3 py-2 border-b border-gray-200">
                        {new Date(u.createdAt).toLocaleString()}
                      </td>
                      {/* <td className="px-3 py-2 border-b border-gray-200">
                        {u.lastVisited ? new Date(u.lastVisited).toLocaleString() : '-'}
                      </td> */}
                      <td className="px-3 py-2 border-b border-gray-200">
                        <button
                          onClick={() => doDelete(u.shortCode)}
                          className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4">
              <button
                onClick={() => setUrls(null)}
                className="px-4 py-2 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
