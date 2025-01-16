import React from 'react';

function ContactCard() {
  return (
    <div style={{ 
      textAlign: 'center', 
      width: '70%', /* Adjusted width */
      margin: '0 auto', 
      padding: '20px', 
      display: 'flex', 
      flexDirection: 'row', /* Changed to column for better alignment */
      alignItems: 'center',
      backgroundColor: "white",
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', /* Softened shadow */
      justifyContent: 'space-between',
      }}>
      <div style={{ marginBottom: '20px', textAlign : 'left' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '10px', color: 'rgb(104, 120, 214)' }}>Would you like to start a project with us?</h1>
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>Etiam erat lectus, finibus eget commodo quis, tincidunt eget leo. Nullam quis vulputate orci, ac accumsan quam. Morbi fringilla congue libero.</p>
      </div>
      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#555' , width : '50%'}}>
        12213231-12331
      </div>
    </div>
  );
}

export default ContactCard;
