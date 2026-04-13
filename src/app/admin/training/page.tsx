// app/admin/training/page.tsx
"use client";
import { useState, useEffect } from "react";

// Define a type for our training data
type TrainingItem = {
  _id: string;
  question: string;
  answer: string;
};

export default function TrainingPage() {
  const [data, setData] = useState<TrainingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // --- Refactored to use fetch ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await fetch(
          "https://leadspilotai.onrender.com/api/admin/training/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) throw new Error("Server responded with an error");
        const trainingData = await res.json();
        setData(trainingData);
      } catch (err) {
        console.error("failed to load: ", err);
        setError("Failed to load training data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- Refactored to use fetch ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(
        "https://leadspilotai.onrender.com/api/admin/training/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ question: newQuestion, answer: newAnswer }),
        }
      );
      if (!res.ok) throw new Error("Server responded with an error");
      const newEntry = await res.json();
      setData((prevData) => [...prevData, newEntry]);
      setNewQuestion("");
      setNewAnswer("");
    } catch (err) {
      console.error("failed to add: ", err);
      setError("Failed to add new entry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;
    setIsUploading(true);
    setUploadError(null);
    setUploadResult(null);
    try {
      const text = await uploadFile.text();
      const parsed = JSON.parse(text);
      if (!Array.isArray(parsed)) throw new Error("File must contain a JSON array.");
      const token = localStorage.getItem("authToken");
      const res = await fetch(
        "https://leadspilotai.onrender.com/api/admin/training/upload",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(parsed),
        }
      );
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Upload failed.");
      setData((prev) => [...prev, ...result.items]);
      setUploadResult(`Successfully added ${result.inserted} entries.`);
      setUploadFile(null);
      (e.target as HTMLFormElement).reset();
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  // --- Refactored to use fetch ---
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(
        `https://leadspilotai.onrender.com/api/admin/training/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Server responded with an error");
      setData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (err) {
      console.error("failed to delete: ", err);
      setError("Failed to delete entry.");
    }
  };

  if (loading)
    return <div className="loading-state">Loading Training Data...</div>;

  // The JSX below remains the same
  return (
    <div className="admin-training-page">
      <header className="dashboard-header">
        <h1>Train Clyde</h1>
        <p>
          Add specific questions and answers to give Clyde high-priority
          knowledge.
        </p>
      </header>

      <div className="training-form-container">
        <h2 className="table-title">Add New Q&A</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="new-question">Question</label>
            <input
              id="new-question"
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="e.g., What are your business hours?"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="new-answer">Answer</label>
            <textarea
              id="new-answer"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="e.g., We are open Monday to Friday, 9 AM to 5 PM."
              required
              rows={4}
            ></textarea>
          </div>
          {error && <p className="form-error">{error}</p>}
          <button
            type="submit"
            className="connect-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add to Knowledge Base"}
          </button>
        </form>
      </div>

      <div className="training-form-container">
        <h2 className="table-title">Bulk Upload via JSON</h2>
        <p style={{ marginBottom: "1rem", color: "var(--text-secondary, #666)", fontSize: "0.9rem" }}>
          Upload a <code>.json</code> file containing an array of{" "}
          <code>{`[{ "question": "...", "answer": "..." }]`}</code> objects.
        </p>
        <form onSubmit={handleUpload}>
          <div className="form-group">
            <label htmlFor="faq-upload">JSON File</label>
            <input
              id="faq-upload"
              type="file"
              accept=".json,application/json"
              onChange={(e) => {
                setUploadFile(e.target.files?.[0] ?? null);
                setUploadResult(null);
                setUploadError(null);
              }}
              required
            />
          </div>
          {uploadError && <p className="form-error">{uploadError}</p>}
          {uploadResult && (
            <p style={{ color: "green", marginBottom: "0.75rem" }}>{uploadResult}</p>
          )}
          <button
            type="submit"
            className="connect-button"
            disabled={isUploading || !uploadFile}
          >
            {isUploading ? "Uploading..." : "Upload JSON"}
          </button>
        </form>
      </div>

      <div className="leads-table-container">
        <h2 className="table-title">Custom Knowledge Base</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Question</th>
                <th>Answer</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item._id}>
                    <td>{item.question}</td>
                    <td>{item.answer}</td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="empty-state">
                    No custom training data added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
