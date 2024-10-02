import React, { useState } from "react";
import emailjs from "emailjs-com";

const Notification = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send email
    emailjs
      .send(
        // EmailJS service ID
        import.meta.env.VITE_EMAIL_SERVICE,
        // EmailJS template ID
        import.meta.env.VITE_EMAIL_TEMPLATE,
        formData,
        // EmailJS user ID
        import.meta.env.VITE_EMAIL_USER
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Message sent successfully!");
        },
        (error) => {
          console.log("FAILED...", error);
          alert("Failed to send the email");
        }
      );

    //   Clear the form
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };
  return (
    <div className="contact-form">
      <h3>Enable Notifications</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Test Notifications</button>
      </form>
    </div>
  );
};

export default Notification;
