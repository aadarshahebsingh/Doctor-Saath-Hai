"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const FeaturesContainer = () => {
  const { isDarkMode } = useTheme(); // Get theme state

  const primaryFeatures = [
    {
      title: "Medicine Recognition",
      desc: "Instantly identify medicines by scanning them with your camera, accessing details about their composition and cost-effective alternatives.",
      logo: "https://img.icons8.com/ios-filled/50/000000/pill.png",
    },
    {
      title: "Find Local Doctors",
      desc: "Discover verified doctors in your vicinity, review their profiles, and select the healthcare provider that best suits your specific needs.",
      logo: "https://img.icons8.com/ios-filled/50/000000/hospital-room.png", // New logo
    },
    {
      title: "Symptom Assessment",
      desc: "Quickly input your symptoms and receive an AI-powered preliminary assessment of potential health concerns based on expert medical knowledge.",
      logo: "https://img.icons8.com/ios-filled/50/000000/heart-health.png",
    },
  ];

  const additionalFeatures = [
    {
      title: "Appointment Scheduling",
      desc: "Easily book appointments with your chosen doctors based on their availability and your preferred dates and times.",
      logo: "https://img.icons8.com/ios-filled/50/000000/calendar.png",
    },
    {
      title: "For Medical Professionals",
      desc: "Are you a certified doctor? Join our platform to showcase your services and connect with a wide network of patients seeking your expertise.",
      logo: "https://img.icons8.com/ios-filled/50/000000/medal.png",
    },
  ];

  return (
    <section
      id="Feat"
      className="py-16 px-4 sm:px-6 lg:px-8 transition-all duration-500"
    >
      <div className="max-w-7xl mx-auto flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className={`w-full max-w-6xl shadow-2xl rounded-3xl p-8 md:p-12 border transition-all duration-500 ${
            isDarkMode
              ? "bg-gradient-to-br from-indigo-800 via-teal-900 to-gray-800 border-gray-700"
              : "bg-gradient-to-br from-teal-100 via-yellow-100 to-orange-200 border-gray-200"
          }`}
        >
          <h2
            className={`text-4xl font-semibold text-center mb-6 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Our Features
          </h2>
          <p
            className={`text-center max-w-3xl mx-auto mb-16 text-lg ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Explore our advanced features designed to streamline your healthcare journey and empower both patients and medical professionals.
          </p>

          {/* Primary Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {primaryFeatures.map(({ title, desc, logo }) => (
              <div
                key={title}
                className={`p-6 rounded-xl shadow-md transition-transform duration-500 ease-in-out transform hover:-translate-y-2 hover:rotate-[0.5deg] hover:scale-[1.05] hover:shadow-2xl h-[350px] flex flex-col items-center text-center ${
                  isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
                }`}
              >
                <img
                  src={logo}
                  alt={`${title} logo`}
                  className={`w-16 h-16 mb-4 ${isDarkMode ? "filter invert brightness-90" : ""}`}
                />
                <h3 className="text-2xl font-semibold mb-4">{title}</h3>
                <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>{desc}</p>
              </div>
            ))}
          </div>

          {/* Additional Features */}
          <div className="grid md:grid-cols-2 gap-8">
            {additionalFeatures.map(({ title, desc, logo }) => (
              <div
                key={title}
                className={`p-6 rounded-xl shadow-md transition-transform duration-500 ease-in-out transform hover:-translate-y-2 hover:rotate-[0.5deg] hover:scale-[1.05] hover:shadow-2xl h-[350px] flex flex-col items-center text-center ${
                  isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
                }`}
              >
                <img
                  src={logo}
                  alt={`${title} logo`}
                  className={`w-16 h-16 mb-4 ${isDarkMode ? "filter invert brightness-90" : ""}`}
                />
                <h3 className="text-2xl font-semibold mb-4">{title}</h3>
                <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>{desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const OurFeatures = () => {
  return <FeaturesContainer />; // Just rendering the container
};

export default OurFeatures;
