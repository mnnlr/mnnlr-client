import Accordion from "./Accordion"
import img from '../assets/why-choose-us.jpg';

const WHY_CHOOSE_US = () => {
    return (
        <div className="flex flex-wrap w-full bg-blue-50 justify-center items-stretch">
          <div className="relative w-full md:w-1/2">
            <img src={img} alt="Description" className="w-full h-full object-cover rounded shadow-lg" />
            <div className="absolute inset-0 bg-[#242a56] opacity-80 rounded"></div>
          </div>
          <div className="w-full  lg:w-1/2 md:w-1/2 p-4">
            <div className="text-center py-8">
              <h1 className="text-3xl font-semibold mb-4">Why Choose Us?</h1>
              <p className="text-lg px-4 text-start">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar.
              </p>
            </div>
            <Accordion />
          </div>
        </div>
    )
}

export default WHY_CHOOSE_US;