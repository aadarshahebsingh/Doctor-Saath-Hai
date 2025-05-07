"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";

export default function GenericMedicineFinder() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [mime, setMime] = useState("");
  const [displayGeneric, setGeneric] = useState<string>();
  const [nonGeneric, setNonGeneric] = useState({});
  const [genericMedicine, setGenericMedicine] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setMime(file.type);
      console.log(file);
    }
  };
  //shubham backend url change kardena
  const findGenericMedicine = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://pocketpharma-backend.shubhamvishwakarma0604.workers.dev/",
        {
          method: "POST",
          body: JSON.stringify({
            image: uploadedImage,
            mime: mime,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();

      console.log(data);
      if (response.ok && !data?.message) {
        let nonGeneric = {};
        Object.keys(JSON.parse(data)).forEach((item) => {
          if (item.toLowerCase().includes("generic")) {
            setGeneric(item);
          } else {
            nonGeneric[item] = JSON.parse(data)[item];
          }
        });
        setNonGeneric(nonGeneric);
        setGenericMedicine(JSON.parse(data));
      } else {
        throw new Error(data.message || "Failed to find generic medicine");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };
  // Eklavya use this to develop frontend
  const demoMedicine = {
    brandName: "PainAway Plus",
    brandImage: "/placeholder.svg?height=200&width=200",
    brandPrice: 79.99,
    genericName: "Ibuprofen 400mg",
    genericImage: "/placeholder.svg?height=200&width=200",
    genericPrice: 12.99,
    genericLink: "https://example.com/generic-ibuprofen",
  };
  // Eklavya use this to develop frontend

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#006994] to-[#004f63] text-white shadow-[0_0_40px_#006994] ring-1 ring-[#006994]/50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header with logo and functional detail */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-black via-[#006994] to-[#004f63] p-2 rounded-lg mr-3 shadow-[0_0_20px_#006994] ring-1 ring-[#006994]/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* <!-- Capsule outline: a rounded rectangle --> */}
                  <rect x="6" y="4" width="12" height="16" rx="6" ry="6" />
                  {/* <!-- Small square in the center instead of a diagonal line --> */}
                  <rect x="10" y="10" width="4" height="4" />
                  {/* <!-- Optional: small circle to suggest a tablet or detail on the capsule --> */}
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-100 to-blue-500 bg-clip-text text-transparent font-poppins">
                  PharmaSahayak AI
                </h1>
                <p className="bg-gradient-to-r from-white to-cyan-500 bg-clip-text text-transparent font-poppins">
                  Find affordable alternatives to expensive medications using AI
                </p>
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full"
              initial={{ width: "20%" }}
              animate={{ width: `70%` }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          </div>
        </header>
      </div>
      <div className="container mx-auto p-4 max-w-6xl">
        <div className="shadow-lg shadow-green-500/50 border-2 border-cyan-600 bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="p-6 text-white-200">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-[#004f63] to-blue-200 p-6 rounded-xl border-2 border-cyan-600 shadow-lg shadow-cyan-500/50 relative overflow-hidden">
                {/* Subtle inner overlay for texture */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-cyan-200/20 opacity-30 pointer-events-none"></div>

                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-blue-400 text-transparent bg-clip-text underline decoration-cyan-400 decoration-2">
                  How it works:
                </h3>
                <ol className="  list-none space-y-4">
                  {[
                    "Upload a photo of your medicine",
                    "Our AI analyzes the image",
                    "We find a generic alternative",
                    "Save money on your prescription!",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 group hover:bg-red-100/50 p-2 rounded-md transition-all duration-300"
                    >
                      <span className="flex items-center justify-center w-8 h-8 bg-cyan-600 text-white rounded-full text-sm font-semibold group-hover:scale-110 transition-transform">
                        {index + 1}
                      </span>
                      <span className="text-white-800 text-lg group-hover: transition-colors font-bold">
                        {item}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <label
                  htmlFor="medicine-photo"
                  className="block text-lg font-semibold text-[#004f63] underline mb-2"
                >
                  Upload Medicine Photo
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    id="medicine-photo"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() =>
                      document.getElementById("medicine-photo")?.click()
                    }
                    className="px-6 py-3 rounded-xl font-medium transition-all border-2 border-cyan-600 bg-gradient-to-r from-[#004f63] to-blue-300 text-black shadow-md hover:shadow-lg hover:from-teal-600 hover:to-cyan-600"
                  >
                    Choose File
                  </button>
                  <button
                    onClick={() =>
                      document.getElementById("medicine-photo")?.click()
                    }
                    className="px-6 py-3 rounded-xl font-medium transition-all border-2 border-cyan-600 bg-gradient-to-r from-gray-500 to-white text-black shadow-md hover:shadow-lg hover:from-teal-600 hover:to-cyan-600"
                  >
                    Take Photo
                  </button>
                </div>
              </div>

              {uploadedImage && (
                <div className="bg-gradient-to-r from-[#004f63] to-blue-200 p-4 rounded-lg border-2 border-cyan-600">
                  <h3 className="underline text-cyan-100 text-s font-semibold mb-2">
                    Uploaded Image:
                  </h3>
                  <img
                    src={uploadedImage}
                    alt="Uploaded Medicine"
                    className="w-48 h-48 object-cover rounded-lg mx-auto"
                  />
                </div>
              )}

              {uploadedImage && (
                <button
                  onClick={findGenericMedicine}
                  disabled={isLoading}
                  className="border-2 border-cyan-600 w-full bg-gradient-to-r from-[#004f63] to-blue-200 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 disabled:bg-gray-400"
                >
                  {isLoading ? "Searching..." : "Find Generic Alternative"}
                </button>
              )}

              {error && (
                <p className="text-red-500 bg-red-100 p-3 rounded-lg">
                  {error}
                </p>
              )}

              {Object.keys(nonGeneric).length ? (
                <div className="mt-4 space-y-4 bg-gray-100 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold">Original Medicine</h3>
                  <div className="block items-center ">
                    {Object.keys(nonGeneric).map((item) => {
                      return (
                        <p key={item}>
                          {item.replace("_", " ")} is {String(nonGeneric[item])}{" "}
                          {isNaN(nonGeneric[item]) ? "," : "₹"}
                        </p>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              {genericMedicine ? (
                <div className="mt-4 space-y-4 bg-gray-100 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold">
                    Generic Alternative Found!
                  </h3>
                  <div className="block items-center ">
                    {genericMedicine["generic_medicine"]?.map(
                      (item: { [x: string]: number }) => {
                        return (
                          <div className="flex" key={JSON.stringify(item)}>
                            {Object.keys(item).map((i) => {
                              return (
                                <p className="mr-1" key={i}>
                                  {i.replace("_", " ")} is {item[i]}
                                  {isNaN(item[i]) ? "," : "₹"}
                                </p>
                              );
                            })}
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="shadow-lg shadow-green-500/50 border-2 border-cyan-600 bg-gradient-to-r from-[#004f63] to-blue-200 shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Important Information
            </h2>
            <ul className="list-disc list-inside space-y-2 ">
              <li>
                Generic medicines are FDA-approved and meet the same quality
                standards as brand-name drugs.
              </li>
              <li>
                Generic drugs are typically 80-85% cheaper than brand-name
                equivalents.
              </li>
              <li>
                Always consult with your healthcare provider before switching
                medications.
              </li>
              <li>
                This tool is for informational purposes only and does not
                constitute medical advice.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}