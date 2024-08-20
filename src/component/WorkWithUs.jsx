const WorkWithUs = () => {
    return (
        <div className="container mx-auto px-4 lg:text-left text-center">
        <div className="bg-white shadow-md rounded-lg p-8 lg:flex lg:flex-row py-10 gap-16">
            <div className="flex-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#2c3e50] sm:mb-6">
                    Would you like to start a project with us?
                </h2>
                <p className="text-left sm:text-base lg:text-lg font-thin mt-2 text-gray-600">
                    To discuss your project requirements and explore how we can assist you, please reach out to us at <a href="https://main--mnnlr-emp.netlify.app/contact" className="underline text-blue-500">our contact page</a>. We look forward to partnering with you and bringing your vision to life!
                </p>
            </div>
            <div className="flex items-center justify-center lg:justify-end mt-6 lg:mt-0">
                <button className="bg-[#12999F] text-white font-bold py-2 px-4 rounded-lg h-12 w-full sm:w-64 lg:w-auto shadow-xl">
                +91 83095 60480
                </button>
            </div>
        </div>
    </div>
    );
}

export default WorkWithUs;