import Contactusform from "../component/ContactUsForm";
import HeroSection from "../component/HeroSection"
import WorkWithUs from "../component/WorkWithUs";

const ContactUs = () => {
    return (
        <div style={{backgroundImage:'linear'}}>
            <HeroSection />
            <Contactusform />
            <div className="pt-10 pb-20">
                <WorkWithUs />
            </div>
        </div>
    )
}

export default ContactUs;