/*import { useState, useEffect } from "react";
import ContactList from "./ContactList";
import "./App.css";
import ContactForm from "./ContactForm";
import ImageSearch from "./ImageSearch";
export default App;  // Ensure you're using 'export default' here
import React from 'react';

function App() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({});
  const [activeTab, setActiveTab] = useState('contacts');

  useEffect(() => {
    fetchContacts();
  }, []);
  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts");
    const data = await response.json();
    setContacts(data.contacts);
    console.log(data.contacts);
  };
  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentContact({})
  }
  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }
  const openEditModal = (contact) => {
    if (isModalOpen) return
    setCurrentContact(contact)
    setIsModalOpen(true)
  }
  const onUpdate = () => {
    closeModal()
    fetchContacts()
  }

  return (
    <>
      <div className="tab-buttons">
        <button 
          className={`tab-button ${activeTab === 'contacts' ? 'active' : ''}`}
          onClick={() => setActiveTab('contacts')}
        >
          Contacts
        </button>
        <button 
          className={`tab-button ${activeTab === 'images' ? 'active' : ''}`}
          onClick={() => setActiveTab('images')}
        >
          Image Search
        </button>
      </div>

      {activeTab === 'contacts' && (
        <div className="contacts-tab">
          <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate}/>
          <button onClick={openCreateModal}>Create New Contact</button>
          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <ContactForm existingContact={currentContact} updateCallback={onUpdate}/>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'images' && (
        <div className="images-tab">
          <ImageSearch />
        </div>
      )}
    </>
  );
  
}*/

import React, { useState, useEffect } from "react";
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
      <input className="auth-input" placeholder="Username" />
      <input className="auth-input" placeholder="Password" type="password" />
      <button onClick={handleLogin} className="auth-button">Register</button>
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
