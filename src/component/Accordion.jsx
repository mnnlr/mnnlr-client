import { useState } from "react";
import AccordionItem from "./AccorditionItem";

const Accordion = () => {

    const [activeIndex, setActiveIndex] = useState(null);

    const items = [
        { title: 'Best Quality Designs', content: "We are offers stunning and innovative design solutions to elevate your brand's visual presence." },
        { title: '24x7 Live Support', content: '24x7 Live Support provides round-the-clock assistance to ensure your needs are met anytime, anywhere.' },
        { title: 'Result Oriented Projects', content: 'Result Oriented Projects deliver measurable outcomes that drive success and achieve your objectives' },
        { title: 'Award Winning Support Team', content: 'Our Award-Winning Support Team delivers exceptional service that sets industry standards and ensures your satisfaction.' },
        { title: 'Best ROI Techniques', content: 'Best ROI Techniques utilize strategic methods to maximize returns on investment and enhance profitability.' },
        { title: 'Experienced Professionals', content: 'Experienced Professionals bring expert knowledge and skills to deliver high-quality results and solutions.' },
    ];

    const handleClick = index => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <div className="bg-white shadow-lg overflow-hidden mx-10">
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    title={item.title}
                    content={item.content}
                    isActive={index === activeIndex}
                    onClick={() => handleClick(index)}
                />
            ))}
        </div>
    );
};

export default Accordion;