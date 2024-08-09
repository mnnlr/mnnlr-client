const WorkWithUs = () => {
    return (
        <div className="container xlg:w-[70vh] sm:w-[75vw] mx-auto px-4 lg:text-left text-center">
            <div className="bg-white shadow-md rounded-lg p-8 lg:flex flex-row py-10 gap-16">
            <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#4d61d6] sm:mb-6">
                Would you like to start a project with us?
                <p className="text-left sm:text-base lg:text-lg font-thin mt-2 text-gray-600">
                    Etiam erat lectus, finibus eget commodo quis, tincidunt eget leo.
                    Nullam quis vulputate orci, ac accumsan quam. Morbi fringilla
                    congue libero.
                </p>
                </h2>
            </div>
            <button className="bg-[#6878d6] text-white font-bold py-2 px-4 rounded-lg h-12  lg:mt-12 sm:h-16 w-full sm:w-64 ">
                +91 83095 60480
            </button>
            </div>
        </div>
    );
}

export default WorkWithUs;