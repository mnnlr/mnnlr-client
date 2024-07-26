import { useState } from "react";
import AccordionItem from "./AccorditionItem";

const Accordion = () => {

    const [activeIndex, setActiveIndex] = useState(null);

    const items = [
        { title: 'Best Quality Designs', content: 'Sed Fringilla Mauris Sit Amet Nibh. Donec Sodales Sagittis Magna. Sed Consequat, Leo Eget Bibendum, Sodales, Augue Velit Cursus Nunc, Quis Gravida Magna Mi A Libero.' },
        { title: '24x7 Live Support', content: 'Sed Fringilla Mauris Sit Amet Nibh. Donec Sodales Sagittis Magna. Sed Consequat, Leo Eget Bibendum, Sodales, Augue Velit Cursus Nunc, Quis Gravida Magna Mi A Libero.' },
        { title: 'Result Oriented Projects', content: 'Sed Fringilla Mauris Sit Amet Nibh. Donec Sodales Sagittis Magna. Sed Consequat, Leo Eget Bibendum, Sodales, Augue Velit Cursus Nunc, Quis Gravida Magna Mi A Libero.' },
        { title: 'Award Winning Support Team', content: 'Sed Fringilla Mauris Sit Amet Nibh. Donec Sodales Sagittis Magna. Sed Consequat, Leo Eget Bibendum, Sodales, Augue Velit Cursus Nunc, Quis Gravida Magna Mi A Libero.' },
        { title: 'Best ROI Techniques', content: 'Sed Fringilla Mauris Sit Amet Nibh. Donec Sodales Sagittis Magna. Sed Consequat, Leo Eget Bibendum, Sodales, Augue Velit Cursus Nunc, Quis Gravida Magna Mi A Libero.' },
        { title: 'Experienced Professionals', content: 'Sed Fringilla Mauris Sit Amet Nibh. Donec Sodales Sagittis Magna. Sed Consequat, Leo Eget Bibendum, Sodales, Augue Velit Cursus Nunc, Quis Gravida Magna Mi A Libero.' },
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