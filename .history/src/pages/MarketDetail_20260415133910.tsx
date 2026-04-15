import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Star, Activity } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { useRealtimePrice } from "@/hooks/useRealtimePrice";
import { useState } from "react";
import Popup from "../components/Popup";
import ConfirmOrder from "../components/ConfirmOrder";
import { useQuery } from "@tanstack/react-query";
import { http } from "@/utils/http";
import { toast } from "sonner";

const marketData: Record<
  string,
  { name: string; price: number; change: number; volume: string; icon: string }
> = {
  ARB: {
    name: "ARB/USDT",
    price: 0.2,
    change: -2.78,
    volume: "36196.99K",
    icon: "🔷",
  },
  AAVE: {
    name: "AAVE/USDT",
    price: 164.7,
    change: -0.98,
    volume: "55.37K",
    icon: "👻",
  },
  DOGE: {
    name: "DOGE/USDT",
    price: 0.14,
    change: -2.17,
    volume: "677658.70K",
    icon: "🐕",
  },
  EOS: {
    name: "EOS/USDT",
    price: 0.78,
    change: -0.66,
    volume: "1180.28K",
    icon: "⬡",
  },
  ADA: {
    name: "ADA/USDT",
    price: 0.39,
    change: -0.9,
    volume: "107161.19K",
    icon: "🔵",
  },
  AVAX: {
    name: "AVAX/USDT",
    price: 13.63,
    change: -1.23,
    volume: "2125.52K",
    icon: "🔺",
  },
  UNI: {
    name: "UNI/USDT",
    price: 5.4,
    change: -1.93,
    volume: "3691.08K",
    icon: "🦄",
  },
  APT: {
    name: "APT/USDT",
    price: 1.76,
    change: -2.28,
    volume: "4271.01K",
    icon: "📱",
  },
  EGLD: {
    name: "EGLD/USDT",
    price: 6.1,
    change: -3.63,
    volume: "218.31K",
    icon: "✖️",
  },
  FTM: {
    name: "FTM/USDT",
    price: 0.7,
    change: -0.77,
    volume: "1858.97K",
    icon: "👻",
  },
  THETA: {
    name: "THETA/USDT",
    price: 0.29,
    change: -4.3,
    volume: "2755.47K",
    icon: "🎬",
  },
  RNDR: {
    name: "RNDR/USDT",
    price: 7.03,
    change: 2.58,
    volume: "233.25K",
    icon: "🎨",
  },

  BTC: {
    name: "BTC/USDT",
    price: 43250.5,
    change: 1.24,
    volume: "987654.12K",
    icon: "🟠",
  },
  ETH: {
    name: "ETH/USDT",
    price: 2350.75,
    change: -0.87,
    volume: "654321.45K",
    icon: "💠",
  },
  SOL: {
    name: "SOL/USDT",
    price: 98.4,
    change: 3.12,
    volume: "124567.89K",
    icon: "🌞",
  },
  MATIC: {
    name: "MATIC/USDT",
    price: 0.74,
    change: -1.45,
    volume: "88542.11K",
    icon: "🟣",
  },
  LINK: {
    name: "LINK/USDT",
    price: 14.6,
    change: 0.92,
    volume: "43120.55K",
    icon: "🔗",
  },
  DOT: {
    name: "DOT/USDT",
    price: 6.42,
    change: -2.11,
    volume: "29876.33K",
    icon: "🔴",
  },
  LTC: {
    name: "LTC/USDT",
    price: 71.9,
    change: 0.34,
    volume: "15422.76K",
    icon: "💿",
  },
  XRP: {
    name: "XRP/USDT",
    price: 0.56,
    change: 1.88,
    volume: "341122.18K",
    icon: "💧",
  },
  TRX: {
    name: "TRX/USDT",
    price: 0.11,
    change: -0.45,
    volume: "214598.64K",
    icon: "⚡",
  },
  NEAR: {
    name: "NEAR/USDT",
    price: 2.87,
    change: 4.21,
    volume: "19344.28K",
    icon: "🌐",
  },

  ALGO: {
    name: "ALGO/USDT",
    price: 0.18,
    change: -3.05,
    volume: "16233.91K",
    icon: "🔺",
  },
  ICP: {
    name: "ICP/USDT",
    price: 9.22,
    change: 0.67,
    volume: "8456.37K",
    icon: "🧠",
  },
  SAND: {
    name: "SAND/USDT",
    price: 0.42,
    change: -1.98,
    volume: "27345.19K",
    icon: "🏖️",
  },
  MANA: {
    name: "MANA/USDT",
    price: 0.39,
    change: 2.45,
    volume: "18765.44K",
    icon: "🌌",
  },
  AXS: {
    name: "AXS/USDT",
    price: 6.75,
    change: -0.62,
    volume: "9321.88K",
    icon: "🎮",
  },
  GALA: {
    name: "GALA/USDT",
    price: 0.03,
    change: 5.14,
    volume: "45678.22K",
    icon: "🎉",
  },
  OP: {
    name: "OP/USDT",
    price: 1.92,
    change: -2.73,
    volume: "22871.09K",
    icon: "🚀",
  },
  AR: {
    name: "AR/USDT",
    price: 7.85,
    change: 1.09,
    volume: "5123.66K",
    icon: "📦",
  },
  KSM: {
    name: "KSM/USDT",
    price: 21.3,
    change: -4.02,
    volume: "2876.43K",
    icon: "🕊️",
  },
  CHZ: {
    name: "CHZ/USDT",
    price: 0.09,
    change: 0.81,
    volume: "32451.77K",
    icon: "⚽",
  },

  HBAR: {
    name: "HBAR/USDT",
    price: 0.06,
    change: -1.14,
    volume: "19876.55K",
    icon: "🌿",
  },
  ZIL: {
    name: "ZIL/USDT",
    price: 0.02,
    change: 2.02,
    volume: "11234.66K",
    icon: "⚙️",
  },
  CAKE: {
    name: "CAKE/USDT",
    price: 2.11,
    change: -0.89,
    volume: "9432.18K",
    icon: "🥞",
  },
  ROSE: {
    name: "ROSE/USDT",
    price: 0.05,
    change: 3.76,
    volume: "13654.27K",
    icon: "🌹",
  },
  LDO: {
    name: "LDO/USDT",
    price: 2.04,
    change: -1.36,
    volume: "17654.82K",
    icon: "💧",
  },
  IMX: {
    name: "IMX/USDT",
    price: 1.57,
    change: 4.89,
    volume: "12398.11K",
    icon: "🧱",
  },

  PEPE: {
    name: "PEPE/USDT",
    price: 0.00000123,
    change: -6.42,
    volume: "745221.33K",
    icon: "🐸",
  },
  FLOKI: {
    name: "FLOKI/USDT",
    price: 0.000032,
    change: 7.18,
    volume: "231998.45K",
    icon: "🐶",
  },
  BONK: {
    name: "BONK/USDT",
    price: 0.000014,
    change: -3.55,
    volume: "198332.77K",
    icon: "🔥",
  },

  INJ: {
    name: "INJ/USDT",
    price: 28.6,
    change: 2.97,
    volume: "8234.91K",
    icon: "💉",
  },
  RUNE: {
    name: "RUNE/USDT",
    price: 4.91,
    change: -2.19,
    volume: "11432.54K",
    icon: "🪓",
  },
  WOO: {
    name: "WOO/USDT",
    price: 0.23,
    change: 1.66,
    volume: "17234.09K",
    icon: "📈",
  },
  GMT: {
    name: "GMT/USDT",
    price: 0.18,
    change: -0.74,
    volume: "19876.33K",
    icon: "⌚",
  },
  MINA: {
    name: "MINA/USDT",
    price: 0.79,
    change: 3.31,
    volume: "8654.44K",
    icon: "🪶",
  },
  ASTR: {
    name: "ASTR/USDT",
    price: 0.07,
    change: -1.92,
    volume: "7432.88K",
    icon: "⭐",
  },
  SUI: {
    name: "SUI/USDT",
    price: 1.02,
    change: 2.44,
    volume: "26455.21K",
    icon: "💦",
  },
  SEI: {
    name: "SEI/USDT",
    price: 0.48,
    change: -3.18,
    volume: "19342.91K",
    icon: "🏃",
  },
  TIA: {
    name: "TIA/USDT",
    price: 9.35,
    change: 5.62,
    volume: "15673.88K",
    icon: "🧬",
  },
  JUP: {
    name: "JUP/USDT",
    price: 0.62,
    change: -1.08,
    volume: "33421.55K",
    icon: "🪐",
  },
};

