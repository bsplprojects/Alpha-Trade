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
    <div className="min-h-screen bg-gradient-to-br from-orange-600 via-red-600 to-red-700 flex flex-col overflow-hidden relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(at_50%_30%,rgba(255,255,255,0.08)_0%,transparent_60%)]" />

      {/* Header / Branding */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-2xl tracking-tight">
              Admin Panel
            </h1>
            <p className="text-orange-200 text-xs -mt-1">Secure Access</p>
          </div>
        </div>

        <div className="text-white/70 text-sm">v2.4.1</div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Main Card */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl">
            <div className="text-center mb-10">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-xl">
                <ShieldCheck size={56} className="text-white" />
              </div>

              <h2 className="text-3xl font-semibold text-white mb-2">
                Admin Login
              </h2>
              <p className="text-orange-100/80">
                Enter your credentials to access the admin dashboard
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* User ID */}
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-200" />
                <Input
                  type="text"
                  placeholder="User ID / Email"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-12 h-14 bg-white/10 border-white/30 text-white placeholder:text-orange-100/60 focus:border-orange-400 rounded-2xl"
                  required
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-200" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 h-14 bg-white/10 border-white/30 text-white placeholder:text-orange-100/60 focus:border-orange-400 rounded-2xl"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-200 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full h-14 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold text-lg rounded-2xl shadow-lg shadow-red-500/30 transition-all active:scale-[0.985]"
                disabled={false} // replace with loginMutation.isPending
              >
                Sign In to Admin Dashboard
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-xs text-white/50">
                Protected by enterprise-grade security • Unauthorized access
                prohibited
              </p>
            </div>
          </div>

          {/* Decorative bottom text */}
          <p className="text-center text-white/40 text-sm mt-8">
            © 2026 Buck Softech Admin Portal
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
