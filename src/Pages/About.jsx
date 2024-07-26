import AboutCard from "../component/AboutCard";
import AboutSlider from "../component/AboutSlider";
import ClientStats from "../component/ClientStatus";
import Process from "../component/Process";
import WHY_CHOOSE_US from "../component/Why_Choose_Us";
import WorkWithUs from "../component/WorkWithUs";

const About = () => {
    const services = [
        {
            
            title: 'Who Are We',
            description: 'Lorem ipsum dolor sit amet, consec tetur adipi scing elit. Ut elit tellus, luctus nec ullam corper mattis, pulvinar. Etiam erat lectus, finibus eget commodo quis, tinci dunt eget leo. Nullam quis vulpu tate orci, ac accum san quam.'
        },
        {
            icon: '📐',
            title: 'Our Mission',
            description: 'LUt elit tellus, luctus nec ullam corper mattis, pulvinar. Etiam erat lectus, finibus eget commodo quis, tinci dunt eget leo. Nullam quis vulpu tate orci, ac accum san quam. Morbi frin gilla congue libero.'
        },
        {

            title: 'What We Do',
            description: 'Lorem ipsum dolor sit amet, consec tetur adipi scing elit. Ut elit tellus, luctus nec ullam corper mattis, pulvinar. Etiam erat lectus, finibus eget commodo quis, tinci dunt eget leo. Nullam quis vulpu tate orci, ac accum san quam.'
        },
    ];
    return(
        <>
            <AboutSlider />
            <div className="relative top-[-14vh] w-full">
                <div className="container mx-auto px-10">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <AboutCard
                                key={index}
                                icon={service.icon}
                                title={service.title}
                                description={service.description}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <Process />
            <WHY_CHOOSE_US />
            <ClientStats />
            <div className="bg-blue-50 pt-10 pb-20">
                <WorkWithUs />
            </div>
        </>
    )
}

export default About;