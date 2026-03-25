"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export interface SocialShareLinks {
  whatsapp?: string;
  instagram?: string;
  x?: string;
  facebook?: string;
}

const icons = [
  {
    key: "whatsapp",
    Icon: FaWhatsapp,
    label: "WhatsApp",
    defaultHref: "https://wa.me/",
    color: "#25D366",
  },
  {
    key: "instagram",
    Icon: FaInstagram,
    label: "Instagram",
    defaultHref: "https://instagram.com/",
    color: "#E1306C",
  },
  {
    key: "x",
    Icon: FaXTwitter,
    label: "X (Twitter)",
    defaultHref: "https://x.com/",
    color: "#0f0f0f",
  },
  {
    key: "facebook",
    Icon: FaFacebook,
    label: "Facebook",
    defaultHref: "https://facebook.com/",
    color: "#1877F2",
  },
];

export function SocialShareButton({
  links = {},
  label = "Share",
}: {
  links?: SocialShareLinks;
  label?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          background: "#e2e8f0",
          borderRadius: "22px",
          padding: "8px",
        }}
      >
        <motion.div
          animate={{
            boxShadow: hovered
              ? "inset 3px 3px 8px rgba(0,0,0,0.10), inset -1px -1px 1px rgba(255,255,255,0.70)"
              : "inset 2px 2px 6px rgba(0,0,0,0.07), inset -1px -1px 1px rgba(255,255,255,0.65)",
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: "#dde4ee",
            borderRadius: "14px",
            minWidth: "220px",
            height: "64px",
            position: "relative",
            overflow: "hidden",
            padding: "6px",
          }}
        >
          <motion.div
            animate={{ y: hovered ? "-100%" : "0%" }}
            transition={{ duration: 0.32, ease: [0.33, 1, 0.68, 1] }}
            style={{
              position: "absolute",
              inset: "6px",
              borderRadius: "10px",
              background: "linear-gradient(145deg, #f4f7fb, #e2e8f2)",
              boxShadow:
                "3px 3px 4px rgba(0,0,0,0.10), -3px -3px 4px rgba(255,255,255,0.85)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: "17px",
                fontWeight: 700,
                letterSpacing: "-0.01em",
                color: "#2d3a4a",
                userSelect: "none",
              }}
            >
              {label}
            </span>
          </motion.div>

          <motion.div
            animate={{ y: hovered ? "0%" : "100%" }}
            transition={{ duration: 0.32, ease: [0.33, 1, 0.68, 1] }}
            style={{
              position: "absolute",
              inset: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            {icons.map(({ key, Icon, label: iconLabel, defaultHref, color }, i) => (
              <motion.a
                key={key}
                href={links[key as keyof SocialShareLinks] ?? defaultHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={iconLabel}
                initial={false}
                transition={{
                  delay: hovered ? i * 0.04 : 0,
                  type: "spring",
                  bounce: 0.35,
                  duration: 0.3,
                }}
                whileHover={{ scale: 1.25, rotate: -6 }}
                whileTap={{ scale: 0.88 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  color: color,
                  fontSize: "22px",
                  textDecoration: "none",
                  background: "rgba(255,255,255,0.60)",
                  boxShadow:
                    "1px 1px 1px rgba(0,0,0,0.08), -1px -1px 1px rgba(255,255,255,0.85)",
                  backdropFilter: "blur(4px)",
                  flexShrink: 0,
                }}
              >
                <Icon />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
