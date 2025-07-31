// app/admin/services/page.tsx
"use client";
import { useState, useEffect } from "react";

// Define a type for our Service data
type Service = {
  _id: string;
  name: string;
  description: string;
  duration: number;
  price: string;
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for the Add/Edit form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: 30,
    price: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await fetch(
          "https://leadspilotai.onrender.com/api/admin/services/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch services");
        const data = await res.json();
        setServices(data);
      } catch (err) {
        setError("Could not load your services.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(
        "https://leadspilotai.onrender.com/api/admin/services/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (!res.ok) throw new Error("Failed to add service");
      const newService = await res.json();
      setServices((prev) => [...prev, newService]);
      setIsModalOpen(false); // Close modal on success
    } catch (err) {
      setError("Failed to save the service. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (serviceId: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      const token = localStorage.getItem("authToken");
      await fetch(
        `https://leadspilotai.onrender.com/api/admin/services/${serviceId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setServices((prev) => prev.filter((s) => s._id !== serviceId));
    } catch (err) {
      setError("Failed to delete the service.");
      console.error(err);
    }
  };

  if (loading)
    return <div className="loading-state">Loading Your Services...</div>;

  return (
    <div className="admin-services-page">
      <header className="dashboard-header">
        <h1>Manage Services</h1>
        <p>Add or edit the services Clyde can offer for booking.</p>
      </header>

      <div className="page-actions">
        <button
          className="connect-button"
          onClick={() => {
            setFormData({ name: "", description: "", duration: 30, price: "" });
            setIsModalOpen(true);
          }}
        >
          + Add New Service
        </button>
      </div>

      <div className="leads-table-container">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Duration (min)</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.length > 0 ? (
                services.map((service) => (
                  <tr key={service._id}>
                    <td>{service.name}</td>
                    <td>{service.duration}</td>
                    <td>{service.price}</td>
                    <td>
                      {/* Edit button functionality can be added later */}
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(service._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="empty-state">
                    You haven't added any services yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD/EDIT MODAL */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <form onSubmit={handleFormSubmit}>
              <h2 className="table-title">Add a New Service</h2>
              <div className="form-group">
                <label htmlFor="name">Service Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description (Optional)</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  rows={3}
                ></textarea>
              </div>
              <div className="form-group-inline">
                <div className="form-group">
                  <label htmlFor="duration">Duration (in minutes)</label>
                  <input
                    id="duration"
                    name="duration"
                    type="number"
                    value={formData.duration}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <input
                    id="price"
                    name="price"
                    type="text"
                    value={formData.price}
                    onChange={handleFormChange}
                    placeholder="e.g., $150"
                    required
                  />
                </div>
              </div>
              {error && <p className="form-error">{error}</p>}
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="connect-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
