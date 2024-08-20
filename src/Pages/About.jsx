
import { lazy, Suspense } from "react";
import AboutCard from "../component/AboutCard";
import Process from "../component/Process";
import WHY_CHOOSE_US from "../component/Why_Choose_Us";
import WorkWithUs from "../component/WorkWithUs";



const AboutSlider = lazy(()=>  import('../component/AboutSlider'));

const About = () => {
    const services = [
        {
            
            title: 'Who Are We',
            description: 'At Man Need New Life Resources, we are a dedicated team of innovators and technologists with a passion for creating cutting-edge software solutions. As a product-based IT company, our mission is to deliver exceptional digital products that enhance business operations and provide a superior user experience.'
        },
        {
            icon: '📐',
            title: 'Our Mission',
            description: 'Our mission is to develop high-quality, reliable, and scalable software products that meet the diverse needs of our clients. We strive to continuously improve our offerings, leveraging the latest technologies and industry best practices to stay ahead in the competitive market.'
        },
        {

            title: 'What We Do',
            description: 'At Man Need New Life Resources, we specialize in developing innovative software solutions that empower businesses to achieve their goals. Our expertise spans across various domains, enabling us to deliver comprehensive and effective products tailored to meet the unique needs of our clients.'
        },
    ];
    return(
        <>
        <Suspense fallback={<div>Loading...</div>}>
        <AboutSlider />
        </Suspense>
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
            {/* <ClientStats /> */}
            <div className="bg-blue-50 pt-10 pb-20">
                <WorkWithUs />
            </div>
        </>
    )
}

export default About;