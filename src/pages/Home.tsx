import { Volume2, CreditCard, ArrowDownToLine, MessageCircle, Megaphone, Share2 } from "lucide-react";
import MarketItem from "@/components/MarketItem";

const marketData = [
  { code: "ARB", name: "ARB/USDT", volume: "36192.40K", price: 0.20, change: -2.83, icon: "🔷" },
  { code: "AAVE", name: "AAVE/USDT", volume: "55.37K", price: 164.70, change: -0.98, icon: "👻" },
  { code: "DOGE", name: "DOGE/USDT", volume: "677658.70K", price: 0.14, change: -2.17, icon: "🐕" },
];

const Home = () => {
  return (
    <div className="page-content bg-background">
      {/* Header with balance */}
      <div className="gradient-header flex items-center justify-between px-4 py-3">
        <div className="font-bold text-lg">₹3,971.82</div>
        <div className="text-xl font-bold tracking-wide">PLW</div>
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <span className="text-sm">🔔</span>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="mx-3 mt-3 rounded-xl overflow-hidden gradient-banner p-4 relative">
        <div className="text-primary font-bold text-lg">PLW</div>
        <h2 className="text-xl font-bold text-foreground mt-1">
          Daily returns up to <span className="text-destructive text-3xl font-extrabold">10%</span>
        </h2>
        <p className="text-sm text-muted-foreground mt-1">powered by advanced ai algorithms</p>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-6xl opacity-20">💰</div>
      </div>

      {/* Welcome Message */}
      <div className="flex items-center gap-2 px-4 py-3">
        <Volume2 size={18} className="text-primary" />
        <span className="text-primary font-medium">Welcome to PLW</span>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-3 px-3">
        <div className="action-card p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center">
            <CreditCard className="text-primary" size={24} />
          </div>
          <span className="font-bold text-foreground">Recharge</span>
        </div>
        <div className="action-card p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center">
            <ArrowDownToLine className="text-primary" size={24} />
          </div>
          <span className="font-bold text-foreground">Withdraw</span>
        </div>
        <div className="action-card p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center">
            <MessageCircle className="text-primary" size={24} />
          </div>
          <span className="font-bold text-foreground text-sm">Telegram</span>
        </div>
        <div className="action-card p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center">
            <Megaphone className="text-primary" size={24} />
          </div>
          <span className="font-bold text-foreground text-sm">Official Channel</span>
        </div>
      </div>

      {/* Referral Banner */}
      <div className="mx-3 mt-4 rounded-xl overflow-hidden gradient-primary p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🪙</div>
          <div className="flex-1">
            <h3 className="font-bold text-lg">LEVEL UP YOUR EARNINGS</h3>
            <p className="text-sm opacity-90">Get 10% rewards when your friends make their first deposit</p>
          </div>
          <button className="bg-white/20 px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1">
            <Share2 size={14} />
            Share
          </button>
        </div>
      </div>

      {/* Market Section */}
      <div className="mt-6 px-3">
        <h3 className="font-bold text-lg mb-3">Market</h3>
        <div className="bg-card rounded-xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-3 py-3 px-4 text-sm text-muted-foreground border-b border-border">
            <span>Code</span>
            <span className="text-center">Price</span>
            <span className="text-right">Increase</span>
          </div>
          {marketData.map((item) => (
            <MarketItem key={item.code} {...item} />
          ))}
        </div>
      </div>

      <div className="h-8" />
    </div>
  );
};

export default Home;
