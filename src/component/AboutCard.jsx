import React from 'react';

const AboutCard = ({ icon, title, description }) => {
    return (
        <div className="bg-white p-6 shadow-lg ">  
            <div style={{border:'4px solid #4d61d6',width:'50px'}}></div>  
            <h3 className="text-3xl text-[#242a56] text-start font-extrabold  mt-4">{title}</h3>
            <p className="mt-4 text-[#393a56] text-start pb-9 text-lg">{description}</p>
        </div>
    );
};

export default AboutCard;
