"use client";

import React, { useState, useEffect } from "react";
import { FaGoogle, FaApple, FaFacebook, FaArrowLeft, FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

const testimonials = [
  {
    text: "I was able to reduce the time taken to present high-level designs by 35% using the platform.",
    name: "Sara Bright",
    role: "Freelance Designer",
  },
  {
    text: "This component library has completely transformed the way my team builds interactive UIs.",
    name: "Michael Chen",
    role: "Frontend Lead",
  },
  {
    text: "An absolute game-changer for our agency. The speed and quality we can deliver now is unmatched.",
    name: "Emma Watson",
    role: "Creative Director",
  }
];

interface SignUpFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const [index, setIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => setIndex((i) => (i + 1) % testimonials.length);
  const prevTestimonial = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <div
      className={cn("relative mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-[32px] bg-white shadow-2xl md:flex-row shadow-black/5", className)}
      {...props}
    >
      {/* Left Pane (Form) */}
      <div className="flex w-full flex-col justify-center px-8 py-12 md:w-1/2 md:p-14 text-neutral-900 border-r border-neutral-100/50">
        <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100/50 text-[#eb5e28]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            <path d="M13 3L4 14h7v7l9-11h-7V3z" fill="currentColor" />
          </svg>
        </div>

        <h2 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl leading-tight">Create an account</h2>
        <p className="mb-8 text-neutral-500 text-sm max-w-[340px]">
          Start exploring and utilizing all the resources that will help you elevate every design you make.
        </p>

        <form className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-1.5">
            <label className="text-sm font-semibold" htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              className="rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <label className="text-sm font-semibold" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Your email"
              className="rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white"
            />
          </div>
          <div className="relative flex flex-col space-y-1.5">
            <label className="text-sm font-semibold" htmlFor="password">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="w-full rounded-xl border border-neutral-200 px-4 py-3 pr-10 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="button"
            className="mt-2 w-full rounded-xl bg-[#eb5e28] px-4 py-4 font-semibold text-white transition hover:bg-[#d65220] shadow-xl shadow-orange-100/50"
          >
            Create account
          </button>
        </form>

        <div className="my-8 flex w-full items-center">
          <div className="flex-1 border-b border-neutral-100"></div>
          <span className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">OR</span>
          <div className="flex-1 border-b border-neutral-100"></div>
        </div>

        <div className="flex w-full flex-row gap-3">
          <button className="flex h-12 w-full items-center justify-center rounded-xl border border-neutral-200 transition hover:bg-neutral-50 mb-0">
            <FaGoogle className="h-5 w-5 text-black" />
          </button>
          <button className="flex h-12 w-full items-center justify-center rounded-xl border border-neutral-200 transition hover:bg-neutral-50 mb-0">
            <FaFacebook className="h-5 w-5 text-black" />
          </button>
          <button className="flex h-12 w-full items-center justify-center rounded-xl border border-neutral-200 transition hover:bg-neutral-50 mb-0">
            <FaApple className="h-5 w-5 text-black" />
          </button>
        </div>

        <p className="mt-8 text-center text-sm font-medium text-neutral-600">
          Already have an account? <span className="font-semibold text-[#eb5e28] cursor-pointer hover:underline">Log in</span>
        </p>
      </div>

      {/* Right Pane (Normal Gradient + Testimonial Layer) */}
      <div className="relative hidden w-1/2 p-6 md:flex">
        <div className="relative flex h-full w-full flex-col justify-end overflow-hidden rounded-[40px] bg-linear-to-br from-[#f2b38e] via-[#db5d38] to-[#993b22] px-8 py-10">
          {/* Mesh background effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-[#fcc7a6] via-[#d4562e] to-transparent opacity-60 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,var(--tw-gradient-stops))] from-[#993b22] via-transparent to-transparent opacity-80 mix-blend-multiply"></div>
          
          {/* Decorative badges */}
          <div className="absolute left-10 top-12 flex flex-col gap-2">
            <div className="flex gap-2">
              <div className="flex -space-x-2">
                {[
                  "bg-linear-to-tr from-yellow-200 to-orange-400",
                  "bg-linear-to-tr from-pink-300 to-rose-500",
                  "bg-linear-to-tr from-purple-300 to-indigo-500"
                ].map((gradient, i) => (
                  <div key={i} className={cn("h-8 w-8 rounded-full border-2 border-white/40 shadow-sm", gradient)} />
                ))}
              </div>
              <span className="flex items-center rounded-full bg-white/10 px-3 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md ring-1 ring-white/20">
                Join 10k+ designers
              </span>
            </div>
          </div>

          {/* Testimonial Card (Small height, Floating) */}
          <div className="relative z-10 w-full mb-8">
            <div className="rounded-3xl bg-white/10 p-8 shadow-2xl backdrop-blur-xl ring-1 ring-white/20 border border-white/10">
              <div className="min-h-[140px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.02, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="mb-6 text-xl font-medium leading-relaxed text-white">
                      "{testimonials[index].text}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-10 w-10 rounded-full border border-white/30 shadow-inner",
                        index === 0 ? "bg-linear-to-tr from-blue-400 to-indigo-600" :
                        index === 1 ? "bg-linear-to-tr from-emerald-400 to-teal-600" :
                        "bg-linear-to-tr from-orange-400 to-red-600"
                      )} />
                      <div>
                        <p className="text-sm font-bold text-white tracking-wide">{testimonials[index].name}</p>
                        <p className="text-xs text-white/60">{testimonials[index].role}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Navigation Buttons Row (Inside) */}
          <div className="relative z-10 flex gap-4 pl-2">
            <button 
              onClick={prevTestimonial}
              className="group flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-[#eb5e28] ring-1 ring-white/20 hover:ring-white active:scale-95"
            >
              <FaArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="group flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-[#eb5e28] ring-1 ring-white/20 hover:ring-white active:scale-95"
            >
              <FaArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
