import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Star } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";

const marketData: Record<string, { name: string; price: number; change: number; volume: string; icon: string }> = {
  ARB: { name: "ARB/USDT", price: 0.20, change: -2.78, volume: "36196.99K", icon: "🔷" },
  AAVE: { name: "AAVE/USDT", price: 164.70, change: -0.98, volume: "55.37K", icon: "👻" },
  DOGE: { name: "DOGE/USDT", price: 0.14, change: -2.17, volume: "677658.70K", icon: "🐕" },
  EOS: { name: "EOS/USDT", price: 0.78, change: -0.66, volume: "1180.28K", icon: "⬡" },
  ADA: { name: "ADA/USDT", price: 0.39, change: -0.90, volume: "107161.19K", icon: "🔵" },
  AVAX: { name: "AVAX/USDT", price: 13.63, change: -1.23, volume: "2125.52K", icon: "🔺" },
  UNI: { name: "UNI/USDT", price: 5.40, change: -1.93, volume: "3691.08K", icon: "🦄" },
  APT: { name: "APT/USDT", price: 1.76, change: -2.28, volume: "4271.01K", icon: "📱" },
  EGLD: { name: "EGLD/USDT", price: 6.10, change: -3.63, volume: "218.31K", icon: "✖️" },
  FTM: { name: "FTM/USDT", price: 0.70, change: -0.77, volume: "1858.97K", icon: "👻" },
  THETA: { name: "THETA/USDT", price: 0.29, change: -4.30, volume: "2755.47K", icon: "🎬" },
  RNDR: { name: "RNDR/USDT", price: 7.03, change: 2.58, volume: "233.25K", icon: "🎨" },
};

// Generate chart data
const generateChartData = (basePrice: number, isPositive: boolean) => {
  const data = [];
  let price = basePrice * 0.95;
  for (let i = 0; i < 24; i++) {
    const variance = (Math.random() - 0.5) * basePrice * 0.1;
    price = price + variance + (isPositive ? basePrice * 0.002 : -basePrice * 0.001);
    data.push({
      time: `${i}:00`,
      price: Math.max(price, basePrice * 0.8),
    });
  }
  return data;
};

const timeFrames = ["Time", "15m", "1H", "4H", "1D", "1W", "1M"];

const MarketDetail = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  
  const data = code ? marketData[code] : null;
  
  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Market data not found</p>
      </div>
    );
  }

  const isPositive = data.change >= 0;
  const chartData = generateChartData(data.price, isPositive);
  const chartColor = isPositive ? "#22c55e" : "#ef4444";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-card border-b border-border">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">{data.name}</h1>
        <button className="p-2 -mr-2">
          <Star className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Price Info */}
      <div className="p-4 bg-card">
        <div className="flex items-baseline gap-3">
          <span className={`text-3xl font-bold ${isPositive ? "text-green-500" : "text-red-500"}`}>
            {data.price.toFixed(2)}
          </span>
          <span className={`text-lg ${isPositive ? "text-green-500" : "text-red-500"}`}>
            {isPositive ? "+" : ""}{data.change.toFixed(2)}%
          </span>
        </div>
        <div className="flex gap-6 mt-2 text-sm text-muted-foreground">
          <span>≈ ${data.price.toFixed(2)}</span>
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

      {/* Chart */}
      <div className="h-64 bg-card p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
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
              tick={{ fill: '#888', fontSize: 10 }}
              interval={5}
            />
            <YAxis 
              domain={['auto', 'auto']}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#888', fontSize: 10 }}
              width={50}
              tickFormatter={(value) => value.toFixed(2)}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={chartColor}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPrice)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 p-4 bg-card mt-2">
        <div>
          <p className="text-xs text-muted-foreground">24H High</p>
          <p className="text-sm font-medium text-foreground">{(data.price * 1.05).toFixed(4)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">24H Low</p>
          <p className="text-sm font-medium text-foreground">{(data.price * 0.95).toFixed(4)}</p>
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
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border flex gap-4">
        <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-6">
          Buy
        </Button>
        <Button className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-6">
          Sell
        </Button>
      </div>
    </div>
  );
};

export default MarketDetail;
