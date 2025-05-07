import React, { useState, useEffect } from "react";//test
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
import ImageSearch from "./ImageSearch";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({});
  const [activeTab, setActiveTab] = useState("contacts");

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  useEffect(() => {
    if (isAuthenticated) fetchContacts();
  }, [isAuthenticated]);

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts");
    const data = await response.json();
    setContacts(data.contacts);
    console.log(data.contacts);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentContact({});
  };

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true);
  };

  const openEditModal = (contact) => {
    if (isModalOpen) return;
    setCurrentContact(contact);
    setIsModalOpen(true);
  };

  const onUpdate = () => {
    closeModal();
    fetchContacts();
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setContacts([]); // Clear the contacts (if needed)
  };

  const handleRegister = () => {
    if (password !== passwordConfirmation) {
      alert("Passwords do not match!");
      return;
    }

    if (!username || !email || !password || !passwordConfirmation) {
      alert("All fields are required!");
      return;
    }

    // Registration logic: Here we can call an API to register the user
    // For now, we just simulate a successful registration
    alert("Registration successful!");

    // After registration, simulate logging in the user
    setIsAuthenticated(true);
  };

  const LoginForm = () => (
    <div className="auth-container">
      <h2>Login</h2>
      <input className="auth-input" placeholder="Username" />
      <input className="auth-input" placeholder="Password" type="password" />
      <button onClick={handleLogin} className="auth-button">Login</button>
      <p>
        Don’t have an account?{" "}
        <span className="auth-link" onClick={() => setIsRegistering(true)}>
          Register
        </span>
      </p>
    </div>
  );

  const RegisterForm = () => (
    <div className="auth-container">
      <h2>Register</h2>
      <input
        className="auth-input"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
      />
      <input
        className="auth-input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
      />
      <input
        className="auth-input"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <input
        className="auth-input"
        placeholder="Confirm Password"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        type="password"
      />
      <button onClick={handleRegister} className="auth-button">Register</button>
      <p>
        Already have an account?{" "}
        <span className="auth-link" onClick={() => setIsRegistering(false)}>
          Login
        </span>
      </p>
    </div>
  );

  if (!isAuthenticated) {
    return isRegistering ? <RegisterForm /> : <LoginForm />;
  }

  return (
    <>
      <div className="tab-buttons">
        <button
          className={`tab-button ${activeTab === "contacts" ? "active" : ""}`}
          onClick={() => setActiveTab("contacts")}
        >
          Contacts
        </button>
        <button
          className={`tab-button ${activeTab === "images" ? "active" : ""}`}
          onClick={() => setActiveTab("images")}
        >
          Image Search
        </button>
      </div>

      {/* Log Out Button in the Top Right Corner */}
      <button onClick={handleLogout} className="logout-button">
        Log Out
      </button>

      {activeTab === "contacts" && (
        <div className="contacts-tab">
          <ContactList
            contacts={contacts}
            updateContact={openEditModal}
            updateCallback={onUpdate}
          />
          <button onClick={openCreateModal}>Create New Contact</button>
          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={closeModal}>
                  &times;
                </span>
                <ContactForm
                  existingContact={currentContact}
                  updateCallback={onUpdate}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "images" && (
        <div className="images-tab">
          <ImageSearch />
        </div>
      )}
    </>
  );
}

export default App;
