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
} from "lucide-react";
import MarketItem from "@/components/MarketItem";
import { useMarketData } from "@/hooks/useMarketData";
import { Button } from "@/components/ui/button";
import Login from "./Login";
import { useQuery } from "@tanstack/react-query";
import { http } from "@/utils/http";
import Popup from "@/components/Popup";
import { useEffect, useState } from "react";

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
      {/* Header with balance */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-400 via-indigo-600 to-indigo-700 px-5 py-4 shadow-lg">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />

        <div className="relative flex items-center justify-between">
          <div className="h-16 w-16 rounded-full flex items-center justify-center text-white text-xl">
            <h1>Alpha Trade</h1>
          </div>

          <div>
            <p className="text-sm text-indigo-100 text-right">Total assets</p>
            <h1 className="text-3xl font-bold tracking-tight text-white text-right">
              ${data?.data[0]?.LevelIncome}
            </h1>
          </div>
        </div>
      </div>
      {/* Hero Banner */}
      <div className="relative mx-3 mt-6 rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white p-6 shadow-2xl">
        {/* Soft gradient glow */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />

        {/* Glass overlay */}
        <div className="absolute inset-0 backdrop-blur-md bg-white/5" />

        {/* Content */}
        <div className="relative flex flex-col gap-5">
          {/* Heading */}
          <div>
            <h2 className="text-sm uppercase tracking-widest text-zinc-400">
              Performance Insight
            </h2>

            <p className="mt-1 text-2xl font-semibold text-zinc-200">
              Daily returns up to
            </p>

            <p className="text-5xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              5–8%
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />

          {/* Info Cards */}
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center justify-center text-center text-sm px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition">
              🤖 Powered by advanced AI trading systems
            </div>

            <div className="flex items-center justify-center text-center text-sm px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition">
              ⏰ Trading Time:
              <span className="ml-2 font-semibold text-indigo-300">
                07:00 PM – 08:00 PM
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-4 px-3 mt-5">
        {/* Recharge */}
        <button
          onClick={() => navigate("/recharge")}
          className="group rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-500 p-4 shadow-md hover:shadow-lg transition-all"
        >
          <div className="flex-col md:flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/90 flex items-center justify-center shadow-sm">
              <CreditCard className="text-indigo-600" size={22} />
            </div>
            <div className="text-left mt-2 md:mt-0">
              <p className="font-semibold text-white leading-tight">Recharge</p>
              <p className="text-xs text-indigo-100">Add funds</p>
            </div>
          </div>
        </button>

        {/* Withdraw */}
        <button
          onClick={() => navigate("/withdraw")}
          className="group rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-500 p-4 shadow-md hover:shadow-lg transition-all"
        >
          <div className="flex-col md:flex  items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/90 flex items-center justify-center shadow-sm">
              <ArrowDownToLine className="text-indigo-600" size={22} />
            </div>
            <div className="text-left mt-2 md:mt-0">
              <p className="font-semibold text-white leading-tight">Withdraw</p>
              <p className="text-xs text-indigo-100">Transfer out</p>
            </div>
          </div>
        </button>

        {/* Telegram CC */}
        <Link
          to="https://t.me/+dn1BMosSi1hmZmQ1"
          target="_blank"
          className="group rounded-2xl bg-card border border-border p-4 shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex-col md:flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
              <MessageCircle className="text-indigo-600" size={22} />
            </div>
            <div className="text-left mt-2 md:mt-0">
              <p className="font-semibold text-foreground leading-tight">
                Telegram CC
              </p>
              <p className="text-xs text-muted-foreground">Customer support</p>
            </div>
          </div>
        </Link>

        {/* Official Channel */}
        <Link
          to="https://t.me/+kwzbxbtYbQFhZjU1"
          target="_blank"
          className="group rounded-2xl bg-card border border-border p-4 shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex-col md:flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Megaphone className="text-indigo-600" size={22} />
            </div>
            <div className="text-left mt-2 md:mt-0">
              <p className="font-semibold text-foreground leading-tight ">
                Official Channel
              </p>
              <p className="text-xs text-muted-foreground">Announcements</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Referral Banner */}
      <div className="relative mx-3 mt-4 rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-500 p-5 text-white shadow-lg">
        {/* subtle shine */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />

        <div className="relative">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <h3 className="font-extrabold text-lg tracking-wide">
                LEVEL UP YOUR EARNINGS
              </h3>
              <p className="text-sm text-indigo-100 mt-1">
                Earn <span className="font-semibold text-white">10% bonus</span>{" "}
                when your friends make their first deposit
              </p>
            </div>

            <button
              onClick={() => navigate("/invite-friends")}
              className="flex items-center gap-2 rounded-xl bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur-md hover:bg-white/30 transition"
            >
              <Share2 size={14} />
              Share
            </button>
          </div>

          {/* Telegram strip */}
          <div className="mt-5 rounded-xl border border-white/30 bg-white/10 px-3 py-2 text-center text-sm font-semibold shadow-sm">
            <Link
              to="https://t.me/+kwzbxbtYbQFhZjU1"
              target="_blank"
              className="text-white hover:underline"
            >
              🚀 Join official channel for daily trade signals
            </Link>
          </div>
        </div>
      </div>

      {/* Market Section */}
      <div className="mt-6 px-3">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-foreground">Market</h3>
          <span className="text-xs text-muted-foreground">Live prices</span>
        </div>

        {/* Market Table */}
        <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-sm">
          {/* Table Head */}
          <div className="grid grid-cols-3 px-4 py-3 text-xs font-semibold text-muted-foreground bg-muted/50">
            <span>Code</span>
            <span className="text-center">Price</span>
            <span className="text-right">Change</span>
          </div>

          {/* Rows */}
          <div className="divide-y divide-border">
            {displayedMarket.map((item) => (
              <MarketItem key={item.code} {...item} />
            ))}
          </div>
        </div>

        {/* View More */}
        <Button
          onClick={() => navigate("/market")}
          className="mt-4 w-full shadow-lg"
        >
          View Full Market
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="h-8" />
      <Popup isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="relative w-[100%] max-w-sm ">
          <h2 className="text-center font-semibold text-sm mb-3">
            💎 BC Trade Newsletter 💎
          </h2>

          <div className="text-sm space-y-2 leading-relaxed">
            <p className="font-medium">
              Join the Official Telegram Channel 👉
              <a
                href="https://t.me/+kwzbxbtYbQFhZjU1"
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 underline"
              >
                https://t.me/+kwzbxbtYbQFhZjU1
              </a>
            </p>
            <p className="text-red-600 font-medium">
              ⏰ Daily Signal Time:{" "}
              <span className="bg-red-100 px-2 py-0.5 rounded">7pm to 8pm</span>
            </p>
            <p className="text-indigo-600 font-medium">
              Recently, due to adjustments in the risk control policies of some
              Indian banks, some users may experience delays or inconveniences
              when making deposits. To ensure your funds are transferred
              promptly and securely, we recommend prioritizing the USDT deposit
              channel. This channel is stable, efficient, and ensures fast
              transactions. Please rest assured that the security of your assets
              remains our top priority.
            </p>
            <p className="font-semibold">Invite Rewards:</p>
            <p className="text-red-600 font-medium">
              Invite friends to BC Trade, and you will get{" "}
              <span className="font-bold">10%</span> bonus on their first
              deposit!
            </p>
            <p>Example: Your friend deposits $50000, and you earn $5000!</p>
            <p className="text-red-600 font-semibold text-center">
              🔥 The more you invite, the more you earn! 🔥
            </p>
          </div>
          {/* <button
            onClick={() => setIsOpen(false)}
            className="mt-4 w-full text-indigo-600 font-medium border-t pt-2 hover:text-indigo-700"
          >
            confirm
          </button> */}
        </div>
      </Popup>
    </div>
  );
};

export default Home;
