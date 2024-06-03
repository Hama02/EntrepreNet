import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactMe() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    topic: '',
    message: '',
    checkbox: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.checkbox) {
      alert('Please accept the terms');
      return;
    }

    const templateParams = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone_number: formData.phoneNumber,
      topic: formData.topic,
      message: formData.message,
    };

    const loadingToastId = toast.loading('Sending message...');

    emailjs
      .send('service_sobbj6s', 'template_ej1hkh9', templateParams, 'zSFEI2-o4meJRZxVC')
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          toast.update(loadingToastId, {
            render: 'Message sent successfully!',
            type: 'success',
            isLoading: false,
            autoClose: 5000,
            closeOnClick: true,
            draggable: true,
          });
        },
        (error) => {
          console.log('FAILED...', error);
          toast.update(loadingToastId, {
            render: 'Failed to send message, please try again.',
            type: 'error',
            isLoading: false,
            autoClose: 5000,
            closeOnClick: true,
            draggable: true,
          });
        }
      );
  };

  return (
    <section id="Contact" className="contact--section">
      <div className="about--section--img">
        <img src="./img/contact us image.jpg" alt="Contact Us" />
      </div>

      <div>
        <p className="sub--title space-between">Get In Touch</p>

        <h2 className="text-lg">Get in touch with our creator-friendly team!</h2>
      </div>
      <form className="contact--form--container" onSubmit={handleSubmit}>
        <div className="container">
          <label htmlFor="first-name" className="contact--label">
            <span className="text-md">First Name</span>
            <input
              type="text"
              className="contact--input text-md"
              name="firstName"
              id="first-name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="last-name" className="contact--label">
            <span className="text-md">Last Name</span>
            <input
              type="text"
              className="contact--input text-md"
              name="lastName"
              id="last-name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="email" className="contact--label">
            <span className="text-md">Email</span>
            <input
              type="email"
              className="contact--input text-md"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="phone-number" className="contact--label">
            <span className="text-md">Phone Number</span>
            <input
              type="number"
              className="contact--input text-md"
              name="phoneNumber"
              id="phone-number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <label htmlFor="choose-topic" className="contact--label">
          <span className="text-md">Choose a topic</span>
          <select
            id="choose-topic"
            name="topic"
            className="contact--input text-md"
            value={formData.topic}
            onChange={handleChange}
            required
          >
            <option value="">Select One...</option>
            <option value="Inquiry">Inquiry</option>
            <option value="Assistance">Assistance</option>
            <option value="Collaboration">Collaboration</option>
          </select>
        </label>
        <label htmlFor="message" className="contact--label">
          <span className="text-md">Message</span>
          <textarea
            className="contact--input text-md"
            id="message"
            name="message"
            rows="8"
            placeholder="Type your message..."
            value={formData.message}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="checkbox" className="checkbox--label">
          <input
            type="checkbox"
            name="checkbox"
            id="checkbox"
            checked={formData.checkbox}
            onChange={handleChange}
            required
          />
          <span className="text-sm">I accept the terms</span>
        </label>
        <div>
          <button type="submit" className="btn btn-primary contact--form--btn">
            Submit
          </button>
        </div>
      </form>
      <ToastContainer theme="dark" />
    </section>
  );
}
