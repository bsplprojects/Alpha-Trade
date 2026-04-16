import { Link, useNavigate } from "react-router-dom";
import {
  Volume2,
  CreditCard,
  ArrowDownToLine,
  MessageCircle,
  Megaphone,
  Share2,
  ChevronRight,
  Bell,
  User2Icon,
  Brain,
  Clock,
  Clock1,
  Link2,
} from "lucide-react";
import MarketItem from "@/components/MarketItem";
import { useMarketData } from "@/hooks/useMarketData";
import { Button } from "@/components/ui/button";
import Login from "./Login";
import { useQuery } from "@tanstack/react-query";
import { http } from "@/utils/http";
import Popup from "@/components/Popup";
import { useEffect, useState } from "react";
import logo from "../../assets/AlphaLogo2.png";

const Home = () => {
  const navigate = useNavigate();
  const marketData = useMarketData();
  const [isOpen, setIsOpen] = useState(false);
  const memberId = sessionStorage.getItem("memberId");

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsOpen(true);
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, []);

  const { data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await http.post("/MySpDashbordData", {
        UserID: memberId,
      });
      return res.data;
    },
  });

  if (!memberId) {
    return <Login />;
  }

  // Show only first 3 items
  const displayedMarket = marketData.slice(0, 3);

  return (
    <div className="page-content bg-white min-h-screen ">
      {/* Header - Premium Card */}
      <div className="relative mx-4 mt-2 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800/80 p-5 sm:p-6 shadow-2xl overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-violet-500/10" />

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative">
              <div className="p-2 sm:p-3 rounded-2xl  ">
                <img
                  src={logo}
                  alt="Alpha Trade"
                  className="w-16 h-16 sm:w-14 sm:h-14 object-contain drop-shadow-md"
                />
              </div>

              {/* Status */}
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-4 sm:h-4 bg-emerald-400 rounded-full border-2 sm:border-[2.5px] border-zinc-950 animate-pulse" />
            </div>

            <div>
              <h1 className="text-2xl sm:text-2xl font-bold text-white tracking-tight">
                Alpha Trade
              </h1>
              <p className="text-[12px] sm:text-xs text-zinc-400 font-medium">
                AI-Powered Trading
              </p>
            </div>
          </div>

          {/* Total Assets */}
          <div className="text-left sm:text-right border-t sm:border-none border-zinc-800 pt-3 sm:pt-0">
            <p className="text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-[2px] text-zinc-500 font-medium">
              TOTAL ASSETS
            </p>

            <div className="flex items-baseline gap-1 sm:justify-end mt-1">
              <span className="text-4xl sm:text-4xl font-bold text-yellow-500 tracking-tight">
                ${data?.data[0]?.LevelIncome?.toLocaleString() || "0.00"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Banner - More Premium & Dynamic */}
      <div className="relative mx-4 mt-2 rounded-3xl overflow-hidden h-[470px] shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-orange-500 to-red-600" />

        {/* Glassmorphic overlay */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-xl" />

        {/* Animated shine */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_40%,rgba(255,255,255,0.35)_50%,transparent_60%)] animate-[shine_4s_linear_infinite]" />

        <div className="relative h-full p-8 flex flex-col justify-between text-black">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-medium mb-4">
              <div className="w-2 h-2 bg-white rounded-full animate-ping" />
              LIVE TRADING ACTIVE
            </div>

            <h2 className="text-5xl font-bold font-serif tracking-tighter leading-none">
              Up to <span className="text-amber-200">5%</span>
              <br />
              Daily Returns
            </h2>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-3 text-sm mt-3 sm:mt-0">
              <div className="flex-1 h-px bg-white/30" />
              <span className="text-black/70 font-medium">POWERED BY AI</span>
              <div className="flex-1 h-px bg-white/30" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex flex-col items-center justify-between text-center h-full">
                {/* Icon */}
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-white/20 mb-3">
                  <Brain size={28} className="text-black" />
                </div>

                {/* Text */}
                <div>
                  <p className="text-[11px] tracking-widest text-white uppercase mb-1">
                    AI Strategy
                  </p>
                  <p className="font-semibold text-black text-sm">
                    Smart Algorithm
                  </p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex flex-col items-center justify-between text-center h-full">
                {/* Icon */}
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-white/20 mb-3">
                  <Clock size={28} className="text-black" />
                </div>

                {/* Text */}
                <div>
                  <p className="text-[11px] tracking-widest text-white uppercase mb-1 text-nowrap">
                    Trading Window
                  </p>
                  <p className="font-semibold text-black text-sm">
                    7:00 PM – 8:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient accent */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Quick Actions - Modern Grid */}
      <div className="grid grid-cols-2 gap-4 px-4 mt-8">
        {/* Deposit Button */}
        <button
          onClick={() => navigate("/recharge")}
          className="group relative h-44 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 overflow-hidden shadow-xl active:scale-[0.97] transition-all duration-300"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent)]" />

          <div className="relative h-full flex flex-col items-center justify-center gap-4 text-white">
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center group-active:rotate-12 transition-transform">
              <CreditCard size={36} className="drop-shadow-md" />
            </div>

            <div className="text-center">
              <p className="text-2xl font-semibold tracking-tight">Deposit</p>
              <p className="text-xs text-blue-200 opacity-80">
                Add funds instantly
              </p>
            </div>
          </div>

          {/* Hover shine effect */}
          <div className="absolute -inset-x-20 -top-10 h-10 bg-white/30 -rotate-12 translate-y-10 group-hover:translate-y-52 transition-transform duration-700" />
        </button>

        {/* Withdraw Button */}
        <button
          onClick={() => navigate("/withdraw")}
          className="group relative h-44 rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 overflow-hidden shadow-xl active:scale-[0.97] transition-all duration-300"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.25),transparent)]" />

          <div className="relative h-full flex flex-col items-center justify-center gap-4 text-white">
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center group-active:-rotate-12 transition-transform">
              <ArrowDownToLine size={36} className="drop-shadow-md" />
            </div>

            <div className="text-center">
              <p className="text-2xl font-semibold tracking-tight">Payout</p>
              <p className="text-xs text-emerald-200 opacity-80">
                Withdraw earnings
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Support Links - Clean & Elegant */}
      <div className="px-4 mt-6 grid grid-cols-2 gap-4">
        <Link
          to="https://t.me/+kwzbxbtYbQFhZjU1"
          target="_blank"
          className="group flex flex-col items-center justify-center bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-yellow-400/30 rounded-3xl p-6 transition-all duration-300 active:scale-95"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center mb-4 shadow-inner group-hover:scale-110 transition-transform">
            <MessageCircle size={28} className="text-zinc-950" />
          </div>
          <p className="font-semibold text-white">Support CC</p>
          <p className="text-xs text-zinc-400 mt-1">Customer Care</p>
        </Link>

        <Link
          to=""
          target="_blank"
          className="group flex flex-col items-center justify-center bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-yellow-400/30 rounded-3xl p-6 transition-all duration-300 active:scale-95"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center mb-4 shadow-inner group-hover:scale-110 transition-transform">
            <Megaphone size={28} className="text-zinc-950" />
          </div>
          <p className="font-semibold text-white">Support Team</p>
          <p className="text-xs text-zinc-400 mt-1">Updates & News</p>
        </Link>
      </div>

      {/* Trading Time Reminder */}
      <div className="mx-4 mt-8 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-400/20 rounded-2xl p-5">
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className="text-3xl">
            <Link2 color="black" size={36} />
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-black">Referral Link</p>

              {/* Copy Button */}
              <button
                onClick={handleCopy}
                className="p-1 rounded-md hover:bg-amber-200/40 transition"
              >
                {copied ? (
                  <Check size={16} className="text-green-600" />
                ) : (
                  <Copy size={16} className="text-amber-700" />
                )}
              </button>
            </div>

            <Link
              to={referralLink}
              target="_blank"
              className="text-sm text-amber-600 underline animate-pulse break-all"
            >
              {referralLink}
            </Link>
          </div>
        </div>
      </div>

      <div
        onClick={() => window.open("/alpha-trade.pdf", "_blank")}
        className="mx-4 mt-4 rounded-3xl p-5 cursor-pointer relative overflow-hidden shadow-2xl text-black"
        style={{
          background: "linear-gradient(135deg, #f59e0b, #ea580c, #7f1d1d)",
        }}
      >
        {/* Glossy shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/30 opacity-40" />

        {/* Content */}
        <div className="relative flex items-center justify-between gap-4">
          {/* Text */}
          <div>
            <p className="text-xs uppercase tracking-wider text-black/70 mb-1 font-semibold">
              Announcement
            </p>

            <h2 className="text-lg font-extrabold font-serif tracking-tighter leading-snug">
              First time more & fast gain through ALPHA TRADE 🚀
            </h2>

            <p className="text-sm text-black/80 mt-1">
              Alpha Trade has reached a record $35 trillion+ in 2025
            </p>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/30 backdrop-blur-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Popup */}
      <Popup isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="text-center space-y-4 py-2">
          <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center">
            <MessageCircle size={32} className="text-blue-400" />
          </div>

          <p className="font-medium text-lg">Join Our Community</p>

          <a
            href="https://t.me/+kwzbxbtYbQFhZjU1"
            target="_blank"
            className="block w-full bg-blue-600 hover:bg-blue-700 transition-colors py-4 rounded-2xl font-semibold text-black"
          >
            Open Telegram Group
          </a>

          <div className="text-xs text-zinc-400">
            Get real-time signals, support & updates
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default Home;
