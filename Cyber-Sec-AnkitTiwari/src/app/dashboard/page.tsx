"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

const features = [
  {
    name: "Breach Monitoring Alerts",
    slug: "breach-monitoring",
    description:
      "Stay instantly informed about suspicious activities and data breach attempts.",
  },
  {
    name: "AI Threat Scanner",
    slug: "ai-threat-scanner",
    description:
      "Real-time AI analysis of files, links, and scripts to detect sophisticated threats.",
  },
  {
    name: "Cyber Hygiene Score",
    slug: "cyber-hygiene-score",
    description:
      "Assess the strength of your cybersecurity posture and receive actionable insights.",
  },
  {
    name: "Attack Simulation",
    slug: "attack-simulation",
    description:
      "Simulate real-world cyberattacks to expose vulnerabilities and train your team.",
  },
  {
    name: "Secure Password Vault",
    slug: "password-vault",
    description:
      "Safely store and manage strong passwords using military-grade encryption.",
  },
  {
    name: "Location-Based Login Alerts",
    slug: "location-login-alerts",
    description:
      "Get alerted for unusual login attempts based on geolocation tracking.",
  },
  {
    name: "Zero Trust Login System",
    slug: "zero-trust-login",
    description:
      "Adopt Zero Trust principles with continuous verification and session control.",
  },
  {
    name: "Interactive Security Labs",
    slug: "security-labs",
    description:
      "Hands-on labs for secure coding, penetration testing, and red-team practice.",
  },
  {
    name: "Malicious File & Link Analyzer",
    slug: "malicious-analyzer",
    description:
      "Instant analysis of links and files to identify malware and phishing threats.",
  },
  {
    name: "Session & Device Management Dashboard",
    slug: "session-device-management",
    description:
      "Visualize and manage active sessions and connected devices in real-time.",
  },
];

export default function DashboardPage() {
  const [userName, setUserName] = useState("Guest");
  const [greetingType, setGreetingType] = useState("guest");

  useEffect(() => {
    const type = localStorage.getItem("userType");
    const name = localStorage.getItem("userName");

    if (type === "register" && name) {
      setUserName(name);
      setGreetingType("register");
      localStorage.removeItem("userType");
      localStorage.removeItem("userName");
    } else {
      const fetchUserName = async () => {
        try {
          const res = await fetch("/api/getUserName");
          const data = await res.json();
          setUserName(data?.name || "Guest");
          setGreetingType(data?.name ? "signin" : "guest");
        } catch {
          setUserName("Guest");
          setGreetingType("guest");
        }
      };
      fetchUserName();
    }
  }, []);

  const greeting = (() => {
    switch (greetingType) {
      case "signin":
        return `Welcome back, ${userName}. Your digital fortress awaits. 🛡️`;
      case "register":
        return `Welcome to Guardian AI, ${userName}. Let’s build your security legacy. 🔐`;
      default:
        return `Welcome to Guardian AI – Explore our security features in guest mode.`;
    }
  })();

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen px-4 sm:px-8 py-10 bg-gradient-to-br from-blue-50 to-teal-100 dark:from-gray-950 dark:to-gray-900"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-gray-800 dark:text-blue-300 drop-shadow-sm">
          {greeting}
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-400 text-lg">
          Dive into your cybersecurity command center and unleash
          enterprise-grade protection.
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
    </motion.div>
  );
}
