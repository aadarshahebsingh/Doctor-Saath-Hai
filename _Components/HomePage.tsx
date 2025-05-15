"use client";

import React, { useEffect, useState } from 'react';
import { nextSlide, prevSlide } from './slider';

// Declare the model-viewer custom element for TypeScript
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                src?: string;
                'camera-controls'?: boolean | string;
                autoplay?: boolean | string;
                'auto-rotate'?: boolean | string;
                'interaction-prompt'?: string;
                'shadow-intensity'?: string | number;
                'environment-image'?: string;
                'camera-target'?: string;
                bounds?: string;
                'min-camera-orbit'?: string;
                'max-camera-orbit'?: string;
            };
        }
    }
}

const HomePage: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [language, setLanguage] = useState('English');

    const toggleMode = (): void => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark');
    };

    const toggleMenu = (): void => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLanguageChange = (lang: string): void => {
        setLanguage(lang);
        // Implement translation logic here (e.g., update content based on language)
        console.log(`Language changed to: ${lang}`);
    };

    useEffect(() => {
        // Sync initial dark mode state
        setIsDarkMode(document.body.classList.contains('dark'));
        // Expose toggleMode to global scope (if still needed)
        (window as any).toggleMode = toggleMode;
        return () => {
            delete (window as any).toggleMode;
        };
    }, []);

    return (
        <div>
            <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-gray-800 dark:to-gray-900 shadow-lg px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="nav-left">
                        <a href="#" className="text-white text-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform duration-200">
                            <i className="fas fa-stethoscope"></i> HealthSite
                        </a>
                    </div>
                    <div className="nav-center hidden lg:flex gap-8">
                        <a href="#home" className="text-white font-medium text-lg relative group hover:text-blue-200 transition-colors duration-300">
                            Home
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-200 group-hover:w-full transition-all duration-300"></span>
                        </a>
                        <a href="#about" className="text-white font-medium text-lg relative group hover:text-blue-200 transition-colors duration-300">
                            About
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-200 group-hover:w-full transition-all duration-300"></span>
                        </a>
                        <a href="#contact" className="text-white font-medium text-lg relative group hover:text-blue-200 transition-colors duration-300">
                            Contact Us
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-200 group-hover:w-full transition-all duration-300"></span>
                        </a>
                        <a href="#medi" className="text-white font-medium text-lg relative group hover:text-blue-200 transition-colors duration-300">
                            Medical Professionals
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-200 group-hover:w-full transition-all duration-300"></span>
                        </a>
                        <a href="#Feat" className="text-white font-medium text-lg relative group hover:text-blue-200 transition-colors duration-300">
                            Features
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-200 group-hover:w-full transition-all duration-300"></span>
                        </a>
                    </div>
                    <div className="nav-right hidden lg:flex items-center gap-4">
                        <a href="#signin" className="text-white font-medium text-lg px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors duration-200">Sign In</a>
                        <select
                            value={language}
                            onChange={(e) => handleLanguageChange(e.target.value)}
                            className="bg-white/20 text-white rounded-full px-3 py-2 text-sm font-medium hover:bg-white/30 transition-colors duration-200 focus:outline-none"
                        >
                            <option value="English" className="text-black">English</option>
                            <option value="Hindi" className="text-black">Hindi</option>
                        </select>
                        <button
                            className="toggle-btn text-2xl p-2 rounded-full bg-white/20 hover:bg-white/30 transition-transform duration-300 hover:rotate-180"
                            onClick={toggleMode}
                        >
                            {isDarkMode ? '☀️' : '🌙'}
                        </button>
                    </div>
                    <button className="lg:hidden text-white text-3xl focus:outline-none" onClick={toggleMenu}>
                        {isMenuOpen ? '✕' : '☰'}
                    </button>
                </div>
                <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-blue-700 dark:bg-gray-800 rounded-b-lg shadow-lg transition-all duration-300`}>
                    <div className="flex flex-col items-center gap-4 py-4">
                        <a href="#home" className="text-white font-medium text-lg hover:text-blue-200 transition-colors duration-200" onClick={toggleMenu}>Home</a>
                        <a href="#about" className="text-white font-medium text-lg hover:text-blue-200 transition-colors duration-200" onClick={toggleMenu}>About</a>
                        <a href="#contact" className="text-white font-medium text-lg hover:text-blue-200 transition-colors duration-200" onClick={toggleMenu}>Contact Us</a>
                        <a href="#medi" className="text-white font-medium text-lg hover:text-blue-200 transition-colors duration-200" onClick={toggleMenu}>Medical Professionals</a>
                        <a href="#Feat" className="text-white font-medium text-lg hover:text-blue-200 transition-colors duration-200" onClick={toggleMenu}>Features</a>
                        <a href="#signin" className="text-white font-medium text-lg px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors duration-200" onClick={toggleMenu}>Sign In</a>
                        <select
                            value={language}
                            onChange={(e) => { handleLanguageChange(e.target.value); toggleMenu(); }}
                            className="bg-white/20 text-white rounded-full px-3 py-2 text-sm font-medium hover:bg-white/30 transition-colors duration-200 focus:outline-none"
                        >
                            <option value="English" className="text-black">English</option>
                            <option value="Hindi" className="text-black">Hindi</option>
                        </select>
                        <button
                            className="toggle-btn text-2xl p-2 rounded-full bg-white/20 hover:bg-white/30 transition-transform duration-300 hover:rotate-180"
                            onClick={() => { toggleMode(); toggleMenu(); }}
                        >
                            {isDarkMode ? '☀️' : '🌙'}
                        </button>
                    </div>
                </div>
            </nav>
            <div className="container mx-auto max-w-5xl my-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm text-center" id="home">
                <div className="text-content">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Welcome to the Medical Website</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">Explore our interactive 3D model of a stethoscope, a symbol of our commitment to advanced medical technology and patient care.</p>
                    <div className="flex justify-center gap-4">
                        <a href="#join-team" className="px-8 py-3 text-lg font-bold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition">Join Our Team</a>
                        <a href="#services" className="px-8 py-3 text-lg font-bold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition">Explore Services</a>
                    </div>
                </div>
                <model-viewer
                    src="dd.glb"
                    camera-controls
                    autoplay
                    auto-rotate
                    interaction-prompt="none"
                    shadow-intensity="1"
                    environment-image="neutral"
                    camera-target="0m -0.244m 0m"
                    bounds="tight"
                    min-camera-orbit="auto auto 3m"
                    max-camera-orbit="auto auto 3m"
                    className="w-full h-[480px]"
                ></model-viewer>
            </div>
            <section className="features-slider text-center py-10 bg-gray-900">
                <h2 className="text-3xl font-bold text-white mb-6">Features We Provide</h2>
                <div className="slider w-4/5 max-w-3xl h-[300px] mx-auto overflow-hidden rounded-2xl shadow-lg relative">
                    <button className="arrow left absolute top-1/2 -translate-y-1/2 bg-black/40 text-white border-none p-3 text-2xl cursor-pointer rounded-full z-10 left-3 hover:bg-black/60 transition" onClick={prevSlide}>❮</button>
                    <div className="slides flex transition-all duration-500 ease-in-out" id="slides">
                        <img src="a.png" alt="Telemedicine" className="w-full h-[300px] object-cover rounded-2xl flex-shrink-0" />
                        <img src="b.png" alt="Doctor Appointment" className="w-full h-[300px] object-cover rounded-2xl flex-shrink-0" />
                        <img src="c.png" alt="Health Tracker" className="w-full h-[300px] object-cover rounded-2xl flex-shrink-0" />
                        <img src="d.png" alt="Emergency Services" className="w-full h-[300px] object-cover rounded-2xl flex-shrink-0" />
                    </div>
                    <button className="arrow right absolute top-1/2 -translate-y-1/2 bg-black/40 text-white border-none p-3 text-2xl cursor-pointer rounded-full z-10 right-3 hover:bg-black/60 transition" onClick={nextSlide}>❯</button>
                </div>
            </section>
            <h1 id="Feat" className="text-4xl font-bold text-white text-center mt-10 mb-4">Our Features</h1>
            <p className="subtitle text-lg text-white text-center max-w-2xl mx-auto mb-12">Explore our advanced features designed to streamline your healthcare journey and empower both patients and medical professionals.</p>
            <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="feature-card bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 text-left max-w-sm transition-transform hover:scale-105 hover:shadow-lg">
                    <div className="feature-icon text-4xl mb-6 text-blue-600"><i className="fas fa-camera"></i></div>
                    <div className="feature-title text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Medicine Recognition</div>
                    <div className="feature-desc text-gray-600 dark:text-gray-300">Instantly identify medicines by scanning them with your camera, accessing details about their composition and cost-effective alternatives.</div>
                </div>
                <div className="feature-card bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 text-left max-w-sm transition-transform hover:scale-105 hover:shadow-lg">
                    <div className="feature-icon text-4xl mb-6 text-blue-600"><i className="fas fa-map-marker-alt"></i></div>
                    <div className="feature-title text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Find Local Doctors</div>
                    <div className="feature-desc text-gray-600 dark:text-gray-300">Discover verified doctors in your vicinity, review their profiles, and select the healthcare provider that best suits your specific needs.</div>
                </div>
                <div className="feature-card bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 text-left max-w-sm transition-transform hover:scale-105 hover:shadow-lg">
                    <div className="feature-icon text-4xl mb-6 text-blue-600"><i className="fas fa-stethoscope"></i></div>
                    <div className="feature-title text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Symptom Assessment</div>
                    <div className="feature-desc text-gray-600 dark:text-gray-300">Quickly input your symptoms and receive an AI-powered preliminary assessment of potential health concerns based on expert medical knowledge.</div>
                </div>
            </div>
            <div className="features-row-bottom flex justify-center gap-8 mt-10 flex-wrap">
                <div className="feature-card bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 text-left max-w-sm transition-transform hover:scale-105 hover:shadow-lg">
                    <div className="feature-icon text-4xl mb-6 text-blue-600"><i className="far fa-calendar-alt"></i></div>
                    <div className="feature-title text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Appointment Scheduling</div>
                    <div className="feature-desc text-gray-600 dark:text-gray-300">Easily book appointments with your chosen doctors based on their availability and your preferred dates and times.</div>
                </div>
                <div className="feature-card bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 text-left max-w-sm transition-transform hover:scale-105 hover:shadow-lg">
                    <div className="feature-icon text-4xl mb-6 text-blue-600"><i className="fas fa-user-md"></i></div>
                    <div className="feature-title text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">For Medical Professionals</div>
                    <div className="feature-desc text-gray-600 dark:text-gray-300">Are you a certified doctor? Join our platform to showcase your services and connect with a wide network of patients seeking your expertise.</div>
                </div>
            </div>
            <footer className="bg-gray-900 text-white py-8 text-center text-sm shadow-inner mt-auto">
                <div className="max-w-6xl mx-auto">
                    <p>© 2025 Your Medical Expertise Hub | Committed to Excellence</p>
                    <div className="mt-4 flex justify-center gap-6">
                        <a href="/privacy-policy" className="text-white hover:text-blue-400 transition">Privacy Policy</a>
                        <a href="/terms-of-service" className="text-white hover:text-blue-400 transition">Terms of Service</a>
                        <a href="/contact" className="text-white hover:text-blue-400 transition">Contact Us</a>
                    </div>
                    <div className="mt-6 flex justify-center gap-4">
                        <a href="https://facebook.com" className="text-2xl text-[#4267B2] hover:text-[#365899] transition">
                            <i className="fab fa-facebook-square"></i>
                            <span className="sr-only">Facebook</span>
                        </a>
                        <a href="https://twitter.com" className="text-2xl text-[#1DA1F2] hover:text-[#0d8bf0] transition">
                            <i className="fab fa-twitter-square"></i>
                            <span className="sr-only">Twitter</span>
                        </a>
                        <a href="https://linkedin.com" className="text-2xl text-[#0077B5] hover:text-[#005983] transition">
                            <i className="fab fa-linkedin"></i>
                            <span className="sr-only">LinkedIn</span>
                        </a>
                        <a href="https://instagram.com" className="text-2xl text-[#C13584] hover:text-[#a12b6b] transition">
                            <i className="fab fa-instagram-square"></i>
                            <span className="sr-only">Instagram</span>
                        </a>
                    </div>
                    <div className="mt-6 text-gray-400">
                        <p>Email: <a href="mailto:info@yourmedhub.com" className="text-white hover:text-blue-400 transition">info@yourmedhub.com</a></p>
                        <p>Phone: +1 (555) 123-4567</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;