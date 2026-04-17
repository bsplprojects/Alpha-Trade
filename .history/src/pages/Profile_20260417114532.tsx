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
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMember } from "../hooks/useMember";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { http } from "@/utils/http";
import PageHeader from "@/components/PageHeader";
import { useState } from "react";
import { toast } from "sonner";
import ProfileUpload from "@/components/ProfileUpload";

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
  // { icon: RefreshCw, label: "Acc change" },
  { icon: BankCard, label: "Bank card", path: "/bank" },
];

const menuItems2: MenuItem[] = [
  { icon: MessageSquare, label: "Message Center" },
  { icon: Heart, label: "Referral link", path: "/invite-friends" },
];

const Profile = () => {
  const navigate = useNavigate();
  const client = useQueryClient();
  const [file, setFile] = useState(null);
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

  const handleFileMutation = useMutation({
    mutationFn: async (formdata: FormData) => {
      const res = await http.post("/UploadProfile", formdata);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success("Profile updated successfully");
      client.invalidateQueries({ queryKey: ["member-details", memberId] });
    },
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);

    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("MID", memberId);

    handleFileMutation.mutate(formData);
  };

  const uri = data?.Placement?.split("../")[2];
  const profileURL = `https://api.alphatrade24.com/${uri}`;
  console.log(profileURL);

  return (
    <div className="page-content bg-background">
      <PageHeader title="Profile" />
      {/* Profile Header */}
      <div className="p-4 pb-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-orange-500 via-orange-600 to-red-700 p-6 text-black shadow-2xl overflow-hidden">
          {/* Shiny White Diagonal Gradient Overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
          linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.45) 0%,
            rgba(255, 255, 255, 0.25) 25%,
            rgba(255, 255, 255, 0.08) 45%,
            transparent 70%
          )
        `,
              transform: "rotate(18deg) translate(-25%, -30%)",
            }}
          />

          {/* Subtle second shine layer */}
          <div
            className="absolute inset-0 pointer-events-none opacity-50"
            style={{
              background: `
          linear-gradient(
            125deg,
            transparent 35%,
            rgba(255, 255, 255, 0.30) 48%,
            transparent 65%
          )
        `,
              transform: "rotate(-12deg) translate(20%, 25%)",
            }}
          />

          {/* HEADER - User Profile */}
          <div className="relative flex items-center justify-between p-5 bg-white/20 backdrop-blur-md rounded-2xl mb-6 border border-white/30">
            {/* LEFT - User Info */}
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <ProfileUpload />

              {/* User Details */}
              <div>
                <div className="font-semibold text-xl tracking-wide text-black">
                  {data?.MobileNo || "User"}
                </div>
                <div className="flex items-center  gap-2 text-sm text-black/70 mt-1">
                  <span>ID:</span>
                  <span className="font-mono font-medium text-black">
                    {data?.ConsumerID || "N/A"}
                  </span>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(data?.ConsumerID || "");
                    }}
                    className="ml-1 p-1.5 rounded-lg bg-white/70 hover:bg-white transition-all active:scale-95"
                  >
                    <Copy size={15} className="text-black" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* BALANCE CARDS GRID */}
          <div className="grid grid-cols-2 gap-3">
            {/* Total Assets */}
            <div className="relative bg-white/20 backdrop-blur-xl border border-white/30 p-5 rounded-2xl hover:bg-white/30 transition-all">
              <div className="text-xs uppercase tracking-widest text-black/70">
                Total Assets
              </div>
              <div className="text-3xl font-bold mt-3 text-black">
                ${dashboardData?.data[0]?.LevelIncome || 0}
              </div>
            </div>

            {/* Balance */}
            <div className="relative bg-white/20 backdrop-blur-xl border border-white/30 p-5 rounded-2xl hover:bg-white/30 transition-all">
              <div className="text-xs uppercase tracking-widest text-black/70">
                Balance
              </div>
              <div className="text-3xl font-bold mt-3 text-black">
                ${dashboardData?.data[0]?.Balance || 0}
              </div>
            </div>

            {/* Time Deposit (1 yr) */}
            <div className="relative bg-white/20 backdrop-blur-xl border border-white/30 p-5 rounded-2xl hover:bg-white/30 transition-all">
              <div className="text-xs uppercase tracking-widest text-black/70">
                Time Deposit (1 yr)
              </div>
              <div className="text-3xl font-bold mt-3 text-black">
                ${dashboardData?.data[0]?.TotalMemberDeactive || 0}
              </div>
            </div>

            {/* Estimated Income */}
            <div className="relative bg-white/20 backdrop-blur-xl border border-white/30 p-5 rounded-2xl hover:bg-white/30 transition-all">
              <div className="text-xs uppercase tracking-widest text-black/70">
                Estimated Income
              </div>
              <div className="text-3xl font-bold mt-3 text-black">
                ${dashboardData?.data[0]?.TotalIncome || 0}
              </div>
            </div>
          </div>

          {/* Bottom AI Branding */}
          <div className="flex justify-center mt-8">
            <div className="text-xs flex items-center gap-2 text-black/70">
              <span>POWERED BY AI</span>
              <div className="w-px h-3 bg-black/40" />
              <span>Smart Trading System</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-card mt-2 bg-gradient-to-r from-orange-300 to-red-500">
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

      <div className="bg-card mt-2 bg-gradient-to-r from-orange-300 to-red-500">
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