const timeFrames = ["Live", "15m", "1H", "4H", "1D", "1W", "1M"];

const MarketDetail = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("BUY");
  const memberId = sessionStorage.getItem("memberId");

  const { data: purchasedData } = useQuery({
    queryKey: ["purchased"],
    queryFn: async () => {
      const res = await http.get(`/CheckTopUpToday?MID=${memberId}`);
      return res.data;
    },
  });

  const data = code ? marketData[code] : null;

  // Use realtime price hook
  const realtimeData = useRealtimePrice(data?.price || 0, data?.change || 0);

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Market data not found</p>
      </div>
    );
  }

  const isPositive = realtimeData.change >= 0;
  const chartColor = isPositive ? "#22c55e" : "#ef4444";

  // Format price based on value magnitude
  const formatPrice = (price: number) => {
    if (price >= 100) return price.toFixed(2);
    if (price >= 1) return price.toFixed(4);
    return price.toFixed(6);
  };

  return (
    <>
      <div
        className={`min-h-screen bg-background pb-20 ${open && "blur-sm opacity-80"} `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-card border-b border-border">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-foreground">
              {data.name}
            </h1>
            <span className="flex items-center gap-1 text-xs text-indigo-500 animate-pulse">
              <Activity className="w-3 h-3" />
              LIVE
            </span>
          </div>
          <button className="p-2 -mr-2">
            <Star className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Price Info - Now with live updates */}
        <div className="p-4 bg-card">
          <div className="flex items-baseline gap-3">
            <span
              className={`text-3xl font-bold transition-colors duration-300 ${isPositive ? "text-indigo-500" : "text-red-500"}`}
            >
              {formatPrice(realtimeData.currentPrice)}
            </span>
            <span
              className={`text-lg transition-colors duration-300 ${isPositive ? "text-indigo-500" : "text-red-500"}`}
            >
              {isPositive ? "+" : ""}
              {realtimeData.change.toFixed(2)}%
            </span>
          </div>
          <div className="flex gap-6 mt-2 text-sm text-muted-foreground">
            <span>≈ ${formatPrice(realtimeData.currentPrice)}</span>
            <span>24H Vol: {data.volume}</span>
          </div>
        </div>

        {/* Time Frame Tabs */}
        <div className="flex border-b border-border bg-card overflow-x-auto">
          {timeFrames.map((tf, index) => (
            <button
              key={tf}
              className={`flex-1 min-w-[50px] py-3 text-sm font-medium ${
                index === 0
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Chart - Now with live animated data */}
        <div className="h-64 bg-card p-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={realtimeData.chartData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#888", fontSize: 10 }}
                interval={9}
              />
              <YAxis
                domain={["auto", "auto"]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#888", fontSize: 10 }}
                width={55}
                tickFormatter={(value) => formatPrice(value)}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke={chartColor}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPrice)"
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Grid - Now with live high/low */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-card mt-2">
          <div>
            <p className="text-xs text-muted-foreground">24H High</p>
            <p className="text-sm font-medium text-indigo-500">
              {formatPrice(realtimeData.high24h)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">24H Low</p>
            <p className="text-sm font-medium text-red-500">
              {formatPrice(realtimeData.low24h)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">24H Volume</p>
            <p className="text-sm font-medium text-foreground">{data.volume}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Market Cap</p>
            <p className="text-sm font-medium text-foreground">--</p>
          </div>
        </div>

        {/* Trade Buttons */}
        {purchasedData?.HasTopUpToday ? (
          <div className="mt-3 rounded-md border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
            <span className="font-semibold">Notice: </span>
            You have already completed a transaction for today. Please try again
            later.
            <br />
            <span className="font-semibold">Transaction time :</span>{" "}
            {purchasedData?.TopUpDateTime}
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mt-2">
              <Button
                onClick={() => {
                  setOpen(true);
                  setType("BUY");
                }}
                className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-6"
              >
                AI Robot
              </Button>
            </div>
          </>
        )}
      </div>

      {/* POPUP */}
      <Popup isOpen={open} onClose={() => setOpen(false)} title="Confirm Order">
        <div className="w-[300px]">
          <ConfirmOrder data={data} type={type} />
        </div>
      </Popup>
    </>
  );
};

export default MarketDetail;
