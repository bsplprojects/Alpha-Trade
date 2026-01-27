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

const Home = () => {
  const navigate = useNavigate();
  const marketData = useMarketData();
  const memberId = sessionStorage.getItem("memberId");

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
      <div className="gradient-header flex items-center justify-between px-4 py-3">
        <div className="font-bold text-lg text-white">
          ₹{data?.data[0]?.Balance}
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Bell size={16} className="text-white" />
          </div>
          {memberId ? (
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <User2Icon size={16} className="text-white" />
            </div>
          ) : (
            <Link
              to={"/login"}
              className="bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-1 rounded-md"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Hero Banner */}
      <div className="mx-3 mt-3 rounded-xl overflow-hidden gradient-banner p-4 relative">
        <div className="text-primary font-bold text-lg">BC Trade</div>
        <h2 className="text-xl font-bold text-foreground mt-1">
          Daily returns up to{" "}
          <span className="text-destructive text-3xl font-extrabold">5-8%</span>
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          powered by advanced ai algorithms
        </p>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-6xl opacity-20">
          💰
        </div>
      </div>

      {/* Welcome Message */}
      <div className="flex items-center gap-2 px-4 py-3">
        <Volume2 size={18} className="text-primary" />
        <span className="text-primary font-medium">Welcome to BC Trade</span>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-3 px-3">
        <button
          onClick={() => navigate("/recharge")}
          className="action-card p-4 flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center">
            <CreditCard className="text-primary" size={24} />
          </div>
          <span className="font-bold text-foreground">Recharge</span>
        </button>
        <button
          onClick={() => navigate("/withdraw")}
          className="action-card p-4 flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center">
            <ArrowDownToLine className="text-primary" size={24} />
          </div>
          <span className="font-bold text-foreground">Withdraw</span>
        </button>
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
          <span className="font-bold text-foreground text-sm">
            Official Channel
          </span>
        </div>
      </div>

      {/* Referral Banner */}
      <div className="mx-3 mt-4 rounded-xl overflow-hidden gradient-primary p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🪙</div>
          <div className="flex-1">
            <h3 className="font-bold text-lg">LEVEL UP YOUR EARNINGS</h3>
            <p className="text-sm opacity-90">
              Get 10% rewards when your friends make their first deposit
            </p>
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
          {displayedMarket.map((item) => (
            <MarketItem key={item.code} {...item} />
          ))}
        </div>

        {/* View More Button */}
        <Button
          variant="outline"
          className="w-full mt-3 text-primary border-primary hover:bg-primary/10"
          onClick={() => navigate("/market")}
        >
          View More
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      <div className="h-8" />
    </div>
  );
};

export default Home;
