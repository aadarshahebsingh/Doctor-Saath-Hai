//frontend
"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";
export default function PrescriptionMedicineFinder() {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [medicineName, setMedicineName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<"upload" | "preview" | "results">("upload");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
      setStep("preview");
    }
  };

  const findMedicineName = async () => {
    if (!uploadedImage) return;

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", uploadedImage);

      const response = await fetch("http://localhost:5002/PrescriptoSathi", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      // Assuming the backend returns a newline-separated string
      // If the backend still returns a comma-separated string, we'll handle it in renderMedicineList
      setMedicineName(data.content || "");
      setStep("results");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setUploadedImage(null);
    setImagePreviewUrl(null);
    setMedicineName("");
    setError(null);
    setStep("upload");
  };

  const renderMedicineList = () => {
    if (!medicineName) return null;

    // Split by newlines if the backend provides them, otherwise fallback to comma or space separation
    const medicines = medicineName.includes("\n")
      ? medicineName.split("\n").map((m) => m.trim())
      : medicineName.includes(",")
      ? medicineName.split(",").map((m) => m.trim())
      : medicineName.split("*").map((m) => m.trim()).filter((m) => m);

    // Remove unwanted prefix if present
    const cleanMedicines = medicines.map((med) =>
      med.replace(/Here's the extraction and formatting of the medication details from the prescription: /i, "")
    );

    return (
      <ul className="list-disc list-inside space-y-1 text-black">
        {cleanMedicines.map((med, idx) => (
          <li key={idx} className="font-medium">
            {med}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
    <Navbar/>
    <main className="min-h-screen bg-gradient-to-br from-black via-[#006994] to-[#004f63] text-white flex items-center justify-center p-4">
      
      <div className="w-full max-w-6xl bg-white/10 rounded-2xl shadow-2xl p-6 backdrop-blur-md border border-[#006994]/40">
        {/* Top Bar */}
        <div className="flex justify-between items-start mb-8 flex-wrap gap-4">
          <header className="flex items-center">
            <div className="bg-gradient-to-r from-black via-[#006994] to-[#004f63] p-2 rounded-lg mr-3 shadow-[0_0_20px_#006994] ring-1 ring-[#006994]/50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-100 to-blue-500 bg-clip-text text-transparent font-poppins">
                Prescription Reader AI
              </h1>
              <p className="bg-gradient-to-r from-white to-cyan-500 bg-clip-text text-transparent font-poppins">
                Extract medicine names from prescription images
              </p>
            </div>
          </header>

          {/* Steps Indicator */}
          <div className="flex items-center justify-end mb-6 font-sm">
            <div className="text-sm font-sm text-white bg-[#004f63]/30 rounded-xl px-4 py-2 shadow-md border border-[#006994]/40">
              <span className={`transition-all ${step === "upload" ? "text-cyan-300" : "opacity-50"}`}>Upload</span>
              <span className="mx-2 opacity-50">{">"}</span>
              <span className={`transition-all ${step === "preview" ? "text-cyan-300" : "opacity-50"}`}>Preview</span>
              <span className="mx-2 opacity-50">{">"}</span>
              <span className={`transition-all ${step === "results" ? "text-cyan-300" : "opacity-50"}`}>Results</span>
            </div>
          </div>
        </div>

        {/* Card Content Based on Steps */}
        <AnimatePresence mode="wait">
          {step === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-lg p-8 text-black max-w-lg mx-auto border border-[#006994]/40"
            >
              <h2 className="text-2xl font-semibold mb-4 text-[#004f63] text-center">Upload Prescription Photo</h2>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="prescription-photo"
              />
              <button
                onClick={() => document.getElementById("prescription-photo")?.click()}
                className="w-full px-3 py-1.5 rounded-xl font-medium border-2 border-cyan-600 bg-gradient-to-r from-[#004f63] to-blue-300 text-white hover:from-cyan-600 hover:to-cyan-700 transition-all"
              >
                Choose File
              </button>
            </motion.div>
          )}

          {step === "preview" && imagePreviewUrl && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-lg p-8 text-black max-w-lg mx-auto border border-[#006994]/40"
            >
              <h2 className="text-2xl font-semibold mb-4 text-[#004f63] text-center">Preview and Extract</h2>
              <div className="flex justify-center mb-4">
                <img src={imagePreviewUrl} alt="Prescription" className="max-w-full h-auto rounded-lg" />
              </div>
              {error && <p className="text-red-500 text-center mb-4">{error}</p>}
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-cyan-300 animate-spin"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 4v4l4-4m-4 4H4m8 4h8v8m-8 0h-8" />
                  </svg>
                </div>
              ) : (
                <button
                  onClick={findMedicineName}
                  className="w-full px-3 py-1.5 rounded-xl font-medium border-2 border-cyan-600 bg-gradient-to-r from-[#004f63] to-blue-300 text-white hover:from-cyan-600 hover:to-cyan-700 transition-all"
                >
                  Extract Medicine Name
                </button>
              )}
            </motion.div>
          )}

          {step === "results" && (
            <motion.div
  key="results"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.4, ease: "easeInOut" }}
  className="bg-white rounded-2xl shadow-xl p-8 text-black max-w-xl mx-auto border border-[#004f63]/20 hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-[1.01]"
>
  <div className="text-center">
    <h2 className="text-3xl font-bold mb-4 text-[#004f63]">Extracted Medicines</h2>

    {medicineName ? (
      renderMedicineList()
    ) : (
      <p className="text-lg text-red-500 font-medium">No medicine name found.</p>
    )}

    <button
      onClick={reset}
      className="mt-6 w-full px-4 py-2 rounded-xl font-semibold border-2 border-cyan-600 bg-gradient-to-r from-[#004f63] to-blue-400 text-white hover:from-cyan-600 hover:to-cyan-700 hover:shadow-md transition-all duration-300 ease-in-out"
    >
      Try Again
    </button>
  </div>
</motion.div>

          )}
        </AnimatePresence>
      </div>
    </main>
  <Footer/>
  </>
  );
}