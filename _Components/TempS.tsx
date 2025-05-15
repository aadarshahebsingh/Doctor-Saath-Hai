// pages/symptom-checker.tsx
"use client";
import React, { useState, useEffect, useRef, JSX } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "./Navbar";
import Footer from "./Footer";

// Type definitions
interface HealthSymptom {
  id: string;
  name: string;
  category: string;
}

interface ChosenSymptom extends HealthSymptom {
  duration: string;
  severity: number;
}

// New interface for diagnosis results
interface DiagnosisResult {
  prediction: string;
  confidence: number;
  medicines: string[];
  dosages: string[];
  prices_inr: string[];
}

type TimeSpanType =
  | "< 24 hours"
  | "1-3 days"
  | "4-7 days"
  | "1-2 weeks"
  | "2-4 weeks"
  | "1+ month";

// Sample symptom data (would come from API in production)
const HEALTH_SYMPTOM_DATA: HealthSymptom[] = [
  // General/Systemic Symptoms
  { id: "1", name: "Fatigue", category: "General" },
  { id: "2", name: "Fever", category: "General" },
  { id: "3", name: "Chills", category: "General" },
  { id: "4", name: "Sweating", category: "General" },
  { id: "5", name: "Weight loss", category: "General" },
  { id: "6", name: "Weight gain", category: "General" },
  { id: "7", name: "Night sweats", category: "General" },
  { id: "8", name: "Rapid heartbeat", category: "General" },
  { id: "9", name: "High blood pressure", category: "General" },
  { id: "10", name: "High cholesterol", category: "General" },
  { id: "11", name: "Excess body weight", category: "General" },
  { id: "12", name: "Pale skin", category: "General" },
  { id: "13", name: "Jaundice (yellowing of skin/eyes)", category: "General" },
  { id: "14", name: "Dark urine", category: "General" },

  // Head/Neurological Symptoms
  { id: "15", name: "Headache", category: "Neurological" },
  { id: "16", name: "Dizziness", category: "Neurological" },
  { id: "17", name: "Blurred vision", category: "Neurological" },
  { id: "18", name: "Sensitivity to light", category: "Neurological" },
  { id: "19", name: "Memory loss", category: "Neurological" },
  { id: "20", name: "Confusion", category: "Neurological" },
  { id: "21", name: "Difficulty in thinking", category: "Neurological" },
  { id: "22", name: "Seizures", category: "Neurological" },
  { id: "23", name: "Temporary unconsciousness", category: "Neurological" },
  { id: "24", name: "Tremors", category: "Neurological" },
  { id: "25", name: "Slow movement", category: "Neurological" },
  { id: "26", name: "Balance issues", category: "Neurological" },
  { id: "27", name: "Hallucinations", category: "Neurological" },
  { id: "28", name: "Delusions", category: "Neurological" },
  { id: "29", name: "Disorganized speech", category: "Neurological" },

  // Respiratory Symptoms
  { id: "30", name: "Shortness of breath", category: "Respiratory" },
  { id: "31", name: "Wheezing", category: "Respiratory" },
  { id: "32", name: "Chest tightness", category: "Respiratory" },
  { id: "33", name: "Cough (with or without mucus)", category: "Respiratory" },
  { id: "34", name: "Nasal congestion", category: "Respiratory" },
  { id: "35", name: "Runny nose", category: "Respiratory" },
  { id: "36", name: "Sneezing", category: "Respiratory" },
  { id: "37", name: "Sore throat", category: "Respiratory" },
  { id: "38", name: "Loss of taste/smell", category: "Respiratory" },
  { id: "39", name: "Ear pain", category: "Respiratory" },
  { id: "40", name: "Hearing loss", category: "Respiratory" },
  { id: "41", name: "Fluid drainage from ear", category: "Respiratory" },

  // Digestive/Abdominal Symptoms
  { id: "42", name: "Nausea", category: "Digestive" },
  { id: "43", name: "Vomiting", category: "Digestive" },
  { id: "44", name: "Abdominal pain", category: "Digestive" },
  { id: "45", name: "Stomach pain", category: "Digestive" },
  { id: "46", name: "Bloating", category: "Digestive" },
  { id: "47", name: "Burning stomach pain", category: "Digestive" },
  { id: "48", name: "Loss of appetite", category: "Digestive" },
  { id: "49", name: "Diarrhea", category: "Digestive" },
  { id: "50", name: "Constipation", category: "Digestive" },
  { id: "51", name: "Painful urination", category: "Digestive" },
  { id: "52", name: "Discharge", category: "Digestive" },
  { id: "53", name: "Dark urine", category: "Digestive" },

  // Musculoskeletal Symptoms
  { id: "54", name: "Joint pain", category: "Musculoskeletal" },
  { id: "55", name: "Joint stiffness", category: "Musculoskeletal" },
  { id: "56", name: "Joint swelling", category: "Musculoskeletal" },
  { id: "57", name: "Muscle aches", category: "Musculoskeletal" },
  { id: "58", name: "Generalized pain", category: "Musculoskeletal" },
  { id: "59", name: "Facial pain", category: "Musculoskeletal" },

  // Skin/Allergic Symptoms
  { id: "60", name: "Rash", category: "Dermatological" },
  { id: "61", name: "Itching", category: "Dermatological" },
  { id: "62", name: "Red eyes", category: "Dermatological" },
  { id: "63", name: "Eye discharge", category: "Dermatological" },
  { id: "64", name: "Scaly skin patches", category: "Dermatological" },
  { id: "65", name: "Dry/cracked skin", category: "Dermatological" },
  { id: "66", name: "Sores", category: "Dermatological" },
  { id: "67", name: "Swelling (edema)", category: "Dermatological" },

  // Cardiovascular Symptoms
  { id: "68", name: "Chest pain", category: "Cardiovascular" },
  {
    id: "69",
    name: "Palpitations (rapid heartbeat)",
    category: "Cardiovascular",
  },
  { id: "70", name: "High blood pressure", category: "Cardiovascular" },

  // Urinary/Reproductive Symptoms
  { id: "71", name: "Frequent urination", category: "Urinary" },
  { id: "72", name: "Painful urination", category: "Urinary" },
  { id: "73", name: "Discharge", category: "Urinary" },
  { id: "74", name: "Swelling (genital)", category: "Urinary" },
  { id: "75", name: "Lower abdominal pain", category: "Urinary" },

  // Psychological/Mental Health Symptoms
  { id: "76", name: "Persistent sadness", category: "Psychological" },
  { id: "77", name: "Lack of energy", category: "Psychological" },
  { id: "78", name: "Sleep issues", category: "Psychological" },
  { id: "79", name: "Excessive worry", category: "Psychological" },
  { id: "80", name: "Restlessness", category: "Psychological" },
  { id: "81", name: "Anxiety", category: "Psychological" },

  // Eye-Related Symptoms
  { id: "82", name: "Blurred vision", category: "Eye" },
  { id: "83", name: "Eye pain", category: "Eye" },
  { id: "84", name: "Red eyes", category: "Eye" },
  { id: "85", name: "Itching eyes", category: "Eye" },
  { id: "86", name: "Discharge from eyes", category: "Eye" },

  // ENT (Ear, Nose, Throat) Symptoms
  { id: "87", name: "Sore throat", category: "ENT" },
  { id: "88", name: "Ear pain", category: "ENT" },
  { id: "89", name: "Hearing loss", category: "ENT" },
  { id: "90", name: "Nasal congestion", category: "ENT" },
  { id: "91", name: "Runny nose", category: "ENT" },
  { id: "92", name: "Sneezing", category: "ENT" },
  { id: "93", name: "Loss of taste/smell", category: "ENT" },

  // Infectious/Disease-Specific Clusters
  {
    id: "94",
    name: "Cough + fever + shortness of breath",
    category: "Infectious",
  },
  { id: "95", name: "Fever + joint pain + rash", category: "Infectious" },
  {
    id: "96",
    name: "Night sweats + weight loss + fever",
    category: "Infectious",
  },
];

