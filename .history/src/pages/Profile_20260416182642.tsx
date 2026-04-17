import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  ArrowDownToLine,
  FileText,
  RefreshCw,
  CreditCard as BankCard,
  MessageSquare,
  Heart,
  ChevronRight,
  Settings,
  LucideIcon,
  Copy,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMember } from "../hooks/useMember";
import { useQuery } from "@tanstack/react-query";
import { http } from "@/utils/http";

interface MenuItem {
  icon: LucideIcon;
  label: string;
  path?: string;
}

const menuItems: MenuItem[] = [
  { icon: CreditCard, label: "Deposit record", path: "/recharge-record" },
  {
    icon: ArrowDownToLine,
    label: "Payout record",
    path: "/withdrawal-record",
  },
  { icon: FileText, label: "My Order", path: "/order" },
  { icon: RefreshCw, label: "Acc change" },
  { icon: BankCard, label: "Bank card", path: "/bank" },
];

const menuItems2: MenuItem[] = [
  { icon: MessageSquare, label: "Message Center" },
  { icon: Heart, label: "Referral link", path: "/invite-friends" },
];

const Profile = () => {
  const navigate = useNavigate();
  const memberId = sessionStorage.getItem("memberId");
  const { data } = useMember(memberId);

  const handleMenuClick = (path?: string) => {
    if (path) {
      navigate(path);
    }
  };

  const { data: dashboardData } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await http.post("/MySpDashbordData", {
        UserID: memberId,
      });
      return res.data;
    },
  });

  return (
    <div className="page-content bg-background">
      {/* Profile Header */}
      <div className="p-4 pb-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-zinc-950 via-black to-zinc-950 p-6 text-white shadow-2xl overflow-hidden border border-zinc-800">
          {/* Shiny White Diagonal Gradient Overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
          linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.25) 0%,
            rgba(255, 255, 255, 0.12) 30%,
            rgba(255, 255, 255, 0.05) 50%,
            transparent 70%
          )
        `,
              transform: "rotate(20deg) translate(-30%, -35%)",
            }}
          />

          {/* Subtle second shine layer */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background: `
          linear-gradient(
            125deg,
            transparent 35%,
            rgba(255, 255, 255, 0.18) 48%,
            transparent 65%
          )
        `,
              transform: "rotate(-12deg) translate(20%, 25%)",
            }}
          />

          {/* HEADER - User Profile */}
          <div className="relative flex items-center justify-between p-5 bg-zinc-900/70 backdrop-blur-md rounded-2xl mb-6 border border-zinc-700">
            {/* LEFT - User Info */}
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center text-3xl shadow-inner ring-2 ring-white/10">
                  👤
                </div>

                {/* Online Status */}
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-[3px] border-zinc-950 rounded-full animate-pulse"></span>
              </div>

              {/* User Details */}
              <div>
                <div className="font-semibold text-xl tracking-wide">
                  {data?.MobileNo || "User"}
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-400 mt-1">
                  <span>ID:</span>
                  <span className="font-mono text-emerald-400 font-medium">
                    {data?.ConsumerID || "N/A"}
                  </span>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(data?.ConsumerID || "");
                    }}
                    className="ml-1 p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-all active:scale-95"
                  >
                    <Copy size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT - Settings Button */}
            <button className="p-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 transition-all active:scale-95">
              <Settings size={22} className="text-zinc-300" />
            </button>
          </div>

          {/* BALANCE CARDS GRID */}
          <div className="grid grid-cols-2 gap-3">
            {/* Total Assets */}
            <div className="relative bg-zinc-900/70 backdrop-blur-xl border border-zinc-700 p-5 rounded-2xl hover:border-zinc-500 transition-all group">
              <div className="text-xs uppercase tracking-widest text-zinc-400">
                Total Assets
              </div>
              <div className="text-3xl font-bold mt-3 text-white">
                ${dashboardData?.data[0]?.LevelIncome || 0}
              </div>

              {/* Subtle Glow */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-emerald-500/10 blur-3xl rounded-full group-hover:bg-emerald-500/20 transition-all"></div>
            </div>

            {/* Balance */}
            <div className="relative bg-zinc-900/70 backdrop-blur-xl border border-zinc-700 p-5 rounded-2xl hover:border-zinc-500 transition-all group">
              <div className="text-xs uppercase tracking-widest text-zinc-400">
                Balance
              </div>
              <div className="text-3xl font-bold mt-3 text-white">
                ${dashboardData?.data[0]?.Balance || 0}
              </div>

              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-blue-500/10 blur-3xl rounded-full group-hover:bg-blue-500/20 transition-all"></div>
            </div>

            {/* Time Deposit (1 yr) */}
            <div className="relative bg-zinc-900/70 backdrop-blur-xl border border-zinc-700 p-5 rounded-2xl hover:border-zinc-500 transition-all group">
              <div className="text-xs uppercase tracking-widest text-zinc-400">
                Time Deposit (1 yr)
              </div>
              <div className="text-3xl font-bold mt-3 text-white">
                ${dashboardData?.data[0]?.TotalMemberDeactive || 0}
              </div>

              <div className="absolute -top-8 -left-8 w-24 h-24 bg-violet-500/10 blur-3xl rounded-full group-hover:bg-violet-500/20 transition-all"></div>
            </div>

            {/* Estimated Income */}
            <div className="relative bg-zinc-900/70 backdrop-blur-xl border border-zinc-700 p-5 rounded-2xl hover:border-zinc-500 transition-all group">
              <div className="text-xs uppercase tracking-widest text-zinc-400">
                Estimated Income
              </div>
              <div className="text-3xl font-bold mt-3 text-white">
                ${dashboardData?.data[0]?.TotalIncome || 0}
              </div>

              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-amber-500/10 blur-3xl rounded-full group-hover:bg-amber-500/20 transition-all"></div>
            </div>
          </div>

          {/* Bottom AI Branding */}
          <div className="flex justify-center mt-8 opacity-60">
            <div className="text-xs flex items-center gap-2 text-zinc-400">
              <span>POWERED BY AI</span>
              <div className="w-px h-3 bg-white/30" />
              <span>Smart Trading System</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-card mt-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="menu-item w-full text-left"
            onClick={() => handleMenuClick(item.path)}
          >
            <div className="flex items-center gap-3">
              <item.icon size={20} className="text-muted-foreground" />
              <span className="text-foreground">{item.label}</span>
            </div>
            <ChevronRight size={18} className="text-muted-foreground" />
          </button>
        ))}
      </div>

      <div className="bg-card mt-2">
        {menuItems2.map((item, index) => (
          <button
            key={index}
            className="menu-item w-full text-left"
            onClick={() => handleMenuClick(item.path)}
          >
            <div className="flex items-center gap-3">
              <item.icon size={20} className="text-muted-foreground" />
              <span className="text-foreground">{item.label}</span>
            </div>
            <ChevronRight size={18} className="text-muted-foreground" />
          </button>
        ))}
      </div>

      <Button
        onClick={() => {
          sessionStorage.removeItem("memberId");
          navigate("/login");
        }}
        className="w-full mt-5"
      >
        Logout
      </Button>

      <div className="h-8" />
    </div>
  );
};

export default Profile;
