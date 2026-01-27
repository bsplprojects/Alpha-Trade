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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMember } from "../hooks/useMember";

interface MenuItem {
  icon: LucideIcon;
  label: string;
  path?: string;
}

const menuItems: MenuItem[] = [
  { icon: CreditCard, label: "Recharge record", path: "/recharge-record" },
  { icon: ArrowDownToLine, label: "Withdrawal record" },
  { icon: FileText, label: "My Order" },
  { icon: RefreshCw, label: "Acc change" },
  { icon: BankCard, label: "Bank card" },
];

const menuItems2: MenuItem[] = [
  { icon: MessageSquare, label: "Message Center" },
  { icon: Heart, label: "Invite Friends" },
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

  return (
    <div className="page-content bg-background">
      {/* Profile Header */}
      <div className="gradient-primary p-4 pb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl border-2 border-white/30">
              🎯
            </div>
            <div>
              <div className="text-white font-bold text-lg">
                {data?.MobileNo}
              </div>
              <div className="text-white/80 text-sm flex items-center gap-1">
                Invite: {data?.ConsumerID} 📋
              </div>
            </div>
          </div>
          <button className="text-white/80 hover:text-white transition-colors">
            <Settings size={22} />
          </button>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="text-center">
            <div className="text-white/70 text-sm">Total assets</div>
            <div className="text-white text-xl font-bold">₹0</div>
          </div>
          <div className="text-center border-l border-white/20">
            <div className="text-white/70 text-sm">Balance</div>
            <div className="text-white text-xl font-bold">₹0</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="text-center">
            <div className="text-white/70 text-sm">Time deposit(1 yr)</div>
            <div className="text-white text-xl font-bold">₹0</div>
          </div>
          <div className="text-center border-l border-white/20">
            <div className="text-white/70 text-sm">Estimated income</div>
            <div className="text-white text-xl font-bold">₹0</div>
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
