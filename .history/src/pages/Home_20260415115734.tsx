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
      <div className="relative mx-3 mt-4 rounded-3xl overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 p-5 shadow-2xl text-white">
        {/* Glow */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl" />

        <div className="relative flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="logo" width={80} />

            <div>
              <h1 className="text-lg font-semibold tracking-wide">
                Alpha Trade
              </h1>
              <p className="text-xs text-yellow-300">Smart AI Trading</p>
            </div>
          </div>

          {/* Assets */}
          <div className="text-right">
            <p className="text-xs uppercase tracking-tighter text-yellow-300">
              Total Assets
            </p>

            <h1 className="mt-1 text-3xl font-extrabold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              ${data?.data[0]?.LevelIncome || "0.00"}
            </h1>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative mx-3 mt-6 rounded-3xl overflow-hidden bg-gradient-to-br from-yellow-100 via-yellow-50 to-yellow-200 text-blue-900 p-6 shadow-xl">
        <div className="flex flex-col gap-5">
          <div>
            <h2 className="text-sm uppercase text-blue-700">
              Performance Insight
            </h2>

            <p className="mt-1 text-2xl font-semibold">Daily returns up to</p>

            <p className="text-5xl font-extrabold bg-gradient-to-r from-blue-800 to-blue-900 bg-clip-text text-transparent">
              5–8%
            </p>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent" />

          <div className="grid gap-3">
            <div className="text-center text-sm px-4 py-3 rounded-xl border border-yellow-400 bg-yellow-200/40 backdrop-blur-sm">
              🤖 Powered by advanced AI trading systems
            </div>

            <div className="text-center text-sm px-4 py-3 rounded-xl border border-yellow-400 bg-yellow-200/40 backdrop-blur-sm">
              ⏰ Trading Time:
              <span className="ml-2 font-semibold text-blue-800">
                07:00 PM – 08:00 PM
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
          className="rounded-2xl bg-gradient-to-br from-blue-800 to-blue-900 p-4 shadow-md"
        >
          <div className="flex-col md:flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-300 flex items-center justify-center">
              <CreditCard className="text-blue-900" size={22} />
            </div>
            <p className="font-semibold text-white">Deposit</p>
          </div>
        </button>

        {/* Withdraw */}
        <button
          onClick={() => navigate("/withdraw")}
          className="rounded-2xl bg-gradient-to-br from-blue-800 to-blue-900 p-4 shadow-md"
        >
          <div className="flex-col md:flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-300 flex items-center justify-center">
              <ArrowDownToLine className="text-blue-900" size={22} />
            </div>
            <p className="font-semibold text-white">Payout</p>
          </div>
        </button>

        {/* Telegram */}
        <Link
          to=""
          target="_blank"
          className="rounded-2xl bg-card border border-border p-4"
        >
          <div className="flex-col md:flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
              <MessageCircle className="text-blue-900" size={22} />
            </div>
            <p className="font-semibold text-foreground">Telegram CC</p>
          </div>
        </Link>

        {/* Channel */}
        <Link
          to=""
          target="_blank"
          className="rounded-2xl bg-card border border-border p-4"
        >
          <div className="flex-col md:flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
              <Megaphone className="text-blue-900" size={22} />
            </div>
            <p className="font-semibold text-foreground">Official Channel</p>
          </div>
        </Link>
      </div>

      {/* Referral */}
      <div className="mx-3 mt-4 rounded-2xl bg-gradient-to-r from-blue-900 to-blue-950 p-5 text-white">
        <h3 className="font-bold">LEVEL UP YOUR EARNINGS</h3>
        <p className="text-yellow-300 mt-1">
          Earn <span className="font-semibold text-white">10% bonus</span>
        </p>

        <button className="mt-3 bg-yellow-400 text-blue-900 px-4 py-2 rounded-xl font-semibold">
          Share
        </button>
      </div>

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
