import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Phone,
  ShieldPlus,
  ShieldCheck,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { http } from "@/utils/http";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation({
    mutationFn: async () => {
      const res = await http.post("/AuthenticationAdminLogin", {
        Email: phone,
        PIN: password,
      });
      return res;
    },
    onSuccess: (result) => {
      if (result?.data?.status === "SUCCESS") {
        sessionStorage.setItem("memberId", result?.data?.data?.AltMobileNo);
        navigate("/admin");
      } else {
        toast.error(result?.data?.message);
      }
      setPhone("");
      setPassword("");
    },
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Glass Card */}
      <div className="w-full max-w-md  backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <ShieldCheck size={40} className="text-black" />
          </div>

          <h1 className="text-2xl font-bold text-black">Admin Login</h1>
          <p className="text-white/70 mt-1 text-sm">
            Secure access to dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* User ID */}
          <div className="relative">
            <Input
              type="text"
              placeholder="User ID"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-12 bg-white/20 border-orange-500/30 text-black placeholder:text-black focus:ring-2 focus:ring-orange/40"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 pr-10 bg-white/20 border-orange-500/30 text-black placeholder:text-black/60 focus:ring-2 focus:ring-white/40"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-black/70 hover:text-black"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full h-12 font-semibold rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-red-600 hover:bg-white/90 transition-all duration-200 shadow-lg"
          >
            {loginMutation.isPending ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-white/60 text-xs mt-6">
          Protected by secure authentication
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
