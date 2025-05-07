import { useState } from "react";
import ContactForm from "./ContactForm"; // Registration Form
import LoginForm from "./LoginForm.jsx";     // Login Form

const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(false); // State to toggle between login and register

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>
        {isRegistering ? "Create an Account" : "Login to Your Account"}
      </h1>

      {/* Show ContactForm for Registration, LoginForm for Login */}
      {isRegistering ? (
        <ContactForm updateCallback={() => console.log("User Registered")} />
      ) : (
        <LoginForm />
      )}

      {/* Toggle Button */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={toggleForm}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {isRegistering
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
