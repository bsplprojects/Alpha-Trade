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
  TON: {
    name: "TON/USDT",
    price: 5.62,
    change: 2.91,
    volume: "84215.33K",
    icon: "💎",
  },
  ARBX: {
    name: "ARBX/USDT",
    price: 1.12,
    change: -1.45,
    volume: "12450.88K",
    icon: "🟦",
  },
  STRK: {
    name: "STRK/USDT",
    price: 0.89,
    change: 4.22,
    volume: "65231.77K",
    icon: "⚡",
  },
  BLUR: {
    name: "BLUR/USDT",
    price: 0.51,
    change: -2.38,
    volume: "33210.45K",
    icon: "🌫️",
  },
  PYTH: {
    name: "PYTH/USDT",
    price: 0.72,
    change: 3.65,
    volume: "28761.21K",
    icon: "📡",
  },
  ORDI: {
    name: "ORDI/USDT",
    price: 38.7,
    change: -1.12,
    volume: "17422.56K",
    icon: "🟠",
  },
  CYBER: {
    name: "CYBER/USDT",
    price: 6.25,
    change: 5.01,
    volume: "9211.33K",
    icon: "🧠",
  },
  WLD: {
    name: "WLD/USDT",
    price: 2.14,
    change: -3.08,
    volume: "45123.78K",
    icon: "🌍",
  },
  AI: {
    name: "AI/USDT",
    price: 0.37,
    change: 6.72,
    volume: "76812.54K",
    icon: "🤖",
  },
  ARKM: {
    name: "ARKM/USDT",
    price: 1.78,
    change: 1.95,
    volume: "19321.66K",
    icon: "🔍",
  },
  ALT: {
    name: "ALT/USDT",
    price: 0.29,
    change: -2.66,
    volume: "14223.88K",
    icon: "🪙",
  },
  ZETA: {
    name: "ZETA/USDT",
    price: 1.35,
    change: 4.11,
    volume: "27344.91K",
    icon: "✨",
  },
  ACE: {
    name: "ACE/USDT",
    price: 9.42,
    change: -0.78,
    volume: "11872.33K",
    icon: "🃏",
  },
  NTRN: {
    name: "NTRN/USDT",
    price: 0.64,
    change: 2.23,
    volume: "22114.56K",
    icon: "🌌",
  },
  DYM: {
    name: "DYM/USDT",
    price: 3.11,
    change: 3.89,
    volume: "38421.90K",
    icon: "🧬",
  },
  MANTA: {
    name: "MANTA/USDT",
    price: 2.77,
    change: -1.97,
    volume: "27451.21K",
    icon: "🐋",
  },
  PIXEL: {
    name: "PIXEL/USDT",
    price: 0.58,
    change: 5.44,
    volume: "31222.66K",
    icon: "🎮",
  },
  XAI: {
    name: "XAI/USDT",
    price: 1.09,
    change: -2.05,
    volume: "18776.44K",
    icon: "🧠",
  },
  SAGA: {
    name: "SAGA/USDT",
    price: 2.45,
    change: 3.12,
    volume: "14432.77K",
    icon: "📖",
  },
  BEAM: {
    name: "BEAM/USDT",
    price: 0.027,
    change: 6.88,
    volume: "26554.90K",
    icon: "💥",
  },
  TAO: {
    name: "TAO/USDT",
    price: 315.6,
    change: 2.67,
    volume: "9123.45K",
    icon: "🧘",
  },
  FLUX: {
    name: "FLUX/USDT",
    price: 0.93,
    change: -1.22,
    volume: "18234.88K",
    icon: "⚡",
  },
  KAVA: {
    name: "KAVA/USDT",
    price: 0.71,
    change: 1.54,
    volume: "13321.76K",
    icon: "🍶",
  },
  ENS: {
    name: "ENS/USDT",
    price: 18.9,
    change: -0.66,
    volume: "16442.21K",
    icon: "🌐",
  },
  SSV: {
    name: "SSV/USDT",
    price: 24.3,
    change: 4.77,
    volume: "8421.56K",
    icon: "🔐",
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
