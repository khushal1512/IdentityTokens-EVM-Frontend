"use client";

import { useState } from "react";
import IDCard, { IDCardProps } from "../cards/IDCard";
import { IoCopyOutline, IoShareSocialOutline } from "react-icons/io5";

export interface IDMetricsProps extends IDCardProps {
  lastUpdated?: string;
}

const IDMetrics: React.FC<IDMetricsProps> = ({
  name = "Default Name",
  age = 20,
  nationality = "Indian",
  walletAddress = "0x9032345320958093280943r82",
  endorsers = 128,
  lastUpdated = "1 Day Ago",
  className = "",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyID = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShareProfile = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${name}'s Decentralized ID`,
          text: `Check out ${name}'s DIT profile`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback: copy URL to clipboard
      await navigator.clipboard.writeText(window.location.href);
      alert("Profile link copied to clipboard!");
    }
  };

  return (
    <div
      className={`flex w-full flex-col gap-6 overflow-hidden rounded-2xl border border-card-border bg-card-bg p-6 backdrop-blur-[2.6px] lg:flex-row ${className}`}
    >
      {/* ID Card */}
      <div className="flex flex-shrink-0 justify-center lg:w-[542px] lg:justify-start">
        <IDCard
          name={name}
          age={age}
          nationality={nationality}
          walletAddress={walletAddress}
          endorsers={endorsers}
        />
      </div>

      {/* Info and Actions */}
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-8 py-2 lg:gap-0">
        {/* Info Section */}
        <div className="flex flex-col gap-8 font-utsaha">
          {/* Decentralized ID */}
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl leading-tight text-white opacity-90">
              Decentralized Id
            </h3>
            <p className="font-utsaha text-xl leading-relaxed break-all text-[#95959d]">
              {walletAddress}
            </p>
          </div>

          {/* Last Updated */}
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl leading-tight text-white opacity-90">
              Last Updated
            </h3>
            <p className="font-utsaha text-xl leading-relaxed text-[#95959d]">
              {lastUpdated}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex flex-wrap justify-end gap-6 lg:mt-0 lg:justify-start">
          {/* Copy ID Button */}
          <button
            onClick={handleCopyID}
            className="group flex items-center gap-3 transition-all hover:opacity-80"
          >
            <IoCopyOutline className="h-6 w-6 text-white" />
            <span className="font-utsaha text-xl text-white">
              {copied ? "Copied!" : "Copy ID"}
            </span>
          </button>

          {/* Share Profile Button */}
          <button
            onClick={handleShareProfile}
            className="group flex items-center gap-3 transition-all hover:opacity-80"
          >
            <IoShareSocialOutline className="h-6 w-6 text-white" />
            <span className="font-utsaha text-xl text-white">
              Share Profile
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IDMetrics;
