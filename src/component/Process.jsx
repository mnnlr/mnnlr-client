
import React from 'react';
import ProcessCard from './ProcessCard';

const Process = () => {
    const processes = [
        { number: '01', title: 'Discover', description: 'Understand the client’s needs, goals, and challenges.' },
        { number: '02', title: 'Define', description: 'Establish detailed project requirements and create a roadmap.' },
        { number: '03', title: 'Design', description: 'Create the architecture and design of the solution.' },
        { number: '04', title: 'Develop', description: 'Build the software according to the design specifications.' },
        { number: '05', title: 'Deploy', description: 'Prepare the software for release and ensure it is ready for production.' },
        { number: '06', title: 'Deliver', description: 'Ensure the software is effectively used and maintained post-deployment.' },
    ];

    return (
        <div className="py-16" style={{ backgroundImage: 'linear-gradient(#f0f2fa, white)' }}>
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12 text-[#2C3E50]">Our 6-D Process</h2>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {processes.map((process, index) => (
                        <ProcessCard
                            key={index}
                            number={process.number}
                            title={process.title}
                            description={process.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Process;
