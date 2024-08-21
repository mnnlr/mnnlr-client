import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';

const CareerForm = () => {
  const [educationFields, setEducationFields] = useState([{ school: '', city: '', startDate: '', endDate: '', description: '' }]);
  const [internshipFields, setInternshipFields] = useState([{ company: '', role: '', startDate: '', endDate: '' }]);
  const [personalDetails, setPersonalDetails] = useState({ name: '', fathersName: '', email: '', phone: '', address: '', postCode: '', city: '' });
  const [skills, setSkills] = useState('');
  const [meetLink, setMeetLink] = useState('');

  const handleEducationChange = (index, event) => {
    const values = [...educationFields];
    values[index][event.target.name] = event.target.value;
    setEducationFields(values);
  };

  const handleAddEducation = () => {
    setEducationFields([...educationFields, { school: '', city: '', startDate: '', endDate: '', description: '' }]);
  };

  const handleRemoveEducation = (index) => {
    if (educationFields.length > 1) {
      const values = [...educationFields];
      values.splice(index, 1);
      setEducationFields(values);
    }
  };

  const handleInternshipChange = (index, event) => {
    const values = [...internshipFields];
    values[index][event.target.name] = event.target.value;
    setInternshipFields(values);
  };

  const handleAddInternship = () => {
    setInternshipFields([...internshipFields, { company: '', role: '', startDate: '', endDate: '' }]);
  };

  const handleRemoveInternship = (index) => {
    if (internshipFields.length > 1) {
      const values = [...internshipFields];
      values.splice(index, 1);
      setInternshipFields(values);
    }
  };

  const handlePersonalDetailsChange = (event) => {
    const { name, value } = event.target;
    setPersonalDetails({ ...personalDetails, [name]: value });
  };

  const handleSkillsChange = (event) => {
    setSkills(event.target.value);
  };

  
  const generateMeetLink = async () => {
    try {
      const response = await axios.get('http://localhost:5000/create-space');
      const meeturl = response.data;
      // console.log(meeturl);
      setMeetLink(meeturl); 
      // alert(`Meet link generated: ${meeturl}`);
    } catch (error) {
      console.error('Error generating Meet link', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !personalDetails.name ||
      !personalDetails.email ||
      !personalDetails.phone ||
      !personalDetails.address ||
      !personalDetails.postCode ||
      !personalDetails.city ||
      educationFields.some(field => !field.school || !field.city || !field.startDate || !field.endDate || !field.description) ||
      internshipFields.some(field => !field.company || !field.role || !field.startDate || !field.endDate) ||
      !skills
    ) {
      alert('Please fill in all the required fields before submitting.');
      return;
    }
  
    // If all required fields are filled, proceed with form submission
    const resumeData = {
      personalDetails,
      education: educationFields,
      internships: internshipFields,
      skills: skills.split(',').map(skill => skill.trim()),
    };
  
    try {
      await axios.post('http://localhost:5000/api/resumes', resumeData);
      alert('Resume submitted successfully!');
    } catch (error) {
      console.error('There was an error submitting the resume!', error);
    }
  
    await generateMeetLink();
  };


  return (
    <div className="max-w-4xl mx-auto p-6 bg-red shadow-md rounded-md mt-28">
      <h2 className="text-2xl font-bold mb-6 flex items-center">Career form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input type="text" name="name" value={personalDetails.name} onChange={handlePersonalDetailsChange} className="w-full px-4 py-2 border rounded-md" />
            </div>
        
            <div>
              <label className="block text-gray-700">Father's Name</label>
              <input type="text" name="fathersName" value={personalDetails.fathersName} onChange={handlePersonalDetailsChange} className="w-full px-4 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input type="email" name="email" value={personalDetails.email} onChange={handlePersonalDetailsChange} className="w-full px-4 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input type="tel" name="phone" value={personalDetails.phone} onChange={handlePersonalDetailsChange} className="w-full px-4 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-gray-700">Address</label>
              <input type="text" name="address" value={personalDetails.address} onChange={handlePersonalDetailsChange} className="w-full px-4 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-gray-700">Post Code</label>
              <input type="text" name="postCode" value={personalDetails.postCode} onChange={handlePersonalDetailsChange} className="w-full px-4 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-gray-700">City</label>
              <input type="text" name="city" value={personalDetails.city} onChange={handlePersonalDetailsChange} className="w-full px-4 py-2 border rounded-md" />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Education Details</h3>
          {educationFields.map((field, index) => (
            <div key={index} className="mb-4 p-4 border rounded-md relative">
              {educationFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveEducation(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700">School</label>
                  <input type="text" name="school" value={field.school} onChange={event => handleEducationChange(index, event)} className="w-full px-4 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-gray-700">City</label>
                  <input type="text" name="city" value={field.city} onChange={event => handleEducationChange(index, event)} className="w-full px-4 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-gray-700">Start Date</label>
                  <input type="date" name="startDate" value={field.startDate} onChange={event => handleEducationChange(index, event)} className="w-full px-4 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-gray-700">End Date</label>
                  <input type="date" name="endDate" value={field.endDate} onChange={event => handleEducationChange(index, event)} className="w-full px-4 py-2 border rounded-md" />
                </div>
              </div>
              <div>
                <label className="block text-gray-700">Description</label>
                <textarea name="description" value={field.description} onChange={event => handleEducationChange(index, event)} className="w-full px-4 py-2 border rounded-md"></textarea>
              </div>
            </div>
          ))}
          <button type="button" onClick={handleAddEducation} className="px-4 py-2 bg-blue-500 text-white rounded-md">Add Education</button>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Internship Details</h3>
          {internshipFields.map((field, index) => (
            <div key={index} className="mb-4 p-4 border rounded-md relative">
              {internshipFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveInternship(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700">Company Name</label>
                  <input type="text" name="company" value={field.company} onChange={event => handleInternshipChange(index, event)} className="w-full px-4 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-gray-700">Role</label>
                  <input type="text" name="role" value={field.role} onChange={event => handleInternshipChange(index, event)} className="w-full px-4 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-gray-700">Start Date</label>
                  <input type="date" name="startDate" value={field.startDate} onChange={event => handleInternshipChange(index, event)} className="w-full px-4 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-gray-700">End Date</label>
                  <input type="date" name="endDate" value={field.endDate} onChange={event => handleInternshipChange(index, event)} className="w-full px-4 py-2 border rounded-md" />
                </div>
              </div>
            </div>
          ))}
          <button type="button" onClick={handleAddInternship} className="px-4 py-2 bg-blue-500 text-white rounded-md">Add Internship</button>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Skills</h3>
          <input type="text" value={skills} onChange={handleSkillsChange} className="w-full px-4 py-2 border rounded-md" placeholder="Enter your skills" />
        </div>

        <div className="text-right">
          <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded-md" >Submit</button>
        </div>
      </form>
      {meetLink && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Generated Meeting Link</h3>
          <a href={meetLink} className='cursor-pointer+-'>{meetLink}</a>
        </div>
      )}
    </div>
  );
};

export default CareerForm;
