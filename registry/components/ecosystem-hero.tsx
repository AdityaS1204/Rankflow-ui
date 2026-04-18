"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Sparkles } from "lucide-react";
import { SiGmail, SiNotion } from "react-icons/si";

const FractalWall = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none flex overflow-hidden opacity-80">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="flex-1 h-full border-l border-white/60 bg-linear-to-r from-black/[0.03] to-transparent shadow-[inset_10px_0_20px_-10px_rgba(0,0,0,0.05)]"
        />
      ))}
    </div>
  );
};

const NavDropdown = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center gap-1 text-sm text-neutral-300 hover:text-white transition-colors py-2">
        {title}
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-3 h-3 text-neutral-500" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-48 bg-[#1A1A1A]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2 z-50 origin-top"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DropdownLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="block px-4 py-2 text-sm text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
  >
    {children}
  </a>
);

export function EcosystemHero() {
  return (
    <div className="min-h-screen bg-[#F0F0F0] relative overflow-hidden font-sans pb-20">
      <FractalWall />

      {/* Floating Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-4xl px-4"
      >
        <div className="bg-[#1A1A1A] rounded-xl px-3 py-2 flex items-center justify-between shadow-2xl backdrop-blur-md border border-white/10">
          <div className="flex items-center gap-6">
            <div className="text-white font-black text-xl italic tracking-tighter px-3">
              logo<span className="text-neutral-400">™</span>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <NavDropdown title="Products">
                <DropdownLink href="#">AI Support Agent</DropdownLink>
                <DropdownLink href="#">Knowledge Base</DropdownLink>
                <DropdownLink href="#">Analytics Dashboard</DropdownLink>
              </NavDropdown>
              <NavDropdown title="Resources">
                <DropdownLink href="#">Blog</DropdownLink>
                <DropdownLink href="#">Case Studies</DropdownLink>
                <DropdownLink href="#">Documentation</DropdownLink>
              </NavDropdown>
              <NavDropdown title="Integrations">
                <DropdownLink href="#">Zendesk</DropdownLink>
                <DropdownLink href="#">Intercom</DropdownLink>
                <DropdownLink href="#">Salesforce</DropdownLink>
              </NavDropdown>
              <NavDropdown title="More">
                <DropdownLink href="#">About Us</DropdownLink>
                <DropdownLink href="#">Careers</DropdownLink>
                <DropdownLink href="#">Contact</DropdownLink>
              </NavDropdown>
            </div>
          </div>
          <div className="flex items-center gap-2 relative z-20">
            <button className="px-4 py-2 text-sm text-neutral-300 hover:text-white transition-colors hidden sm:block">
              Log in
            </button>
            <button className="px-5 py-2 bg-white text-black text-sm font-semibold rounded-xl shadow-[inset_0px_-2px_4px_rgba(0,0,0,0.2)] hover:bg-neutral-100 transition-colors">
              Join the waitlist
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="w-full max-w-8xl mx-auto flex flex-col lg:flex-row items-center justify-center min-h-screen pt-28 lg:pt-20 px-6 lg:px-12 relative z-10">
        
        {/* Left Typography Side */}
        <div className="w-full lg:w-[55%] flex flex-col items-start pr-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-3xl p-4 shadow-[0_10px_20px_rgba(0,0,0,0.05),inset_0_2px_5px_rgba(255,255,255,1)] mb-6 flex items-center justify-center border border-neutral-100"
          >
            <Sparkles className="w-8 h-8 text-black fill-black" strokeWidth={1} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl flex flex-col gap-1 text-black"
          >
            <span className="font-serif italic font-medium tracking-normal text-3xl sm:text-4xl lg:text-5xl text-neutral-800">
              Axora AI
            </span>
            <span className="font-semibold tracking-tighter leading-[0.9] text-black whitespace-nowrap">
              Customer Support
            </span>
            <span className="font-semibold tracking-tighter leading-[0.9] text-black whitespace-nowrap">
              Ecosystem
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-lg text-neutral-600 font-medium text-lg mt-6 leading-relaxed"
          >
            We resolve <span className="text-black font-bold">60-80%</span> of your
            customers' complex support issues via phone, email, and web, reducing
            your costs <span className="text-black font-bold">by over 50%</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10"
          >
            <button className="px-8 py-4 bg-[#111] text-white rounded-xl font-semibold text-lg shadow-[0_20px_40px_-5px_rgba(0,0,0,0.5),inset_0px_2px_4px_rgba(255,255,255,0.4),inset_0px_-3px_6px_rgba(0,0,0,0.8)] hover:scale-[1.02] active:scale-[0.98] transition-all">
              Join the waitlist
            </button>
          </motion.div>
        </div>

        {/* Right Dashboard Image Side */}
        <div className="w-full lg:w-[36%] relative mt-24 lg:mt-0">
          
          {/* 3D Gmail Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -20, x: 20 }}
            animate={{ opacity: 1, scale: 1, rotate: 12, x: 0 }}
            transition={{ duration: 1, delay: 0.5, type: "spring", bounce: 0.4 }}
            className="absolute -top-22 -right-4 lg:right-10 bg-[#F0F0F0] border-[6px] border-white p-3 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15),inset_0_4px_10px_rgba(255,255,255,1),inset_0_-4px_10px_rgba(0,0,0,0.05)] z-20 hover:rotate-0 hover:scale-110 transition-all cursor-pointer"
          >
            <SiGmail className="w-14 h-14 text-[#EA4335]" />
          </motion.div>

          {/* 3D Notion Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: 20, x: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: -15, x: 0 }}
            transition={{ duration: 1, delay: 0.6, type: "spring", bounce: 0.4 }}
            className="absolute -bottom-16 -left-4 lg:-left-12 bg-[#F0F0F0] border-[6px] border-white p-3 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15),inset_0_4px_10px_rgba(255,255,255,1),inset_0_-4px_10px_rgba(0,0,0,0.05)] z-20 hover:rotate-0 hover:scale-110 transition-all cursor-pointer"
          >
            <SiNotion className="w-12 h-12 text-black" />
          </motion.div>

          {/* Dashboard UI Wrapper */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] bg-white border border-neutral-200/60 w-full lg:w-[140%] lg:mr-[-40%] z-10 aspect-[5/4] sm:aspect-auto flex flex-col"
          >
            {/* Mac Titlebar */}
            <div className="bg-white/80 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-neutral-100 relative z-20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-sm border border-red-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-sm border border-yellow-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-sm border border-green-500/20"></div>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 bg-neutral-100 px-24 py-1.5 rounded-md text-[10px] text-neutral-500 flex items-center justify-center font-medium shadow-sm border border-neutral-200/50">
                axora.ai
              </div>
            </div>
            
            {/* Dashboard Content - Using Unsplash as requested */}
            <div className="relative w-full flex-1 bg-neutral-50">
              <img
                src="https://i.pinimg.com/1200x/7c/2f/95/7c2f95f7264fcd443c52904c9f9cf779.jpg"
                alt="Product Dashboard Mockup"
                className="w-full h-full object-cover object-left-top mix-blend-multiply opacity-90"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
