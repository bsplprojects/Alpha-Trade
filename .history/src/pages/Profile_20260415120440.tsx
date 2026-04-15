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
      <div className="gradient-primary p-4 pb-8">
        <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-br from-blue-900 to-blue-950 shadow-xl">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-yellow-400/50 flex items-center justify-center text-2xl shadow-lg">
                <User/>
              </div>

              {/* Online Dot */}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-blue-900 rounded-full"></span>
            </div>

            {/* User Info */}
            <div className="flex flex-col">
              <span className="text-white font-semibold text-lg tracking-wide">
                {data?.MobileNo}
              </span>

              <div className="flex items-center gap-2 text-sm text-yellow-300">
                <span className="opacity-80">ID:</span>
                <span className="font-mono tracking-wider">
                  {data?.ConsumerID}
                </span>

                {/* Copy Button */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(data?.ConsumerID || "");
                  }}
                  className="ml-1 text-yellow-300 hover:text-white transition"
                >
                  <Copy size={15}/>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <button className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md transition shadow-md">
            <Settings size={20} className="text-white" />
          </button>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          {/* Card 1 */}
          <div className="relative p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg hover:scale-[1.02] transition">
            <div className="text-xs text-yellow-300 mb-1">Total Assets</div>
            <div className="text-white text-2xl font-bold tracking-wide">
              ${dashboardData?.data[0]?.LevelIncome || 0}
            </div>

            {/* Glow */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-yellow-400/20 blur-2xl rounded-full"></div>
          </div>

          {/* Card 2 */}
          <div className="relative p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg hover:scale-[1.02] transition">
            <div className="text-xs text-yellow-300 mb-1">Balance</div>
            <div className="text-white text-2xl font-bold tracking-wide">
              ${dashboardData?.data[0]?.Balance || 0}
            </div>

            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-blue-400/20 blur-2xl rounded-full"></div>
          </div>

          {/* Card 3 */}
          <div className="relative p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg hover:scale-[1.02] transition">
            <div className="text-xs text-yellow-300 mb-1">
              Time Deposit (1 yr)
            </div>
            <div className="text-white text-2xl font-bold tracking-wide">
              ${dashboardData?.data[0]?.TotalMemberDeactive || 0}
            </div>

            <div className="absolute -top-6 -left-6 w-20 h-20 bg-blue-500/20 blur-2xl rounded-full"></div>
          </div>

          {/* Card 4 */}
          <div className="relative p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg hover:scale-[1.02] transition">
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
