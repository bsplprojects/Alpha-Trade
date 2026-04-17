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
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-red-600 to-red-700 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
            <ShieldCheck size={48} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Admin Login</h1>
          <p className="text-orange-100 mt-2">
            Sign in to access the dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* User ID Input */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-300" />
              <Input
                type="text"
                placeholder="User ID"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-11 h-14 bg-white/10 border-white/30 text-white placeholder:text-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 rounded-2xl"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-300" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-11 pr-12 h-14 bg-white/10 border-white/30 text-white placeholder:text-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 rounded-2xl"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-300 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold text-lg rounded-2xl shadow-lg transition-all active:scale-95"
            >
              Sign In
            </Button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-white/50 text-sm mt-8">
          Secure Admin Portal • Buck Softech
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
