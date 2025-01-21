import { useState, useRef } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../css/DashboardCss/Holiday.css';
import { IoCloseCircleSharp } from "react-icons/io5";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const holidayData = {
  "2025-01-01": "New Year's Day",
  "2025-01-14": "Makar Sankranti",
  "2025-01-15": "Pongal",
  "2025-01-26": "Republic Day",
  "2025-03-01": "Maha Shivaratri",
  "2025-03-03": "Holi",
  "2025-03-21": "Ugadi",
  "2025-03-30": "Ram Navami",
  "2025-04-06": "Mahavir Jayanti",
  "2025-04-18": "Good Friday",
  "2025-04-25": "Eid al-Fitr",
  "2025-05-19": "Eid al-Fitr (Second Day)",
  "2025-06-01": "No Holiday",
  "2025-06-05": "Ganga Dussehra",
  "2025-07-06": "Rath Yatra",
  "2025-08-15": "Independence Day",
  "2025-08-27": "Onam",
  "2025-09-05": "Teachers' Day",
  "2025-09-30": "Gandhi Jayanti",
  "2025-10-02": "Mahatma Gandhi Jayanti",
  "2025-10-21": "Dussehra",
  "2025-10-23": "Eid al-Adha",
  "2025-11-01": "No Holiday",
  "2025-11-04": "Diwali",
  "2025-11-11": "Bhai Dooj",
  "2025-12-25": "Christmas Day",
  "2025-12-31": "New Year's Eve",
  "2025-07-14": "Bakrid (Eid al-Adha)",
  "2025-11-14": "Govardhan Puja",
  "2025-12-12": "Gita Jayanti",
  "2025-12-14": "Hanukkah"
};


function Holiday() {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalHolidayName, setModalHolidayName] = useState('');
  const [modalDateString, setModalDateString] = useState('');
  const calendarRef = useRef(null);

  const handleCardClick = (month) => {
    setSelectedMonth(months.indexOf(month));
    setTimeout(() => {
      calendarRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const isHoliday = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    return holidayData.hasOwnProperty(dateString);
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month' && isHoliday(date)) {
      return 'holiday-date';
    }
    return null;
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month' && isHoliday(date)) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;
      const holidayName = holidayData[dateString];

      return (
        <div
          className="holiday-indicator"
          title={holidayName}
          onMouseEnter={() => {
            setModalHolidayName(holidayName);
            setModalDateString(dateString);
            setShowModal(true);
          }}
        >
          {/* Holiday indicator content */}
        </div>
      );
    }
    return null;
  };

  const Card = ({ title, amount, gradient, onClick }) => (
    <div
      className={`rounded-xl relative p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 shadow-lg ${gradient}`}
      onClick={onClick}
    >
      <div className="text-white">
        <p className="text-lg font-semibold mb-2">{title}</p>
        <p className="text-4xl font-bold">{amount}</p>
      </div>
      <div className="absolute bottom-2 right-2 text-white opacity-30 text-5xl font-bold">
        {amount}
      </div>
    </div>
  );

  const Modal = ({ isOpen, onClose, holidayName, dateString }) => {
    return (
      <div
        className={`fixed top-0 left-0 w-full h-full flex justify-center items-center ${isOpen ? 'block' : 'hidden'}`}
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          <IoCloseCircleSharp
            onClick={onClose}
            style={{ float: 'right', cursor: 'pointer', height: '20px', width: '20px' }}
          />
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">{holidayName}</h2>
          <p className="text-lg font-bold text-center text-gray-600">{dateString}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="dashbord-container mx-auto p-8 rounded-xl bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Holiday Calendar</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {months.map((month, index) => (
          <Card
            key={month}
            title={month}
            amount={Object.entries(holidayData).filter(([date]) =>
              date.startsWith(`2025-${(index + 1).toString().padStart(2, '0')}`)
            ).length}
            gradient={`bg-gradient-to-br ${getGradient(index)}`}
            onClick={() => handleCardClick(month)}
          />
        ))}
      </div>

      {selectedMonth !== null && (
        <div ref={calendarRef} className="mt-12 bg-white rounded-xl shadow-lg p-6">
         
          {/* Ensure we pass the correct date for the year 2025 */}
          <Calendar
            value={new Date(2025, selectedMonth, 1)} 
            tileClassName={tileClassName}
            tileContent={tileContent}
            className="mx-auto custom-calendar"
          />
          {showModal && (
            <Modal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              holidayName={modalHolidayName}
              dateString={modalDateString}
            />
          )}
        </div>
      )}
    </div>
  );
}

function getGradient(index) {
  const gradients = [
    'from-pink-500 to-rose-500',
    'from-orange-400 to-pink-600',
    'from-green-400 to-blue-500',
    'from-purple-500 to-indigo-500',
    'from-yellow-400 to-orange-500',
    'from-teal-400 to-blue-500',
    'from-red-500 to-pink-500',
    'from-blue-400 to-indigo-500',
    'from-yellow-200 to-yellow-500',
    'from-green-500 to-teal-500',
    'from-purple-400 to-pink-500',
    'from-blue-500 to-indigo-600'
  ];
  return gradients[index % gradients.length];
}

export default Holiday;
