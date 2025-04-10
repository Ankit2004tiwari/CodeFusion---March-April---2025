"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

const features = [
  {
    name: "Breach Monitoring Alerts",
    slug: "breach-monitoring",
    description:
      "Get real-time alerts for breaches, suspicious logins, and firewall bypass attempts to secure critical data instantly.",
  },
  {
    name: "AI Threat Scanner",
    slug: "ai-threat-scanner",
    description:
      "Analyze scripts, files, or text using AI to detect malware, phishing, and zero-day threats proactively.",
  },
  {
    name: "Cyber Hygiene Score",
    slug: "cyber-hygiene-score",
    description:
      "Audit password strength, 2FA, and update practices—like a credit score, but for your cybersecurity posture.",
  },
  {
    name: "Attack Simulation",
    slug: "attack-simulation",
    description:
      "Run simulated phishing, brute-force, and SQL injection attacks to find vulnerabilities and train users.",
  },
  {
    name: "Secure Password Vault",
    slug: "password-vault",
    description:
      "Encrypt and manage your passwords securely in a personal vault with export, import, and 2FA protection.",
  },
  {
    name: "Location-Based Login Alerts",
    slug: "location-login-alerts",
    description:
      "Stay informed when logins occur from unfamiliar or suspicious locations to prevent account takeover.",
  },
  {
    name: "Zero Trust Login System",
    slug: "zero-trust-login",
    description:
      "Authenticate every session with continuous, context-based policies that block risky or unauthorized access.",
  },
  {
    name: "Interactive Security Labs",
    slug: "security-labs",
    description:
      "Practice ethical hacking, pen testing, and secure coding in sandboxed labs designed for real-world learning.",
  },
  {
    name: "Malicious File & Link Analyzer",
    slug: "malicious-analyzer",
    description:
      "Upload files or paste URLs to detect ransomware, malware, or phishing with signature + AI-based detection.",
  },
  {
    name: "Session & Device Management Dashboard",
    slug: "session-device-management",
    description:
      "Monitor and manage your active sessions, devices, and terminate unauthorized activity in real-time.",
  },
];

export default function DashboardPage() {
  const [userName, setUserName] = useState("Guest");
  const [greetingType, setGreetingType] = useState("guest");

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    const storedName = localStorage.getItem("userName");

    if (userType === "register" && storedName) {
      setUserName(storedName);
      setGreetingType("register");
      localStorage.removeItem("userType");
      localStorage.removeItem("userName");
    } else {
      const fetchUserName = async () => {
        try {
          const res = await fetch("/api/getUserName");
          const data = await res.json();
          const name = data?.name || "Guest";
          setUserName(name);
          setGreetingType(name === "Guest" ? "guest" : "signin");
        } catch {
          setUserName("Guest");
          setGreetingType("guest");
        }
      };
      fetchUserName();
    }
  }, []);

  const greeting = (() => {
    if (greetingType === "signin") {
      return `Welcome back, ${userName}. Your security command center is ready.`;
    }
    if (greetingType === "register") {
      return `Welcome aboard, ${userName}. Let’s build your secure future together.`;
    }
    return `Welcome, Guest. Explore enterprise-grade cybersecurity features.`;
  })();

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen px-6 py-12 bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900"
    >
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-4 text-blue-900 dark:text-blue-300"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {greeting}
      </motion.h2>

      <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
        Explore your AI-enhanced cybersecurity dashboard designed for
        professionals and enterprise security teams.
      </p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {features.map((feature, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="relative group bg-white/60 dark:bg-white/10 backdrop-blur-md border border-blue-100 dark:border-blue-900 rounded-2xl p-6 shadow-xl overflow-hidden transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 to-teal-100/20 dark:from-blue-900/30 dark:to-gray-800/30 opacity-0 group-hover:opacity-100 transition duration-300 blur-md rounded-2xl" />

            <Link href={`/Features/${feature.slug}`}>
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl font-bold">
                      {feature.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="ml-4 text-xl font-semibold text-gray-800 dark:text-blue-300 group-hover:text-indigo-600 transition-colors">
                    {feature.name}
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
