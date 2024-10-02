import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import "./Notification.css";

const Notification = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the modal on component mount
    setIsVisible(true);
  }, []);

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
        import.meta.env.VITE_EMAIL_SERVICE,
        import.meta.env.VITE_EMAIL_TEMPLATE,
        formData,
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

    // Clear the form
    setFormData({
      name: "",
      email: "",
      message: "",
    });

    // Hide the modal after submission
    setIsVisible(false);
  };
<<<<<<< HEAD

  const closeModal = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null; // Don't render if not visible

=======
>>>>>>> 7489843f23c74980745edaec7b634b518beda99b
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="contact-form" onClick={(e) => e.stopPropagation()}>
        <h3>Get Real-Time Updates</h3>
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
          <button type="submit">Receive Weather Alerts</button>
        </form>
        <button className="close-button" onClick={closeModal}>
          ✖
        </button>
      </div>
    </div>
  );
};

export default Notification;
