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
  // { icon: Heart, label: "Invite Friends", path: "/invite-friends" },
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
      <div className=" p-4 pb-8">
        <div className="relative flex items-center justify-between p-4 rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white shadow-2xl overflow-hidden">
          {/* Glow blobs */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-400/30 blur-3xl rounded-full" />
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/30 blur-3xl rounded-full" />

          {/* LEFT */}
          <div className="relative flex items-center gap-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-400 text-blue-900 flex items-center justify-center text-2xl shadow-xl ring-2 ring-white/20">
                <User />
              </div>

              {/* Online Dot */}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full animate-pulse"></span>
            </div>

            {/* User Info */}
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-wide">
                {data?.MobileNo}
              </span>

              <div className="flex items-center gap-2 text-sm text-white/80">
                <span className="opacity-70">ID:</span>

                <span className="font-mono tracking-wider font-medium text-yellow-300">
                  {data?.ConsumerID}
                </span>

                {/* Copy Button */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(data?.ConsumerID || "");
                  }}
                  className="ml-1 p-1 rounded-md bg-white/10 hover:bg-yellow-400 hover:text-blue-900 transition-all"
                >
                  <Copy size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT ACTION */}
          <div className="relative">
            <button className="p-2 rounded-xl bg-white/10 hover:bg-yellow-400 hover:text-blue-900 transition-all shadow-md">
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-2 gap-1 mt-2">
          {/* Card 1 */}
          <div className="relative gradient-primary p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg hover:scale-[1.02] transition">
            <div className="text-xs text-yellow-300 mb-1">Total Assets</div>
            <div className="text-white text-2xl font-bold tracking-wide">
              ${dashboardData?.data[0]?.LevelIncome || 0}
            </div>

            {/* Glow */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-yellow-400/20 blur-2xl rounded-full"></div>
          </div>

          {/* Card 2 */}
          <div className="relative p-4 gradient-primary rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg hover:scale-[1.02] transition">
            <div className="text-xs text-yellow-300 mb-1">Balance</div>
            <div className="text-white text-2xl font-bold tracking-wide">
              ${dashboardData?.data[0]?.Balance || 0}
            </div>

            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-blue-400/20 blur-2xl rounded-full"></div>
          </div>

          {/* Card 3 */}
          <div className="relative gradient-primary p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg hover:scale-[1.02] transition">
            <div className="text-xs text-yellow-300 mb-1">
              Time Deposit (1 yr)
            </div>
            <div className="text-white text-2xl font-bold tracking-wide">
              ${dashboardData?.data[0]?.TotalMemberDeactive || 0}
            </div>

            <div className="absolute -top-6 -left-6 w-20 h-20 bg-blue-500/20 blur-2xl rounded-full"></div>
          </div>

          {/* Card 4 */}
          <div className="relative gradient-primary p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg hover:scale-[1.02] transition">
            <div className="text-xs text-yellow-300 mb-1">Estimated Income</div>
            <div className="text-white text-2xl font-bold tracking-wide">
              ${dashboardData?.data[0]?.TotalIncome || 0}
            </div>

            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-yellow-500/20 blur-2xl rounded-full"></div>
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
