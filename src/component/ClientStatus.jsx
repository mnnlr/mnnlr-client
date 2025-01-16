import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup'; // Import react-countup for easy number animations

const ClientStats = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    clients: 0,
    projects: 0,
    accolades: 0,
    linesOfCode: '0K+'
  });

  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          
          setStats({
            clients: 87,
            projects: 150,
            accolades: 28,
            linesOfCode: '56K+' 
          });

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect(); 
  }, []);

  return (
    <div ref={statsRef} className="bg-[#eff2ff] p-8 rounded-lg shadow-lg text-center">
      <div className="flex flex-wrap justify-evenly w-full">
        <div className=" items-center w-full md:w-1/2 lg:w-auto mb-4 md:mb-0 md:mr-4 m-4">
          <div className="text-4xl font-semibold mb-2 text-[#6878d6]">Our Achievements</div>
          <div className="text-lg p-3">We take pride in delivering quality and <br/>satisfaction to our clients.</div>
        </div>
        <div onClick={()=>navigate('/satisfied-clients')} className="flex justify-center cursor-pointer items-center w-full md:w-1/2 lg:w-auto mb-4 md:mb-0 md:mr-4">
          <div className="text-4xl font-bold mb-2 text-[#6878d6]">
            <CountUp start={0} end={stats.clients} duration={2.5} />
          </div>
          <div className="text-sm  font-bold p-3">Satisfied <br/> Clients</div>
        </div>
        <div className="flex justify-center items-center w-full md:w-1/2 lg:w-auto mb-4 md:mb-0 md:mr-4">
          <div className="text-4xl font-bold mb-2 text-[#6878d6]">
            <CountUp start={0} end={stats.projects} duration={2.5} />
          </div>
          <div className="text-sm  font-bold p-3">Projects <br/> Completed</div>
        </div>
        <div className="flex justify-center items-center w-full md:w-1/2 lg:w-auto mb-4 md:mb-0 md:mr-4">
          <div className="text-4xl font-bold mb-2 text-[#6878d6]">
            
          </div>
          <div className="text-4xl font-bold mb-2 text-[#6878d6]">
            <CountUp start={0} end={stats.projects} duration={2.5} />
          </div>
          <div className="text-sm  font-bold p-3">Accolades<br/> Earned</div>
          
        </div>
        <div className="flex justify-center items-center w-full md:w-1/2 lg:w-auto mb-4 md:mb-0 md:mr-4">
          <div className="text-4xl font-bold mb-2 text-[#6878d6]">
            <CountUp start={0} end={parseInt(stats.linesOfCode)} duration={2.5} suffix="K+" />
          </div>
          <div className="text-sm font-bold p-3">Lines <br/>of Code</div>
        </div>
      </div>
    </div>
  );
};

export default ClientStats;
