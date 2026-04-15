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
    <div className="page-content bg-background">
      {/* Header */}
      <div className="relative mx-4 mt-4 rounded-2xl bg-white p-5 shadow-lg border border-slate-200">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-blue-100 rounded-2xl" />

        <div className="relative flex items-center justify-between">
          {/* Brand Section */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/10 shadow-sm border">
              <img src={logo} alt="logo" className="w-12 h-12 object-contain" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                Alpha Trade
              </h1>
              <p className="text-xs text-slate-500">
                Smart AI Trading Platform
              </p>
            </div>
          </div>

          {/* Assets Section */}
          <div className="text-right">
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Total Assets
            </p>

            <h1 className="mt-1 text-2xl font-bold text-blue-600">
              ${data?.data[0]?.LevelIncome || "0.00"}
            </h1>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative mx-3 mt-6 rounded-3xl overflow-hidden bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-800 p-6 shadow-2xl">
        {/* Shine Effect */}
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.5),transparent)] animate-[shine_3s_linear_infinite]" />

        {/* Soft dark overlay */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />

        {/* Top Accent */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-950/80" />

        <div className="relative flex flex-col gap-6 text-blue-950">
          {/* Heading */}
          <div>
            <h2 className="text-xs uppercase tracking-widest text-blue-900/70 font-medium">
              Performance Insight
            </h2>

            <p className="mt-1 text-lg font-semibold text-blue-950/90">
              Daily returns up to
            </p>

            <p className="mt-2 text-5xl font-extrabold text-blue-950 drop-shadow-md">
              5%
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-blue-950/20" />

          {/* Info Cards */}
          <div className="grid gap-3">
            <div className="flex items-center justify-center text-center text-sm px-4 py-3 rounded-xl border border-yellow-900/30 bg-white/25 backdrop-blur-md hover:bg-white/40 transition-all duration-300 shadow-sm">
              <Brain size={18} className="text-blue-900" />
              <span className="ml-2 font-medium text-blue-950">
                AI-powered trading system
              </span>
            </div>

            <div className="flex items-center justify-center text-center text-sm px-4 py-3 rounded-xl border border-yellow-900/30 bg-white/25 backdrop-blur-md hover:bg-white/40 transition-all duration-300 shadow-sm">
              <Clock size={18} className="text-blue-900" />
              <span className="ml-2 text-blue-950">
                Trading Time:
                <span className="ml-1 font-semibold text-blue-900">
                  07:00 PM – 08:00 PM
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-4 px-3 mt-5">
        {/* Deposit */}
        <button
          onClick={() => navigate("/recharge")}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 to-blue-950 p-4 shadow-xl transition-all duration-300 hover:scale-[1.04] hover:shadow-2xl"
        >
          {/* Glow Effect */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400/20 blur-3xl rounded-full group-hover:scale-125 transition" />

          <div className="relative flex flex-col items-center gap-3">
            {/* Icon Box */}
            <div className="w-14 h-14 rounded-2xl bg-yellow-400 flex items-center justify-center shadow-md group-hover:rotate-6 transition">
              <CreditCard className="text-blue-900" size={24} />
            </div>

            {/* Text */}
            <p className="font-semibold text-white text-sm tracking-wide">
              Deposit
            </p>

            {/* Subtext */}
            <span className="text-xs text-yellow-300 opacity-80">
              Add funds
            </span>
          </div>

          {/* Bottom Shine Line */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-0 group-hover:opacity-100 transition" />
        </button>

        {/* Withdraw */}
        <button
          onClick={() => navigate("/withdraw")}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 to-blue-950 p-4 shadow-xl transition-all duration-300 hover:scale-[1.04] hover:shadow-2xl"
        >
          {/* Glow Effect (different direction) */}
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-yellow-400/20 blur-3xl rounded-full group-hover:scale-125 transition" />

          <div className="relative flex flex-col items-center gap-3">
            {/* Icon Box */}
            <div className="w-14 h-14 rounded-2xl bg-yellow-400 flex items-center justify-center shadow-md group-hover:-rotate-6 transition">
              <ArrowDownToLine className="text-blue-900" size={24} />
            </div>

            {/* Text */}
            <p className="font-semibold text-white text-sm tracking-wide">
              Payout
            </p>

            {/* Subtext */}
            <span className="text-xs text-yellow-300 opacity-80">
              Withdraw funds
            </span>
          </div>

          {/* Bottom Shine Line */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-0 group-hover:opacity-100 transition" />
        </button>

        {/* Telegram */}
        {/* Telegram CC */}
        <Link
          to=""
          target="_blank"
          className="group relative overflow-hidden rounded-2xl border border-yellow-300/40 bg-white p-4 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/20 to-blue-900/10 opacity-0 group-hover:opacity-100 transition" />

          <div className="relative flex flex-col items-center gap-3">
            {/* Icon */}
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-300 to-yellow-400 flex items-center justify-center shadow-inner group-hover:scale-110 transition">
              <MessageCircle className="text-blue-900" size={22} />
            </div>

            {/* Text */}
            <div className="text-center">
              <p className="font-semibold text-blue-900 leading-tight">
                Support CC
              </p>
              <p className="text-xs text-gray-500">Customer Support</p>
            </div>
          </div>
        </Link>

        {/* Official Channel */}
        <Link
          to=""
          target="_blank"
          className="group relative overflow-hidden rounded-2xl border border-yellow-300/40 bg-white p-4 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/20 to-blue-900/10 opacity-0 group-hover:opacity-100 transition" />

          <div className="relative flex flex-col items-center gap-3">
            {/* Icon */}
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-300 to-yellow-400 flex items-center justify-center shadow-inner group-hover:scale-110 transition">
              <Megaphone className="text-blue-900" size={22} />
            </div>

            {/* Text */}
            <div className="text-center">
              <p className="font-semibold text-blue-900 leading-tight">
                Support team
              </p>
              <p className="text-xs text-gray-500">Latest Updates</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Referral */}
      {/* <div className="mx-3 mt-4 rounded-2xl bg-gradient-to-r from-blue-900 to-blue-950 p-5 text-white">
        <h3 className="font-bold">LEVEL UP YOUR EARNINGS</h3>
        <p className="text-yellow-300 mt-1">
          Earn <span className="font-semibold text-white">10% bonus</span>
        </p>

        <button className="mt-3 bg-yellow-400 text-blue-900 px-4 py-2 rounded-xl font-semibold">
          Share
        </button>
      </div> */}

      {/* Popup Fix Colors */}
      <Popup isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="text-sm space-y-2">
          <p className="font-medium">
            Join 👉{" "}
            <a
              href="https://t.me/+kwzbxbtYbQFhZjU1"
              target="_blank"
              className="text-blue-900 underline"
            >
              Telegram
            </a>
          </p>

          <p className="text-red-600">
            ⏰ <span className="bg-yellow-200 px-2 rounded">7pm–8pm</span>
          </p>

          <p className="text-blue-900">Use USDT for faster deposits.</p>
        </div>
      </Popup>
    </div>
  );
};

export default Home;
