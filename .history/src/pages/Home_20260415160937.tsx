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
} from "lucide-react";
import MarketItem from "@/components/MarketItem";
import { useMarketData } from "@/hooks/useMarketData";
import { Button } from "@/components/ui/button";
import Login from "./Login";
import { useQuery } from "@tanstack/react-query";
import { http } from "@/utils/http";
import Popup from "@/components/Popup";
import { useEffect, useState } from "react";
import logo from "../../assets/AlphaLogo.png";

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
    <div className="page-content bg-zinc-50 min-h-screen pb-20">
      {/* Header - Elegant Light Card */}
      <div className="relative mx-4 mt-6 rounded-3xl bg-white border border-slate-100 shadow-xl p-6 overflow-hidden">
        {/* Subtle gradient accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-violet-50 rounded-3xl" />

        <div className="relative flex items-center justify-between">
          {/* Brand Section */}
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-white shadow-md border border-slate-100">
              <img
                src={logo}
                alt="Alpha Trade"
                className="w-12 h-12 object-contain"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Alpha Trade
              </h1>
              <p className="text-sm text-slate-500 font-medium">
                Smart AI Trading Platform
              </p>
            </div>
          </div>

          {/* Total Assets */}
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest text-slate-500 font-medium">
              TOTAL ASSETS
            </p>
            <h2 className="text-4xl font-semibold text-slate-900 tracking-tighter mt-1">
              ${data?.data[0]?.LevelIncome?.toLocaleString() || "0.00"}
            </h2>
            <p className="text-emerald-600 text-sm font-medium mt-1 flex items-center justify-end gap-1">
              +2.8% <span className="text-xs text-slate-400">today</span>
            </p>
          </div>
        </div>
      </div>

      {/* Hero Banner - Bright & Premium */}
      <div className="relative mx-4 mt-6 rounded-3xl overflow-hidden shadow-2xl h-[265px]">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-300 via-yellow-400 to-orange-500" />

        {/* Soft overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Shine effect */}
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.45),transparent)] animate-[shine_3.5s_linear_infinite]" />

        <div className="relative h-full p-8 flex flex-col justify-between text-slate-950">
          <div>
            <div className="inline-flex items-center px-5 py-2 bg-white/90 backdrop-blur-md rounded-full text-xs font-semibold shadow-sm mb-4">
              <span className="text-emerald-500 mr-2">●</span>
              LIVE AI TRADING
            </div>

            <h2 className="text-5xl font-bold tracking-tighter leading-none text-white drop-shadow-sm">
              Daily Returns
              <br />
              up to <span className="text-white/90">5%</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-white/60">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="text-amber-600" size={20} />
                <span className="text-xs font-semibold tracking-widest text-slate-500">
                  AI POWERED
                </span>
              </div>
              <p className="font-semibold text-slate-900">
                Intelligent Trading System
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-white/60">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="text-amber-600" size={20} />
                <span className="text-xs font-semibold tracking-widest text-slate-500">
                  TRADING TIME
                </span>
              </div>
              <p className="font-semibold text-slate-900">
                07:00 PM – 08:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 px-4 mt-8">
        {/* Deposit */}
        <button
          onClick={() => navigate("/recharge")}
          className="group relative h-44 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 overflow-hidden shadow-xl active:scale-[0.97] transition-all duration-300 flex flex-col items-center justify-center gap-4 text-white"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(255,255,255,0.3),transparent_70%)]" />

          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center group-active:rotate-12 transition-transform shadow-inner">
            <CreditCard size={38} className="text-white drop-shadow" />
          </div>

          <div className="text-center">
            <p className="text-2xl font-semibold tracking-tight">Deposit</p>
            <p className="text-blue-100 text-sm">Add funds to your account</p>
          </div>
        </button>

        {/* Withdraw */}
        <button
          onClick={() => navigate("/withdraw")}
          className="group relative h-44 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-600 overflow-hidden shadow-xl active:scale-[0.97] transition-all duration-300 flex flex-col items-center justify-center gap-4 text-white"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(255,255,255,0.25),transparent)]" />

          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center group-active:-rotate-12 transition-transform shadow-inner">
            <ArrowDownToLine size={38} className="text-white drop-shadow" />
          </div>

          <div className="text-center">
            <p className="text-2xl font-semibold tracking-tight">Payout</p>
            <p className="text-emerald-100 text-sm">Withdraw your earnings</p>
          </div>
        </button>
      </div>

      {/* Support Links */}
      <div className="px-4 mt-7 grid grid-cols-2 gap-4">
        {/* Customer Support */}
        <Link
          to="https://t.me/+kwzbxbtYbQFhZjU1"
          target="_blank"
          className="group bg-white border border-slate-200 hover:border-amber-300 rounded-3xl p-6 transition-all duration-300 hover:shadow-xl active:scale-[0.985]"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-400 flex items-center justify-center mb-4 shadow group-hover:scale-110 transition-transform">
              <MessageCircle size={28} className="text-slate-900" />
            </div>
            <p className="font-semibold text-slate-800">Support CC</p>
            <p className="text-xs text-slate-500 mt-1">Customer Care</p>
          </div>
        </Link>

        {/* Official Channel */}
        <Link
          to=""
          target="_blank"
          className="group bg-white border border-slate-200 hover:border-amber-300 rounded-3xl p-6 transition-all duration-300 hover:shadow-xl active:scale-[0.985]"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center mb-4 shadow group-hover:scale-110 transition-transform">
              <Megaphone size={28} className="text-slate-900" />
            </div>
            <p className="font-semibold text-slate-800">Support Team</p>
            <p className="text-xs text-slate-500 mt-1">Latest Updates</p>
          </div>
        </Link>
      </div>

      {/* Trading Reminder Card */}
      <div className="mx-4 mt-8 bg-white border border-slate-100 shadow-sm rounded-3xl p-6">
        <div className="flex items-start gap-4">
          <div className="text-4xl">⏰</div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 text-lg">
              Daily Trading Window
            </h3>
            <p className="text-amber-600 font-medium">07:00 PM – 08:00 PM</p>

            <div className="mt-4 text-sm text-slate-600">
              For faster processing, we recommend using{" "}
              <span className="font-semibold text-slate-800">USDT (TRC20)</span>
              .
            </div>
          </div>
        </div>
      </div>

      {/* Popup */}
      <Popup isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="text-center space-y-6 py-4">
          <div className="mx-auto w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center">
            <MessageCircle size={40} className="text-blue-600" />
          </div>

          <div>
            <p className="text-xl font-semibold text-slate-900">
              Join Our Telegram
            </p>
            <p className="text-slate-500 mt-2">
              Get instant support, signals & updates
            </p>
          </div>

          <a
            href="https://t.me/+kwzbxbtYbQFhZjU1"
            target="_blank"
            className="block bg-blue-600 hover:bg-blue-700 transition py-4 rounded-2xl font-semibold text-white text-lg"
          >
            Open Telegram Group
          </a>
        </div>
      </Popup>
    </div>
  );
};

export default Home;
