import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FaTwitter } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

/**
 * Utility function to merge tailwind classes
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface TweetCardProps {
  /** The author's display name */
  authorName: string;
  /** The author's username starting with @ */
  authorUsername: string;
  /** The URL to the author's avatar image */
  authorAvatar: string;
  /** Whether the author is verified */
  verified?: boolean;
  /** The text content of the tweet */
  content: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export const TweetCard = ({
  authorName = "Aditya" ,
  authorUsername = "@adityas1204",
  authorAvatar = "https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=880&auto=format&fit=crop",
  verified = true,
  content = "Rankflow UI is a collection of premium UI components for react and Nextjs",
  className,
}: TweetCardProps) => {
  return (
    <div
      className={cn(
        "max-w-md w-full p-4 rounded-xl border border-zinc-800 bg-[#15181c] text-zinc-100 font-sans shadow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={authorAvatar}
            alt={authorName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1 font-bold text-[15px] leading-5 text-zinc-100">
              {authorName}
              {verified && (
                <MdVerified className="text-[#1D9BF0] w-[18px] h-[18px] ml-0.5" />
              )}
            </div>
            <div className="text-[15px] leading-5 text-zinc-500 font-normal">
              {authorUsername}
            </div>
          </div>
        </div>
        <FaTwitter className="text-zinc-500 w-[20px] h-[20px] mt-1" />
      </div>

      <div className="mt-3 text-[16px] leading-[1.4] text-zinc-100 whitespace-pre-wrap">
        {content}
      </div>
    </div>
  );
};
