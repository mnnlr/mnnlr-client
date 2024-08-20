import React from "react";
import "../css/ContactForm.css";
import { FaPhone, FaEnvelope, FaClock } from "react-icons/fa"; // Import icons from react-icons library

const ContactUsForm = () => {
  return (
    <div className="form-container">
      <div className="get-in-touch">
        <h1>Get in touch</h1>
        <div>
          <h3>
            <FaPhone className="icon" style={{ marginRight: "10px" }} />
            Number
          </h3>
          <p>+91 8309560480</p>
        </div>
        <div>
          <h3>
            <FaEnvelope className="icon" style={{ marginRight: "10px" }} />
            Email
          </h3>
          <p>mnnlr.ceo@gmail.com</p>
        </div>
        <div>
          <h3>
            <FaClock className="icon" style={{ marginRight: "10px" }} />
            Business Hours
          </h3>
          <p>Monday — Friday 9am – 5pm</p>
          <p>Saturday — 10am – 3pm</p>
          <p>Sunday — Closed</p>
        </div>
      </div>
      <div className="form">
        <h1>Contact Us</h1>
        <form>
          <input type="text" id="name" name="name" placeholder="Name" />

          <input type="email" id="email" name="email" placeholder="Email" />

          <textarea
            id="message"
            name="message"
            placeholder="Message"
          ></textarea>

          <button type="submit" className="btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsForm;
