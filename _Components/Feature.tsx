"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Navbar from "./Navbar";

const Feature = () => {
  const [mounted, setMounted] = useState(false);
  const [t] = useTranslation();

  useEffect(() => {
    setMounted(true);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <>
    <Navbar/>
    <div className="relative min-h-screen pt-32 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      
      {/* Abstract background shapes */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-green-500/10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-purple-500/5 blur-2xl"></div>
      </div>

      {/* 3D Model Container and Roots */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={mounted ? "show" : "hidden"}
        className="relative mb-16 z-10 w-full flex flex-col items-center"
      >
        

        {/* Roots image - Full Width */}
        <motion.div
          variants={item}
          className="relative w-full max-w-6xl h-[500px] sm:h-[600px]"
        >
          <Image
            src="/images/roots.png"
            alt="Roots"
            fill
            className="object-contain"
          />

          {/* Buttons on the Roots with Hover Cards */}
          <div className="absolute w-full h-full">
            <div className="relative group translate-x-[10%] translate-y-[90%]">
              {/* Tooltip */}
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileHover="show"
                className=" absolute top-[%] left-[5%] w-64 p-4 bg-white/90 dark:bg-slate-800/90 rounded-lg shadow-xl border border-blue-200/50 dark:border-blue-700/50 hidden group-hover:block z-20"
              >
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  {t("Check Symptoms")}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {t(
                    "Analyze your symptoms with our AI-powered tool for accurate health insights."
                  )}
                </p>
              </motion.div>

              {/* Button */}
              <Link href="/SymptomPage">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute top-[15%] left-[10%] w-48 z-30"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-3 rounded-xl shadow-lg text-center font-semibold text-sm cursor-pointer">
                    {t("Check Symptoms")}
                  </div>
                </motion.div>
              </Link>
            </div>

            <div className="relative group">
              {/* Tooltip */}
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileHover="show"
                className="absolute top-[55%] left-[50%] -translate-x-1/2 w-64 p-4 bg-white/90 dark:bg-slate-800/90 rounded-lg shadow-xl border border-purple-200/50 dark:border-purple-700/50 hidden group-hover:block z-20"
              >
                <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-2">
                  {t("Pharma AI")}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {t(
                    "Explore medication options and drug interactions with our advanced Pharma AI."
                  )}
                </p>
              </motion.div>

              {/* Clickable Button */}
              <Link href="/PharmaSahayak">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute top-[45%] left-[50%] -translate-x-1/2 w-48 z-30"
                >
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-5 py-3 rounded-xl shadow-lg text-center font-semibold text-sm cursor-pointer">
                    {t("PharmaSahayak")}
                  </div>
                </motion.div>
              </Link>
            </div>

            <div className="relative group">
              {/* Tooltip */}
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileHover="show"
                className="absolute bottom-[20%] right-[10%] w-64 p-4 bg-white/90 dark:bg-slate-800/90 rounded-lg shadow-xl border border-green-200/50 dark:border-green-700/50 hidden group-hover:block z-20"
              >
                <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">
                  {t("Prescription AI")}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {t(
                    "Get personalized prescription recommendations tailored to your health needs."
                  )}
                </p>
              </motion.div>

              {/* Clickable Button */}
              <Link href="/PrescriptoSaathi">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute bottom-[10%] right-[10%] w-48 z-30"
                >
                  <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-5 py-3 rounded-xl shadow-lg text-center font-semibold text-sm cursor-pointer">
                    {t("Prescription AI")}
                  </div>
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        variants={item}
        className="w-full max-w-7xl mt-16 py-8 border-t border-slate-200 dark:border-slate-700"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              {t("About Us")}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {t(
                "We are committed to revolutionizing healthcare with AI-driven solutions."
              )}
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              {t("Quick Links")}
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li>
                <Link href="/SymptomPage">{t("Check Symptoms")}</Link>
              </li>
              <li>
                <Link href="/PharmaAI">{t("Pharma AI")}</Link>
              </li>
              <li>
                <Link href="/PrescriptionAI">{t("Prescription AI")}</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              {t("Contact")}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {t("Email: support@healthai.com")}
              <br />
              {t("Phone: +1 (800) 123-4567")}
            </p>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          &copy; {new Date().getFullYear()}{" "}
          {t("Health AI. All rights reserved.")}
        </div>
      </motion.footer>
    </div>
    </>
  );
};

export default Feature;
