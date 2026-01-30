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
import BCTrade from "../../assets/BC_Trade.png";
import Popup from "@/components/Popup";
import { useEffect, useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const marketData = useMarketData();
  const [isOpen, setIsOpen] = useState(false);
  const memberId = sessionStorage.getItem("memberId");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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

  console.log(open);

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
            <></>
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
        <div className="text-primary font-bold text-lg">
          <img src={BCTrade} alt="BCTrade" width={50} />
        </div>
        <h2 className="text-xl font-bold text-foreground mt-1">
          Daily returns up to{" "}
          <span className="text-destructive text-3xl font-extrabold">5-8%</span>
        </h2>
        <p className="text-sm text-muted mt-1">
          powered by advanced AI algorithms
        </p>
        <p className="text-sm text-muted mt-1">
          Daily Trading Time :{" "}
          <span className="font-semibold ">07:00 PM - 08:00 PM</span>
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
        <Link
          to={"https://t.me/+dn1BMosSi1hmZmQ1"}
          target="_blank"
          className="action-card p-4 flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center">
            <MessageCircle className="text-primary" size={24} />
          </div>
          <span className="font-bold text-foreground text-sm">Telegram CC</span>
        </Link>
        <Link
          to={"https://t.me/+kwzbxbtYbQFhZjU1"}
          target="_blank"
          className="action-card p-4 flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center">
            <Megaphone className="text-primary" size={24} />
          </div>
          <span className="font-bold text-foreground text-sm">
            Official Channel
          </span>
        </Link>
      </div>

      {/* Referral Banner */}
      <div className="mx-3 mt-4 rounded-xl overflow-hidden gradient-primary p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <h3 className="font-bold text-lg">LEVEL UP YOUR EARNINGS</h3>
            <p className="text-sm opacity-90">
              Get 10% rewards when your friends make their first deposit
            </p>
          </div>
          <button
            onClick={() => navigate("/invite-friends")}
            className="bg-white/20 px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1"
          >
            <Share2 size={14} />
            Share
          </button>
        </div>
        <p className="text-sm opacity-90 p-1 rounded-xl border text-center mt-5 shadow-md bg-white font-semibold text-primary">
          <Link to={"https://t.me/+kwzbxbtYbQFhZjU1"} target="_blank">
            Join official channel for getting trade signal
          </Link>
        </p>
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
          className="w-full mt-3 text-primary border-primary hover:bg-primary/10 hover:text-primary"
          onClick={() => navigate("/market")}
        >
          View More
          <ChevronRight className="w-4 h-4 ml-1" />
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
                className="text-blue-600 underline"
              >
                https://t.me/+kwzbxbtYbQFhZjU1
              </a>
            </p>
            <p className="text-red-600 font-medium">
              ⏰ Daily Signal Time:{" "}
              <span className="bg-red-100 px-2 py-0.5 rounded">7pm to 8pm</span>
            </p>
            <p className="text-green-600 font-medium">
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
              Invite friends to Qspeed, and you will get{" "}
              <span className="font-bold">10%</span> bonus on their first
              deposit!
            </p>
            <p>Example: Your friend deposits ₹50000, and you earn ₹5000!</p>
            <p className="text-red-600 font-semibold text-center">
              🔥 The more you invite, the more you earn! 🔥
            </p>
          </div>
          {/* <button
            onClick={() => setIsOpen(false)}
            className="mt-4 w-full text-blue-600 font-medium border-t pt-2 hover:text-blue-700"
          >
            confirm
          </button> */}
        </div>
      </Popup>
    </div>
  );
};

export default Home;
