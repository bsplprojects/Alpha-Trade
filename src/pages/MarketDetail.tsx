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
};

const timeFrames = ["Live", "15m", "1H", "4H", "1D", "1W", "1M"];

const MarketDetail = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

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
            <span className="flex items-center gap-1 text-xs text-green-500 animate-pulse">
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
              className={`text-3xl font-bold transition-colors duration-300 ${isPositive ? "text-green-500" : "text-red-500"}`}
            >
              {formatPrice(realtimeData.currentPrice)}
            </span>
            <span
              className={`text-lg transition-colors duration-300 ${isPositive ? "text-green-500" : "text-red-500"}`}
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
            <p className="text-sm font-medium text-green-500">
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
        <div className="flex items-center gap-2 mt-2">
          <Button
            onClick={() => setOpen(true)}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-6"
          >
            Buy
          </Button>
          <Button
            onClick={() => setOpen(true)}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-6"
          >
            Sell
          </Button>
        </div>
      </div>

      {/* POPUP */}
      <Popup isOpen={open} onClose={() => setOpen(false)} title="Confirm Order">
        <div className="w-[300px]">
          <ConfirmOrder data={data} />
        </div>
      </Popup>
    </>
  );
};

export default MarketDetail;