const TIME_SPAN_OPTIONS: TimeSpanType[] = [
  "< 24 hours",
  "1-3 days",
  "4-7 days",
  "1-2 weeks",
  "2-4 weeks",
  "1+ month",
];

// Symptom category icons
const SYMPTOM_CATEGORY_ICONS: Record<string, JSX.Element> = {
  Neurological: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.83 6.72 2.24"></path>
      <path d="M21 12a9 9 0 0 0-9-9"></path>
      <path d="M12 7v5l3 3"></path>
    </svg>
  ),
  Respiratory: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22a9 9 0 0 0 9-9h-3a6 6 0 0 1-6 6v3Z"></path>
      <path d="M12 22a9 9 0 0 1-9-9h3a6 6 0 0 0 6 6v3Z"></path>
      <path d="M12 2a9 9 0 0 1 9 9h-3a6 6 0 0 0-6-6V2Z"></path>
      <path d="M12 2a9 9 0 0 0-9 9h3a6 6 0 0 1 6-6V2Z"></path>
    </svg>
  ),
  Cardiovascular: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
    </svg>
  ),
  Digestive: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 11c0-5-6-9-6-9s-6 4-6 9a6 6 0 0 0 12 0Z"></path>
      <path d="M6 11c0 4 3.49 8 6 8 1.35 0 2.58-.5 3.59-1.24a6.2 6.2 0 0 0 2.41-4.76"></path>
    </svg>
  ),
  Musculoskeletal: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.5 6.5h11"></path>
      <path d="m21 21-1-1"></path>
      <path d="m3 3 1 1"></path>
      <path d="m18 22-6-6"></path>
      <path d="m6 10-4-4"></path>
      <path d="m10 18-8 3 3-8"></path>
      <path d="m14 6 8-3-3 8"></path>
    </svg>
  ),
  Dermatological: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <path d="m8 14 1.5-1.5"></path>
      <path d="M10.5 16.5 12 15"></path>
      <path d="M10 11c-.5-1-1.5-2-2.5-2"></path>
      <path d="M14 6.5c1 .5 2 1.5 2 2.5"></path>
      <path d="M8.5 10.5c-.5.5-1.5 1-2 1"></path>
      <path d="M11.5 17.5c.5.5 2 .5 2.5 0"></path>
      <path d="M16 12c0 .5-.5 1.5-1 2"></path>
      <path d="M15.5 8.5c.5.5 1 2 .5 3"></path>
    </svg>
  ),
  General: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path>
      <path d="M12 3v6"></path>
    </svg>
  ),
};

