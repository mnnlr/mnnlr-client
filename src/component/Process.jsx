
import React from 'react';
import ProcessCard from './ProcessCard';

const Process = () => {
    const processes = [
        { number: '01', title: 'Discover', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar.' },
        { number: '02', title: 'Define', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar.' },
        { number: '03', title: 'Design', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar.' },
        { number: '04', title: 'Develop', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar.' },
        { number: '05', title: 'Deploy', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar.' },
        { number: '06', title: 'Deliver', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar.' },
    ];

    return (
        <div className="py-16" style={{ backgroundImage: 'linear-gradient(#f0f2fa, white)' }}>
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12">Our 6-D Process</h2>
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
