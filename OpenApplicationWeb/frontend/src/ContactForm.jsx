import { useState } from "react";

const ContactForm = ({ existingContact = {}, updateCallback }) => {
  const [firstName, setFirstName] = useState(existingContact.firstName || "");
  const [lastName, setLastName] = useState(existingContact.lastName || "");
  const [email, setEmail] = useState(existingContact.email || "");
  const [password, setPassword] = useState("");

  const updating = Object.entries(existingContact).length !== 0;

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = { firstName, lastName, email, password };
    const url =
      "http://127.0.0.1:5000/" +
      (updating ? `update_contact/${existingContact.id}` : "create_contact");

    const response = await fetch(url, {
      method: updating ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.status !== 201 && response.status !== 200) {
      const message = await response.json();
      alert(message.message);
    } else {
      updateCallback();
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{
        maxWidth: "400px",
        margin: "20px auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        {updating ? "Update Contact" : "Create Contact"}
      </h2>

      {[
        { label: "First Name", id: "firstName", value: firstName, setter: setFirstName },
        { label: "Last Name", id: "lastName", value: lastName, setter: setLastName },
        { label: "Email", id: "email", value: email, setter: setEmail },
        { label: "Password", id: "password", value: password, setter: setPassword },
      ].map(({ label, id, value, setter }) => (
        <div style={{ marginBottom: "15px" }} key={id}>
          <label
            htmlFor={id}
            style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
          >
            {label}
          </label>
          <input
            type="text"
            id={id}
            value={value}
            onChange={(e) => setter(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />
        </div>
      ))}

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: updating ? "#007bff" : "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
      >
        {updating ? "Update Contact" : "Create Contact"}
      </button>
    </form>
  );
};

export default ContactForm;
