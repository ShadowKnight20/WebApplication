import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    // Add login logic here (for now, we just log the data)
    console.log("Logging in with", { email, password });
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
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>

      {/* Email Field */}
      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor="email"
          style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
        >
          Email
        </label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />
      </div>

      {/* Password Field */}
      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor="password"
          style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />
      </div>

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
