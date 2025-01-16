import React from "react";
import "../css/ContactForm.css";
import { FaPhone, FaEnvelope, FaClock } from "react-icons/fa"; // Import icons from react-icons library

import defaultAxios from '../customAxios/authAxios';

const ContactUsForm = () => {

  const [contact_us_data, setContactUsData] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {

    e.preventDefault();

    const { name, value } = e.target;

    setContactUsData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });

  };

  const handleSubmit = async(e) => {
    try {

      e.preventDefault();
      
      const { name, email, message } = contact_us_data;

      if(!name || !email || !message) {
        return alert("Please fill all the fields");
      }

      const { data,status } = await defaultAxios.post("/api/v1/contact", contact_us_data);

      if(status === 200) {
        alert(data.message);
        setContactUsData({
          name: "",
          email: "",
          message: "",
        });
      }

    } catch (error) {

      alert(error.response.data.message);
    
    }
  
  };

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
        <form onSubmit={handleSubmit}>
          <input onChange={handleChange} type="text" id="name" name="name" value={contact_us_data?.name} placeholder="Name" />

          <input onChange={handleChange} type="email" id="email" name="email" value={contact_us_data?.email} placeholder="Email" />

          <textarea
            id="message"
            name="message"
            value={contact_us_data?.message}
            onChange={handleChange}
            placeholder="Message"
          ></textarea>

          <button type="submit" className="btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsForm;
