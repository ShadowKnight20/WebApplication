import React from "react";

const ContactList = ({ contacts, updateContact, updateCallback }) => {
  const onDelete = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/delete_contact/${id}`,
        { method: "DELETE" }
      );
      if (response.status === 200) {
        updateCallback();
      } else {
        console.error("Failed to delete contact:", await response.json());
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ marginBottom: "20px" }}>Contact List</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {contacts.map((contact) => (
          <div
            key={contact.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <p style={{ marginBottom: "8px" }}>
              <strong>First Name:</strong> {contact.firstName}
            </p>
            <p style={{ marginBottom: "8px" }}>
              <strong>Last Name:</strong> {contact.lastName}
            </p>
            <p style={{ marginBottom: "16px" }}>
              <strong>Email:</strong> {contact.email}
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => updateContact(contact)}
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Update
              </button>
              <button
                onClick={() => onDelete(contact.id)}
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
