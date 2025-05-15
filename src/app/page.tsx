import { div } from "framer-motion/client";
import Image from "next/image";
import SymptomPage from "../../_Components/SymptomPage";
import Navbar from "../../_Components/Navbar";
import HeroSection from "../../_Components/HeroSection";
import FeaturesSection from "../../_Components/FeatureSection";
import Footer from "../../_Components/Footer";
import PrescriptoSathi from "../../_Components/PrescriptoSaathi";
import PharmaSahayak from "../../_Components/PharmaSahayak";

import Feature from "../../_Components/Feature";


export default function Home() {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <FeaturesSection/>
      <Footer/>

      {/* <Nearby/> */}
      {/* <Ne/> */}
      {/* <AboutHelix/> */}

      {/* /<SymptomPage/> */}

      {/* <Prayog/> */}
      {/* <AuthPages /> */}
      {/* <PharmaSahayak/> */}

      {/* <ImageSlider/> */}
      {/* <PrescriptoSathi/> */}
      {/* <Feature /> */}


      {/* <Allergies></Allergies> */}
      {/* <Navbar3/>
      <HeroSection3/>
      <Slider/>
      <OurFeatures/>
      <HomePage3/> */}
    </div>
  );
}
