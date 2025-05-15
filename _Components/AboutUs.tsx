import React from 'react';

interface Feature {
  title: string;
  desc: string;
}

interface TeamMember {
  name: string;
  role: string;
}

const features: Feature[] = [
  { title: "AI-Powered Prescription Analysis", desc: "Smartly interpret your prescriptions with advanced machine learning." },
  { title: "Cost-Effective Generic Alternatives", desc: "Find affordable, generic versions of your medications easily." },
  { title: "Symptom-Based Disease Insights", desc: "Get initial assessments based on your symptoms instantly." },
  { title: "Nearby Healthcare Professionals", desc: "Quickly locate qualified doctors and specialists near you." },
  { title: "Medication Safety Checks", desc: "Scan prescriptions for side effects and allergy risks." },
  { title: "Real-Time Hospital Locator & SOS", desc: "Find emergency facilities near you with our one-tap SOS alert system." }
];

const teamMembers: TeamMember[] = [
  { name: "Aadarsh Saheb Singh", role: "Android & Web UI Designer" },
  { name: "Prayog Priyanshu", role: "AI & Machine Learning Lead" },
  { name: "Aditi Priya", role: "Fullstack Support & UI Design" },
  { name: "Nitish Kumar Sharma", role: "Frontend Developer & UI Engineer" },
  { name: "Sushant Kumar", role: "Backend Developer" }
];

const AboutHelix: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white font-sans leading-relaxed">
      {/* Custom Styles */}
      <style>
        {`
          @keyframes glow {
            0%, 100% {
              text-shadow:
                0 0 2px rgba(255, 255, 255, 0.15),
                0 0 4px rgba(128, 90, 213, 0.2);
            }
            50% {
              text-shadow:
                0 0 4px rgba(255, 255, 255, 0.25),
                0 0 10px rgba(99, 102, 241, 0.3),
                0 0 16px rgba(168, 85, 247, 0.25);
            }
          }
          .animate-glow {
            animation: glow 3s ease-in-out infinite;
          }
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.8s ease-out forwards;
          }
          .animate-fade-in-slow {
            animation: fade-in 1.2s ease-out forwards;
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Hero Section */}
        <section className="relative text-center mb-20 px-6 py-16 rounded-2xl bg-gradient-to-b from-black via-gray-900 to-gray-800 shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-blue-900/10 to-transparent rounded-2xl blur-2xl opacity-30" />
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-6 drop-shadow-md animate-fade-in">
            About <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 drop-shadow-md tracking-wider animate-glow">
              DoctorSathHai🩺
              <span className="absolute inset-0 blur-md opacity-20 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 -z-10 rounded-lg" />
            </span>
          </h1>
          <p className="text-lg max-w-3xl mx-auto text-gray-300 leading-relaxed animate-fade-in-slow">
            Revolutionizing healthcare accessibility through intelligent, reliable, and affordable digital solutions.
          </p>
        </section>

        {/* Mission */}
        <section className="mb-16 bg-gradient-to-br from-black via-blue-900 to-purple-900 p-10 rounded-2xl border border-purple-700 shadow-xl transition hover:shadow-purple-600/40 hover:border-purple-400 duration-300">
          <h2 className="text-3xl font-semibold text-white mb-6">Our Guiding Mission</h2>
          <p className="text-lg text-gray-200 max-w-4xl leading-relaxed">
            At <span className="font-semibold text-white">Helix</span>, our mission is empowering healthier lives by providing accessible and affordable healthcare solutions. We connect individuals with cost-effective alternative medicines and valuable medical insights, leveraging innovative technology to simplify health decisions and foster well-being within their communities.
          </p>
        </section>

        {/* Features */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold text-white mb-12 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl border border-gray-600 bg-gradient-to-br from-black via-blue-900 to-purple-900 transition transform hover:scale-105 hover:shadow-2xl hover:border-purple-400 duration-300 ease-in-out"
              >
                <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition">
                  {feature.title}
                </h3>
                <p className="text-gray-300 mt-2">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold text-white mb-16 text-center">Our Dedicated Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-28">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-black via-blue-900 to-purple-900 rounded-2xl p-6 text-center border border-gray-700 transition transform hover:scale-105 hover:shadow-2xl hover:border-purple-400 duration-300 ease-in-out"
              >
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                  <div className="w-24 h-24 rounded-full bg-gray-800 border-4 border-purple-500 p-1">
                    <img
                      src={`https://via.placeholder.com/100?text=${member.name.split(" ")[0]}`}
                      alt={member.name}
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="pt-20">
                  <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition">{member.name}</h3>
                  <p className="text-sm text-gray-300 mt-1">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-400 border-t border-gray-600 pt-6">
          © 2025 Helix Team. All rights reserved. <br />
          Jamshedpur, Jharkhand, India
        </footer>
      </div>
    </div>
  );
};

export default AboutHelix;
