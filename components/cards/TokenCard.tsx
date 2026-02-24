"use client";

import React from "react";
import {
  MoreVertical,
  Copy,
  Share2,
  Flag,
  AlertTriangle,
  ShieldCheck,
  Edit,
  Flame,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Badge from "../Badge";

export type TokenCardVariant = "home" | "history" | "discover";

interface TokenCardProps {
  variant: TokenCardVariant;
  tokenId: string;
  name: string;
  type: string;
  expiresIn: string;
  endorsements?: number;
  historyAction?: "endorsed" | "revoked" | "flagged";
  actionWalletId?: string;
  onRevoke?: () => void;
  onEndorse?: () => void;
  onViewAll?: () => void;
}

const getRankFromEndorsements = (count: number) => {
  if (count >= 250) return "champion";
  if (count >= 100) return "diamond";
  if (count >= 50) return "platinum";
  if (count >= 25) return "gold";
  if (count >= 10) return "silver";
  return "bronze";
};

export function TokenCard({
  variant,
  tokenId,
  name,
  type,
  expiresIn,
  endorsements = 0,
  historyAction = "endorsed",
  actionWalletId = "0x000...000",
  onRevoke,
  onEndorse,
  onViewAll,
}: TokenCardProps) {
  const rank = getRankFromEndorsements(endorsements);

  return (
    <div className="group relative flex min-h-[75px] w-full flex-col gap-4 rounded-[16px] border border-card-border bg-card-bg p-4 backdrop-blur-[2.5px] transition-all duration-300 hover:border-white/20 md:px-6 xl:grid xl:grid-cols-12 xl:items-center xl:gap-4">
      {/* --- Name & ID --- */}
      <div className="flex min-w-0 flex-col xl:col-span-3">
        <h3 className="truncate font-utsaha text-lg leading-tight text-white">
          {name}
        </h3>
        <p className="truncate font-utsaha text-sm text-gray-500">
          ID: {tokenId}
        </p>
      </div>

      {/* --- Type Badge --- */}
      <div className="flex items-center xl:col-span-3 xl:justify-start">
        <div className="flex w-fit max-w-full items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1.5">
          <ShieldCheck size={16} className="shrink-0 text-[#0553FD]" />
          <span className="truncate font-utsaha text-sm text-gray-300">
            {type}
          </span>
        </div>
      </div>

      {/* --- Expiry --- */}
      <div className="flex items-center font-utsaha text-sm whitespace-nowrap text-gray-400 xl:col-span-2 xl:justify-start">
        Expires in: <span className="ml-1 text-gray-200">{expiresIn}</span>
      </div>

      {/* --- Variant Specific Actions --- */}
      <div className="flex w-full items-center justify-between gap-3 border-t border-card-border pt-4 xl:col-span-4 xl:justify-end xl:border-none xl:pt-0">
        {/* HOME Variant */}
        {variant === "home" && (
          <>
            <div className="flex shrink-0 items-center gap-2 font-utsaha text-sm whitespace-nowrap text-gray-400">
              <div className="flex items-center gap-1.5">
                <Badge rank={rank} size={20} />
                <span className="text-white">{endorsements}</span>
              </div>
              Endorsements
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                onClick={onViewAll}
                className="px-2 font-utsaha text-sm whitespace-nowrap text-[#0553FD] transition-colors hover:text-blue-400"
              >
                View All
              </button>

              {/* Home Dropdown Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-gray-500 transition-colors outline-none hover:text-white">
                    <MoreVertical size={20} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 border-[#3a3a3a] bg-[#18191D] font-utsaha text-white"
                >
                  <DropdownMenuItem className="cursor-pointer gap-2 hover:bg-white/10 focus:bg-white/5 focus:text-white">
                    <Share2 size={16} />
                    <span>Share Token</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 hover:bg-white/10 focus:bg-white/5 focus:text-white">
                    <Copy size={16} />
                    <span>Copy ID</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 hover:bg-white/10 focus:bg-white/5 focus:text-white">
                    <Edit size={16} />
                    <span>Edit Token</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-red-400 hover:bg-white/10 focus:bg-white/5 focus:text-red-400">
                    <Flame size={16} />
                    <span>Burn Token</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}

        {/* HISTORY Variant */}
        {variant === "history" && (
          <>
            <div className="mr-2 flex shrink-0 items-center gap-2 font-utsaha text-sm whitespace-nowrap">
              <span className="font-mono tracking-wide text-gray-400">
                {actionWalletId}
              </span>

              {historyAction === "revoked" && (
                <span className="text-red-500">Revoked</span>
              )}
              {historyAction === "flagged" && (
                <span className="flex items-center gap-1 text-red-500">
                  <AlertTriangle size={14} />
                  Flagged
                </span>
              )}
              {historyAction === "endorsed" && (
                <span className="text-white">Endorsement received</span>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="shrink-0 text-gray-500 transition-colors outline-none hover:text-white">
                  <MoreVertical size={20} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 border-[#3a3a3a] bg-[#18191D] font-utsaha text-white"
              >
                <DropdownMenuItem className="cursor-pointer gap-2 text-red-400 hover:bg-white/10 focus:bg-white/5 focus:text-red-400">
                  <AlertTriangle size={16} />
                  <span>Report</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer gap-2 hover:bg-white/10 focus:bg-white/5 focus:text-white">
                  <Copy size={16} />
                  <span>Copy ID</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer gap-2 hover:bg-white/10 focus:bg-white/5 focus:text-white">
                  <Share2 size={16} />
                  <span>Share Token</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer gap-2 text-yellow-400 hover:bg-white/10 focus:bg-white/5 focus:text-yellow-400">
                  <Flag size={16} />
                  <span>Flag</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}

        {/* DISCOVER Variant */}
        {variant === "discover" && (
          <>
            <div className="flex shrink-0 items-center gap-2 font-utsaha text-sm whitespace-nowrap text-gray-400">
              <div className="flex items-center gap-1.5">
                <Badge rank={rank} size={20} />
                <span className="font-medium text-white">{endorsements}</span>
              </div>
              Endorsements
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                onClick={onViewAll}
                className="px-2 font-utsaha text-sm whitespace-nowrap text-[#0553FD] transition-colors hover:text-blue-400"
              >
                View All
              </button>
              <button
                onClick={onRevoke}
                className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 font-utsaha text-sm text-red-500 transition-colors hover:bg-red-500/20"
              >
                Revoke
              </button>
              <button
                onClick={onEndorse}
                className="rounded-lg bg-[#0553FD] px-3 py-1.5 font-utsaha text-sm text-white transition-all hover:scale-[1.02] hover:bg-blue-700 active:scale-[0.98]"
              >
                Endorse
              </button>

              {/* Discover Dropdown Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="ml-2 text-gray-500 transition-colors outline-none hover:text-white">
                    <MoreVertical size={20} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 border-[#3a3a3a] bg-[#18191D] font-utsaha text-white"
                >
                  <DropdownMenuItem className="cursor-pointer gap-2 hover:bg-white/10 focus:bg-white/5 focus:text-white">
                    <Share2 size={16} />
                    <span>Share Token</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 hover:bg-white/10 focus:bg-white/5 focus:text-white">
                    <Copy size={16} />
                    <span>Copy ID</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 hover:bg-white/10 focus:bg-white/5 focus:text-white">
                    <Edit size={16} />
                    <span>Edit Token</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-red-400 hover:bg-white/10 focus:bg-white/5 focus:text-red-400">
                    <Flame size={16} />
                    <span>Burn Token</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
