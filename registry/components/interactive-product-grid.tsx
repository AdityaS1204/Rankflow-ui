"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { cn } from "@/lib/utils";

const PRODUCTS = [
  { id: "1", title: "Air Max Dn", subtitle: "Men's Shoes", price: "$275", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop" },
  { id: "2", title: "Dunk Low Retro", subtitle: "Men's Lifestyle", price: "$115", image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800&auto=format&fit=crop" },
  { id: "3", title: "Zoom Vomero 5", subtitle: "Women's Running", price: "$160", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop" },
  { id: "4", title: "Air Force 1 '07", subtitle: "Classic Sneakers", price: "$110", image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=800&auto=format&fit=crop" },
  { id: "5", title: "Samba OG", subtitle: "Originals", price: "$100", image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=800&auto=format&fit=crop" },
  { id: "6", title: "Gel-Kayano 14", subtitle: "Running", price: "$150", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop" },
  { id: "7", title: "XT-6 Gore-Tex", subtitle: "Trail", price: "$200", image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=800&auto=format&fit=crop" },
  { id: "8", title: "Made in USA 990v6", subtitle: "Premium Lifestyle", price: "$220", image: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=800&auto=format&fit=crop" },
  { id: "9", title: "Old Skool Core", subtitle: "Skateboarding", price: "$75", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop" },
];

const GALLERY = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=800&auto=format&fit=crop",
];

const SPRING_TRANSITION = { type: "spring" as const, stiffness: 300, damping: 30 };

export function InteractiveProductGrid() {
  const [activeItem, setActiveItem] = useState<typeof PRODUCTS[0] | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (activeItem) {
      document.body.style.overflow = "hidden";
      setActiveImageIndex(0);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeItem]);

  return (
    <LayoutGroup>
      <div className="w-full max-w-6xl mx-auto px-4 py-12 font-sans">
        {/* 6 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {PRODUCTS.slice(0, 6).map((item) => (
            <ProductCard 
              key={item.id} 
              item={item} 
              onClick={setActiveItem} 
              layoutIdPrefix="grid" 
              isActive={activeItem?.id === item.id} 
            />
          ))}
        </div>

      {/* Expanded Modal Overlay */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none sm:p-6 overflow-y-auto w-full h-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm pointer-events-auto"
              onClick={() => setActiveItem(null)}
            />
            
            <motion.div
              layoutId={`grid-card-${activeItem.id}`}
              transition={SPRING_TRANSITION}
              className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl pointer-events-auto flex flex-col relative my-auto overflow-hidden h-[90svh] sm:h-[85svh] z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 w-11 h-11 bg-white hover:bg-neutral-100 rounded-full flex items-center justify-center transition-colors shadow-md border border-neutral-100"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="flex-1 overflow-y-auto flex flex-col">
                <div className="flex flex-col md:flex-row p-3">
                  {/* Left: Product Images Array */}
                  <div className="w-full md:w-1/2 flex flex-col gap-3 p-1">
                    <div className="relative w-full aspect-4/5 sm:aspect-square overflow-hidden rounded-xl bg-neutral-100 shrink-0">
                      <motion.img
                        layoutId={`grid-image-${activeItem.id}`}
                        transition={SPRING_TRANSITION}
                        src={activeItem.image}
                        alt={activeItem.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <AnimatePresence>
                        {activeImageIndex !== 0 && (
                          <motion.img
                            key={activeImageIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            src={GALLERY[activeImageIndex]}
                            alt="Gallery preview"
                            className="absolute inset-0 w-full h-full object-cover z-10"
                          />
                        )}
                      </AnimatePresence>
                      <motion.div
                        layoutId={`grid-arrow-${activeItem.id}`}
                        className="absolute top-4 left-4 w-0 h-0 opacity-0"
                      />
                    </div>

                    {/* Sub-gallery array */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, transition: { duration: 0.05 } }}
                      transition={{ delay: 0.15 }}
                      className="flex gap-3 h-24 sm:h-28"
                    >
                      {[activeItem.image, ...GALLERY.slice(1)].map((img, idx) => (
                        <button 
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={cn(
                            "relative flex-1 rounded-xl overflow-hidden bg-neutral-100 border-2 transition-all",
                            activeImageIndex === idx ? "border-neutral-900" : "border-transparent hover:border-neutral-200"
                          )}
                        >
                          <img src={img} className="w-full h-full object-cover shadow-sm" alt="gallery thumbnail" />
                        </button>
                      ))}
                    </motion.div>
                  </div>

                  {/* Right: Product Details */}
                  <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-between">
                    <div>
                      <motion.h3
                        layoutId={`grid-title-${activeItem.id}`}
                        className="text-3xl sm:text-[40px] font-medium tracking-tight text-neutral-900 leading-none"
                      >
                        {activeItem.title}
                      </motion.h3>
                      <motion.p
                        layoutId={`grid-subtitle-${activeItem.id}`}
                        className="text-lg text-neutral-500 mt-3 font-medium"
                      >
                        {activeItem.subtitle}
                      </motion.p>
                      <motion.div
                        layoutId={`grid-price-${activeItem.id}`}
                        className="text-[2.5rem] font-medium text-neutral-900 mt-6 tracking-tight leading-none"
                      >
                        {activeItem.price}
                      </motion.div>

                      {/* Sizes Section */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, transition: { duration: 0.05 } }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                        className="mt-10"
                      >
                        <h4 className="text-[13px] font-bold text-neutral-400 mb-4 uppercase tracking-widest">
                          Select Size
                        </h4>
                        <div className="flex gap-2.5 flex-wrap">
                          {["US 7", "US 8", "US 9", "US 10", "US 11.5"].map((size) => (
                            <button
                              key={size}
                              className="px-6 py-3 rounded-full border border-neutral-200 text-[15px] font-semibold text-neutral-700 hover:border-neutral-900 hover:text-neutral-900 transition-colors focus:bg-neutral-900 focus:text-white focus:border-neutral-900 focus:outline-none"
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    {/* Actions */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, transition: { duration: 0.05 } }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="mt-12 flex flex-col gap-3"
                    >
                      <button className="w-full bg-black text-white rounded-full py-4 text-[16px] font-semibold shadow-xl shadow-black/10 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                        Add to Cart
                      </button>
                      <button className="w-full bg-neutral-100 text-neutral-900 rounded-full py-4 text-[16px] font-semibold hover:bg-neutral-200 active:scale-[0.98] transition-all">
                        Checkout
                      </button>
                    </motion.div>
                  </div>
                </div>

                {/* Recommended Section Bottom */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.05 } }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="px-6 sm:px-10 pb-10 pt-8 border-t border-neutral-100 mt-auto bg-neutral-50"
                >
                  <h4 className="text-xl font-semibold text-neutral-900 tracking-tight mb-6">
                    Recommended Products
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {PRODUCTS.filter((p) => p.id !== activeItem.id)
                      .slice(0, 3)
                      .map((item) => (
                        <ProductCard
                          key={item.id}
                          item={item}
                          onClick={() => {}}
                          layoutIdPrefix={`rec-${activeItem.id}`}
                        />
                      ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </div>
    </LayoutGroup>
  );
}

function ProductCard({
  item,
  onClick,
  layoutIdPrefix,
  isActive,
}: {
  item: typeof PRODUCTS[0];
  onClick: (item: typeof PRODUCTS[0]) => void;
  layoutIdPrefix: string;
  isActive?: boolean;
}) {
  return (
    <motion.div
      layoutId={`${layoutIdPrefix}-card-${item.id}`}
      transition={SPRING_TRANSITION}
      onClick={() => onClick(item)}
      className="bg-white rounded-2xl p-2.5 shadow-[0_0_40px_rgba(0,0,0,0.03)] cursor-pointer group flex flex-col hover:scale-[1.01] hover:shadow-[0_0_40px_rgba(0,0,0,0.08)] transition-all duration-300 relative"
      style={{ opacity: isActive ? 0 : 1, zIndex: isActive ? 50 : 0 }}
    >
      <div className="px-3 pt-3 pb-4">
        <motion.h3
          layoutId={`${layoutIdPrefix}-title-${item.id}`}
          transition={SPRING_TRANSITION}
          className="text-[22px] font-medium tracking-tight text-neutral-900 leading-none"
        >
          {item.title}
        </motion.h3>
        <motion.p
          layoutId={`${layoutIdPrefix}-subtitle-${item.id}`}
          className="text-[13px] text-neutral-500 mt-1.5 font-medium"
        >
          {item.subtitle}
        </motion.p>
      </div>

      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100">
        <motion.img
          layoutId={`${layoutIdPrefix}-image-${item.id}`}
          transition={SPRING_TRANSITION}
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/50 via-black/0 to-transparent pointer-events-none" />

        <motion.div
          layoutId={`${layoutIdPrefix}-price-${item.id}`}
          className="absolute bottom-4 left-4 text-white font-medium text-3xl tracking-tight drop-shadow-sm"
        >
          {item.price}
        </motion.div>

        <motion.div
          layoutId={`${layoutIdPrefix}-arrow-${item.id}`}
          className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-neutral-900 shadow-xl group-hover:bg-neutral-100 transition-colors"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17l9.2-9.2M17 17V7H7" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}