// Group symptoms by category
const groupSymptomsByCategory = (symptoms: HealthSymptom[]) => {
  const grouped: Record<string, HealthSymptom[]> = {};

  symptoms.forEach((symptom) => {
    if (!grouped[symptom.category]) {
      grouped[symptom.category] = [];
    }
    grouped[symptom.category].push(symptom);
  });

  return grouped;
};

const SymptomPage: NextPage = () => {
  const [queryText, setQueryText] = useState<string>("");
  const [chosenSymptoms, setChosenSymptoms] = useState<ChosenSymptom[]>([]);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {}
  );
  const [activeSymptom, setActiveSymptom] = useState<HealthSymptom | null>(null);
  const [activeTimeSpan, setActiveTimeSpan] = useState<TimeSpanType>("1-3 days");
  const [activeSeverityLevel, setActiveSeverityLevel] = useState<number>(5);
  const [timeSpanDropdownVisible, setTimeSpanDropdownVisible] =
    useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [currentPhase, setCurrentPhase] = useState<number>(1);
  const [diagnosisOutcome, setDiagnosisOutcome] = useState<
    DiagnosisResult[] | null
  >(null);
  const [serverError, setServerError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const timeSpanDropdownRef = useRef<HTMLDivElement>(null);
  const queryInputRef = useRef<HTMLInputElement>(null);

  const apiEndpoint = "http://localhost:5001";

  // Initialize first category as expanded
  useEffect(() => {
    if (
      Object.keys(openCategories).length === 0 &&
      HEALTH_SYMPTOM_DATA.length > 0
    ) {
      const categories = [...new Set(HEALTH_SYMPTOM_DATA.map((s) => s.category))];
      if (categories.length > 0) {
        setOpenCategories({ [categories[0]]: true });
      }
    }

    // Focus search input on mount
    if (queryInputRef.current) {
      queryInputRef.current.focus();
    }
  }, []);

  // Filter symptoms based on search term
  const queriedSymptoms = HEALTH_SYMPTOM_DATA.filter((symptom) =>
    symptom.name.toLowerCase().includes(queryText.toLowerCase())
  );

  // Group filtered symptoms by category
  const categorizedSymptoms = groupSymptomsByCategory(queriedSymptoms);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        timeSpanDropdownRef.current &&
        or: !timeSpanDropdownRef.current.contains(event.target as Node)
      ) {
        setTimeSpanDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Select/deselect symptom
  const toggleSymptom = (symptom: HealthSymptom) => {
    const isSelected = chosenSymptoms.some((s) => s.id === symptom.id);

    if (isSelected) {
      setChosenSymptoms((prev) => prev.filter((s) => s.id !== symptom.id));
    } else {
      if (chosenSymptoms.length < 4) {
        setActiveSymptom(symptom);
      }
    }
  };

  // Add symptom with duration and severity
  const addSymptomWithDetails = () => {
    if (activeSymptom) {
      const symptomWithDetails: ChosenSymptom = {
        ...activeSymptom,
        duration: activeTimeSpan,
        severity: activeSeverityLevel,
      };

      setChosenSymptoms((prev) => [...prev, symptomWithDetails]);
      setActiveSymptom(null);
      setActiveSeverityLevel(5);
    }
  };

  // Move to review and analysis step
  const moveToReview = () => {
    if (chosenSymptoms.length > 0) {
      setCurrentPhase(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setStatusMessage("Please select at least one symptom");
      setTimeout(() => setStatusMessage(""), 3000);
    }
  };

  // Convert selected symptoms to the format expected by the API
  const formatSymptomsForApi = (symptoms: ChosenSymptom[]): string => {
    return symptoms.map((symptom) => symptom.name).join(", ");
  };

  // Handle submission with actual API call
  const handleSubmit = async () => {
    setIsProcessing(true);
    setStatusMessage("");
    setServerError("");
    setDiagnosisOutcome(null);
    setIsLoading(true);

    try {
      const payload = {
        symptom_text: formatSymptomsForApi(chosenSymptoms),
      };
      console.log("here", payload);
      const response = await fetch(`${apiEndpoint}/api/predict/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      console.log("backend data: ", data);
      setDiagnosisOutcome(data.matches);
      setStatusMessage("Analysis complete!");
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setServerError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      setStatusMessage("An error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
      setIsLoading(false);
    }
  };

  // Render severity label based on value
  const getSeverityLabel = (value: number): string => {
    if (value <= 3) return "Mild";
    if (value <= 6) return "Moderate";
    return "Severe";
  };

  // Get severity color class based on value
  const getSeverityColorClass = (value: number): string => {
    if (value <= 3) return "from-emerald-500 to-lime-400"; // vibrant green
    if (value <= 6) return "from-yellow-500 to-black-400"; // vivid yellow-orange
    return "from-rose-600 to-pink-500"; // striking red-pink
  };

  // Get progress percentage for progress bar
  const getProgressPercentage = (): number => {
    return currentPhase === 1
      ? Math.min(25 + chosenSymptoms.length * 15, 95)
      : isProcessing
      ? 98
      : 95;
  };

  return (
    <>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <Head>
        <title>Medi AI | Symptom Checker</title>
        <meta name="description" content="Check your symptoms with Medi AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-black via-[#006994] to-[#004f63] text-white shadow-[0_0_40px_#006994] ring-1 ring-[#006994]/50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header with Logo and Progress Bar */}
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
                    <path d="M12 2C9.5 2 7 4 7 6.5C7 9 9.5 11 12 11C14.5 11 17 9 17 6.5C17 4 14.5 2 12 2ZM12 9C10.5 9 9 7.5 9 6C9 4.5 10.5 3 12 3C13.5 3 15 4.5 15 6C15 7.5 13.5 9 12 9Z" />
                    <path d="M12 13C10.5 13 9 14.5 9 16C9 17.5 10.5 19 12 19C13.5 19 15 17.5 15 16C15 14.5 13.5 13 12 13ZM12 18C11 18 10 17 10 16C10 15 11 14 12 14C13 14 14 15 14 16C14 17 13 18 12 18Z" />
                  </svg>
                </div>

                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent font-poppins">
                    Doctorदोस्त
                  </h1>
                  <p className="bg-gradient-to-r from-white to-cyan-500 bg-clip-text text-transparent font-poppins">
                    How Are You Feeling?
                  </p>
                </div>
              </div>

              <div className="hidden md:block">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span
                    className={`${
                      currentPhase >= 1 ? "text-white font-medium" : ""
                    }`}
                  >
                    Symptoms
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                  <span
                    className={`${
                      currentPhase >= 2 ? "text-white font-medium" : ""
                    }`}
                  >
                    Review
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                  <span
                    className={`${
                      isProcessing ? "text-white font-medium" : ""
                    }`}
                  >
                    Analysis
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full"
                initial={{ width: "20%" }}
                animate={{ width: `${getProgressPercentage()}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>

            {/* Step Title */}
            <motion.h2
              className="text-2xl font-bold text-white-800"
              key={`step-title-${currentPhase}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {currentPhase === 1
                ? "Tell us about your symptoms"
                : "Review and analyze symptoms"}
            </motion.h2>
            <motion.p
              className="text-white-600"
              key={`step-desc-${currentPhase}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {currentPhase === 1
                ? "Select up to 4 symptoms you're experiencing for an AI-powered health assessment"
                : "Verify your symptom information before receiving an AI analysis"}
            </motion.p>
          </header>

          <AnimatePresence mode="wait">
            {currentPhase === 1 ? (
              <motion.div
                key="symptom-selection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl p-6"
              >
                {/* Symptom Search & Selection */}
                <div className="border-b border-gray-100">
                  <div className="p-6">
                    <div className="relative mb-6">
                      <div className="absolute left-4 top-3.5 text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                      <input
                        ref={queryInputRef}
                        type="text"
                        placeholder="Search symptoms..."
                        className="text-black w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white transition-all shadow-sm"
                        value={queryText}
                        onChange={(e) => setQueryText(e.target.value)}
                      />
                      {queryText && (
                        <button
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          onClick={() => setQueryText("")}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      )}
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-[#004f63]">
                          Selected symptoms:{" "}
                          <span className="font-medium">
                            {chosenSymptoms.length}/4
                          </span>
                        </p>

                        {chosenSymptoms.length > 0 && (
                          <button
                            className="text-sm text-[#004f63] hover:text-teal-800 transition-colors"
                            onClick={() => setChosenSymptoms([])}
                          >
                            Clear all
                          </button>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 min-h-12">
                        <AnimatePresence>
                          {chosenSymptoms?.map((symptom) => (
                            <motion.div
                              key={symptom.id}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.2 }}
                              className="flex items-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1.5 rounded-full text-sm shadow-sm"
                            >
                              <span>{symptom.name}</span>
                              <button
                                onClick={() => toggleSymptom(symptom)}
                                className="ml-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-0.5 transition-colors"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3.5 w-3.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Symptom Categories */}
                <div className="max-h-96 overflow-y-auto">
                  {Object.keys(categorizedSymptoms).length > 0 ? (
                    Object.entries(categorizedSymptoms).map(
                      ([category, symptoms]) => (
                        <div
                          key={category}
                          className="border-b border-gray-100 last:border-b-0"
                        >
                          <button
                            className="w-full flex items-center justify-between p-4 hover:bg-blue-100 transition-colors text-left"
                            onClick={() => toggleCategory(category)}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-[#00796B] shadow-md">
                                {SYMPTOM_CATEGORY_ICONS[category] || (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M8 12h2l1-2 2 4 1-2h2" />
                                  </svg>
                                )}
                              </div>

                              <div>
                                <span className="font-medium text-[#004f63]">
                                  {category}
                                </span>
                                <p className="text-xs text-gray-500">
                                  {symptoms.length} symptoms
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <span className="text-xs text-[#004f63] mr-2">
                                {openCategories[category] ? "Hide" : "Show"}
                              </span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-5 w-5 text-gray-400 transform transition-transform ${
                                  openCategories[category] ? "rotate-180" : ""
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </div>
                          </button>

                          <AnimatePresence>
                            {openCategories[category] && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 py-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                                  {symptoms.map((symptom) => {
                                    const isSelected = chosenSymptoms.some(
                                      (s) => s.id === symptom.id
                                    );
                                    const isDisabled =
                                      !isSelected && chosenSymptoms.length >= 4;

                                    return (
                                      <div
                                        key={symptom.id}
                                        className={`flex items-center p-2 rounded-lg border ${
                                          isSelected
                                            ? "border-blue-500 bg-blue-50"
                                            : isDisabled
                                            ? "border-gray-200 bg-gray-50 opacity-60"
                                            : "border-gray-200 hover:border-teal-200 hover:bg-blue-50"
                                        } cursor-pointer transition-all`}
                                        onClick={() =>
                                          !isDisabled && toggleSymptom(symptom)
                                        }
                                      >
                                        {/* check box */}
                                        <div
                                          className={`w-5 h-5 flex-shrink-0 rounded-md border ${
                                            isSelected
                                              ? "bg-[#004f63] border-teal-500"
                                              : "border-gray-300"
                                          } flex items-center justify-center mr-3`}
                                        >
                                          {isSelected && (
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              className="h-3 w-3 text-white"
                                              viewBox="0 0 20 20"
                                              fill="currentColor"
                                            >
                                              <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                              />
                                            </svg>
                                          )}
                                        </div>
                                        <label
                                          className={`flex-grow ${
                                            isDisabled
                                              ? "text-gray-400"
                                              : "text-gray-700"
                                          }`}
                                        >
                                          {symptom.name}
                                        </label>
                                        {isSelected && (
                                          <div className="text-xs bg-[#004f63] text-white-800 px-2 py-0.5 rounded-full">
                                            Added
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )
                    )
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-gray-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                          <path d="M12 17h.01"></path>
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No symptoms found
                      </h3>
                      <p className="text-gray-500">
                        Try searching with different terms or browse categories
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <div className="p-6 bg-gray-50 border-t border-gray-100">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className={`px-6 py-3 rounded-xl font-medium transition-all ${
                        chosenSymptoms.length === 0
                          ? "bg-blue-200 text-gray-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-500 to-[#cc9900] text-white shadow-md hover:shadow-lg hover:from-teal-600 hover:to-cyan-600"
                      }`}
                      onClick={moveToReview}
                      disabled={chosenSymptoms.length === 0}
                    >
                      Continue to Review
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 inline-block ml-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                    </button>
                  </div>

                  {statusMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 text-center text-red-600 text-sm"
                    >
                      {statusMessage}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ) : diagnosisOutcome ? (
              // Display results if we have them
              <motion.div
                key="prediction-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-red rounded-2xl shadow-xl overflow-hidden"
              >
                {/* Results Section */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
                    AI Health Assessment Results
                  </h3>

                  <div className="mb-6">
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-blue-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                            <rect
                              x="8"
                              y="2"
                              width="8"
                              height="4"
                              rx="1"
                              ry="1"
                            ></rect>
                          </svg>
                        </div>
                        {diagnosisOutcome && (
                          <div>
                            <h4 className="text-lg font-medium text-gray-900">
                              Possible Condition
                            </h4>
                            <div className="flex items-center">
                              <span className="text-xl font-bold text-blue-800">
                                {diagnosisOutcome[0].disease}
                              </span>
                              <span className="ml-3 bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full">
                                {(Math.random() * (98 - 70) + 70).toFixed(1)}%
                                confidence
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      <p className="text-sm text-gray-600 mb-4">
                        Based on your symptoms:{" "}
                        <strong>{formatSymptomsForApi(chosenSymptoms)}</strong>
                      </p>

                      <div className="text-xs text-blue-700">
                        <strong>Note:</strong> This is an AI-generated assessment
                        and should not replace professional medical advice.
                      </div>
                    </div>
                  </div>

                  {/* Medications Section */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-4 bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
                      Recommended Medications
                    </h4>

                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Medication
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Dosage
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Price (INR)
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {diagnosisOutcome &&
                            diagnosisOutcome.slice(0, 3).map((result, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {result.medicines[0]}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {result.dosages[0]}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  ₹{result.prices[0]}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="mt-6 p-4 bg-yellow-50 border border-yellow-100 rounded-xl"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-yellow-600"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-yellow-800 mb-1">
                          Important Medical Disclaimer
                        </h4>
                        <p className="text-sm text-yellow-700">
                          This assessment is for informational purposes only. The
                          medications listed above may not be suitable for your
                          specific condition. Always consult with a healthcare
                          professional before taking any medication.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="mt-6 p-4 bg-yellow-50 border border-yellow-100 rounded-xl"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-yellow-600"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12

" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-red-800 mb-1">
                          Seek Urgent Medical Attention If You Experience:
                        </h4>
                        <ul className="list-disc pl-5 text-sm text-red-700 space-y-1">
                          <li>Vomiting that is persistent or severe</li>
                          <li>
                            Vision changes (blurred, double, or loss of vision)
                          </li>
                          <li>Loss of consciousness or fainting</li>
                          <li>Difficulty breathing or shortness of breath</li>
                          <li>
                            High fever (above 103°F or 39.4°C) that doesn’t go
                            down
                          </li>
                          <li>Sharp, intensely painful abdominal pain</li>
                          <li>
                            Painful urination accompanied by fever or back pain
                          </li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 bg-gray-50 border-t border-gray-100">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0">
                    <button
                      type="button"
                      className="flex items-center justify-center text-blue-600 hover:text-blue-800 transition-colors"
                      onClick={() => {
                        setCurrentPhase(1);
                        setDiagnosisOutcome(null);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m15 18-6-6 6-6"></path>
                      </svg>
                      Start New Assessment
                    </button>

                    <button
                      type="button"
                      className="px-6 py-3 rounded-xl font-medium transition-all bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md hover:shadow-lg hover:from-blue-600 hover:to-cyan-600"
                    >
                      Find a Doctor near me
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              // Review UI (original code)
              <motion.div
                key="symptom-review"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                {/* Review Section */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Symptom Summary
                  </h3>

                  <div className="space-y-4">
                    {chosenSymptoms.map((symptom, index) => (
                      <motion.div
                        key={symptom.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="p-4 border border-gray-100 rounded-xl shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                              {SYMPTOM_CATEGORY_ICONS[symptom.category] || (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 text-teal-600"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <path d="M12 16v-4"></path>
                                  <path d="M12 8h.01"></path>
                                </svg>
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {symptom.name}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {symptom.category}
                              </p>
                            </div>
                          </div>
                          <button
                            className="text-blue-400 hover:text-red-500 transition-colors"
                            onClick={() => {
                              setChosenSymptoms((prev) =>
                                prev.filter((s) => s.id !== symptom.id)
                              );
                              if (chosenSymptoms.length === 1) {
                                setCurrentPhase(1);
                              }
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M18 6 6 18"></path>
                              <path d="m6 6 12 12"></path>
                            </svg>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-blue-600"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M12 8v4l3 3"></path>
                                <circle cx="12" cy="12" r="10"></circle>
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Duration</p>
                              <p className="font-medium text-gray-800">
                                {symptom.duration}
                              </p>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500 mb-1">
                              Severity: {symptom.severity}/10
                            </p>
                            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full bg-gradient-to-r ${getSeverityColorClass(
                                  symptom.severity
                                )}`}
                                style={{
                                  width: `${(symptom.severity / 10) * 100}%`,
                                }}
                              ></div>
                            </div>
                            <p className="text-xs text-right mt-1 font-medium text-blue-600">
                              {getSeverityLabel(symptom.severity)}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Error message if API call failed */}
                  {serverError && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl"
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-red-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-red-800 mb-1">
                            Error Connecting to Server
                          </h4>
                          <p className="text-sm text-red-700">
                            {serverError}. Please try again later or contact
                            support.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Medical Disclaimer */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-600"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                          <path d="M12 16v-4"></path>
                          <path d="M12 8h.01"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-800 mb-1">
                          Medical Disclaimer
                        </h4>
                        <p className="text-sm text-blue-700">
                          This assessment is for informational purposes only and
                          doesn't replace medical advice. Please consult a
                          healthcare professional for diagnosis and treatment.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 bg-gray-50 border-t border-gray-100">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0">
                    <button
                      type="button"
                      className="flex items-center justify-center text-blue-600 hover:text-teal-800 transition-colors"
                      onClick={() => setCurrentPhase(1)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m15 18-6-6 6-6"></path>
                      </svg>
                      Back to Symptoms
                    </button>

                    <button
                      type="button"
                      className={`px-6 py-3 rounded-xl font-medium transition-all ${
                        isProcessing || isLoading
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-gradient-to-r from-cyan-500 to-[#006699] text-white shadow-md hover:shadow-lg hover:from-teal-600 hover:to-cyan-600"
                      }`}
                      onClick={handleSubmit}
                      disabled={isProcessing || isLoading}
                    >
                      {isProcessing || isLoading ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Analyzing Symptoms...
                        </span>
                      ) : (
                        "Get AI Health Assessment"
                      )}
                    </button>
                  </div>

                  {statusMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 text-center text-red-600 text-sm"
                    >
                      {statusMessage}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Help Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-5 border-l-4 border-blue-500 flex items-center">
              <div className="mr-4 flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-2c-.6 0-1 .4-1 1v6c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z"></path>
                    <path d="M18 18h-2c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1Z"></path>
                    <path d="M18 10h-2c-.6 0-1 .4-1 1v6c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-6c0-.6-.4-1-1-1Z"></path>
                    <path d="M8 2H6c-.6 0-1 .4-1 1v10c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z"></path>
                    <path d="M8 14H6c-.6 0-1 .4-1 1v6c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-6c0-.6-.4-1-1-1Z"></path>
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Need assistance?
                </h3>
                <p className="text-sm text-gray-600">
                  Our health assistants are available 24/7 to help you with any
                  questions about your symptoms.
                </p>
              </div>
              <div className="ml-auto">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-blue-500 text-sm font-medium rounded-lg text-blue-700 bg-white hover:bg-cyan-50 transition-colors"
                >
                  Chat with assistant
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Symptom Details Modal */}
      <AnimatePresence>
        {activeSymptom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    {SYMPTOM_CATEGORY_ICONS[activeSymptom.category] || (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-teal-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 16v-4"></path>
                        <path d="M12 8h.01"></path>
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {activeSymptom.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {activeSymptom.category}
                    </p>
                  </div>
                </div>
                <button
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setActiveSymptom(null)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Duration Selection */}
              <div className="mb-8">
                <label className="block text-gray-700 font-medium mb-2">
                  Duration of symptom
                </label>
                <div className="relative" ref={timeSpanDropdownRef}>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    onClick={() =>
                      setTimeSpanDropdownVisible(!timeSpanDropdownVisible)
                    }
                  >
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-teal-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{activeTimeSpan}</span>
                    </div>
                                        <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 text-gray-400 transform transition-transform ${
                        timeSpanDropdownVisible ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {timeSpanDropdownVisible && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
                      >
                        {TIME_SPAN_OPTIONS.map((option) => (
                          <button
                            key={option}
                            type="button"
                            className={`w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-[#004f63] transition-colors ${
                              activeTimeSpan === option
                                ? "bg-blue-50 text-[#004f63] font-medium"
                                : ""
                            }`}
                            onClick={() => {
                              setActiveTimeSpan(option);
                              setTimeSpanDropdownVisible(false);
                            }}
                          >
                            {option}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Severity Slider */}
              <div className="mb-8">
                <label className="block text-gray-700 font-medium mb-2">
                  Severity: {activeSeverityLevel}/10 (
                  {getSeverityLabel(activeSeverityLevel)})
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={activeSeverityLevel}
                  onChange={(e) => setActiveSeverityLevel(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none bg-gray-200 cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #${getSeverityColorClass(
                      activeSeverityLevel
                    ).split(" ")[0].replace("from-", "")} ${
                      (activeSeverityLevel / 10) * 100
                    }%, #e5e7eb ${(activeSeverityLevel / 10) * 100}%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Mild</span>
                  <span>Moderate</span>
                  <span>Severe</span>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => setActiveSymptom(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-[#006699] text-white rounded-lg shadow-md hover:shadow-lg hover:from-teal-600 hover:to-cyan-600 transition-all"
                  onClick={addSymptomWithDetails}
                >
                  Add Symptom
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
};

export default SymptomPage;