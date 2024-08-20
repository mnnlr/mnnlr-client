import Accordion from "./Accordion";
import img from "../assets/why-choose-us.jpg";

const WHY_CHOOSE_US = () => {
  return (
    <div className="flex flex-wrap w-full bg-blue-50 justify-center items-stretch">
      <div className="relative w-full md:w-1/2">
        <img
          src={img}
          alt="Description"
          className="w-full h-full object-cover rounded shadow-lg"
        />
        <div className="absolute inset-0 bg-black/65 opacity-80 rounded"></div>
      </div>
      <div className="w-full  lg:w-1/2 md:w-1/2 p-4">
        <div className="text-center py-8">
          <h1 className="text-3xl font-semibold mb-4">Why Choose Us?</h1>
          <p className="text-lg px-4 text-start">
            <b>Expertise in MERN Stack: </b> Deep understanding and extensive
            experience with the MERN stack enable us to deliver top-notch web
            solutions.
            <br />
            <b>Client-Centric Approach:</b> We prioritize our clients' needs and
            work closely with them to achieve their vision.
            <br />
            <b>Commitment to Quality: </b>Our focus is on delivering
            high-quality applications that are both functional and aesthetically
            pleasing.<br/>
            <b>Timely Delivery:</b> Efficient project management ensures that
            we meet deadlines without compromising on quality.
            <br/>
            <b>Loking for Projects:</b>We are actively seeking new projects where we can apply our
            skills and expertise to deliver outstanding web solutions. If you
            have a project that requires professional web development services,
            we would love to collaborate with you. Let's work together to create
            innovative web applications that drive your business forward.
          </p>
        </div>
        <Accordion />
      </div>
    </div>
  );
};

export default WHY_CHOOSE_US;
