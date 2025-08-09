// import React, { useState } from 'react';

// export default function Home() {
//   const [longUrl, setLongUrl] = useState('');
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const API = import.meta.env.VITE_API_BASE_URL || '';

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!longUrl) return alert('Enter a URL');

//     setLoading(true);
//     try {
//       const res = await fetch(`${API}/api/shorten`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ longUrl }),
//       });
//       const data = await res.json();
//       setLoading(false);
//       if (!res.ok) return alert(data.error || 'Error');
//       setResult(data);
//     } catch (err) {
//       setLoading(false);
//       alert('Network error');
//     }
//   };

//   const copy = async (text) => {
//     try {
//       await navigator.clipboard.writeText(text);
//       alert('Copied!');
//     } catch {
//       alert('Copy failed');
//     }
//   };

//   return (
//     <div className="page">
//       <header><h1>URL Shortener</h1></header>

//       <main className="card">
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Enter long URL (https://...)"
//             value={longUrl}
//             onChange={(e) => setLongUrl(e.target.value)}
//             className="input"
//           />
//           <button className="btn" type="submit" disabled={loading}>
//             {loading ? 'Shortening...' : 'Shorten'}
//           </button>
//         </form>

//         {result && (
//           <div className="result">
//             <p>Short URL:</p>
//             <a href={result.shortUrl} target="_blank" rel="noreferrer">{result.shortUrl}</a>
//             <div style={{ marginTop: 8 }}>
//               <button className="btn small" onClick={() => copy(result.shortUrl)}>Copy</button>
//               <button
//                 className="btn small"
//                 onClick={() => setResult(null)}
//                 style={{ marginLeft: 8 }}
//               >
//                 Clear
//               </button>
//             </div>
//           </div>
//         )}

//         <p style={{ marginTop: 16 }}>
//           Admin page: <a href="/admin">/admin</a>
//         </p>
//       </main>
//     </div>
//   );
// }
import React, { useState } from "react";

export default function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_API_BASE_URL || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!longUrl) return alert("Enter a URL");

    setLoading(true);
    try {
      const res = await fetch(`${API}/api/shorten`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ longUrl }),
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) return alert(data.error || "Error");
      setResult(data);
    } catch (err) {
      setLoading(false);
      alert("Network error");
    }
  };

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied!");
    } catch {
      alert("Copy failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 px-4 py-10">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900">URL Shortener</h1>
      </header>

      {/* Card */}
      <main className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            type="text"
            placeholder="Enter URL (https://...)"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Shortening..." : "Shorten"}
          </button>
        </form>

        {/* Result */}
        {result && (
          <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <p className="text-sm text-gray-600 font-semibold ">Short URL</p>
            <a
              href={result.shortUrl}
              target="_blank"
              rel="noreferrer"
              className="block text-blue-500 break-all font-medium hover:underline mt-1"
            >
              {result.shortUrl}
            </a>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => copy(result.shortUrl)}
                className="px-3 py-1 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800"
              >
                Copy
              </button>
              <button
                onClick={() => setResult(null)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Admin link */}
        <p className="mt-6 text-lg text-gray-600 font-semibold ">
          Admin page:{" "}
          <a
            href="/admin"
            className="text-blue-500 hover:underline font-normal "
          >
            /admin
          </a>
        </p>
      </main>
    </div>
  );
}
