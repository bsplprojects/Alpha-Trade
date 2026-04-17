import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Phone,
  MailOpen,
  LogIn,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { http } from "@/utils/http";
import logo from "../../assets/AlphaLogo2.png";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { mob, pass } = location.state || {};

  const loginMutation = useMutation({
    mutationFn: async () => {
      const res = await http.post("/Authentication", {
        Email: phone,
        PIN: password,
      });
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.status === "SUCCESS") {
        navigate("/");
      } else if (data?.status === "FAILURE") {
        toast({
          title: "Error",
          description: data.message,
          variant: "destructive",
        });
      }
      sessionStorage.setItem("memberId", data?.data?.ConsumerID);
      setPhone("");
      setPassword("");
    },
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  useEffect(() => {
    if (mob && pass) {
      setPhone(mob);
      setPassword(pass);
    }
  }, [mob, pass]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-emerald-50 isolate">
      <div className="w-full max-w-md px-6 py-8">
        {/* Card */}
        <div className="relative rounded-3xl bg-white shadow-xl border border-emerald-100/80 overflow-hidden">
          {/* Header with Pista Green Accent */}
          <div className="bg-gradient-to-r from-orange-400 to-red-600 px-8 py-10 text-center relative">
            <div className="absolute inset-0 bg-[radial-gradient(at_center,#ffffff15_0%,transparent_70%)]" />

            <div className="flex items-center justify-center mb-5">
              <img
                src={logo}
                alt="Logo"
                width={92}
                className="drop-shadow-md"
              />
            </div>

            <h1 className="text-3xl font-semibold text-white tracking-tight">
              Welcome Back
            </h1>
            <p className="text-emerald-100 mt-2 text-[15px]">
              Sign in to access your trading account
            </p>
          </div>

          {/* Form Section */}
          <div className="p-8 pt-10">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* User ID */}
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                <Input
                  type="text"
                  placeholder="User ID"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-12 h-12 border-emerald-100 focus:border-emerald-500 focus:ring-emerald-500 rounded-2xl text-base transition-all"
                  required
                />
              </div>

              {/* Password */}
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />

                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 h-12 border-emerald-100 focus:border-emerald-500 focus:ring-emerald-500 rounded-2xl text-base transition-all"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-emerald-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-2xl shadow-lg shadow-emerald-500/30 transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  "Signing you in..."
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest text-slate-400 bg-white px-4">
                Secure Login
              </div>
            </div>

            {/* Footer */}
            <p className="text-center text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Trust Bar */}
        <div className="text-center mt-6 text-xs text-slate-400 flex items-center justify-center gap-4">
          <span>🔒 SSL Secured</span>
          <span>•</span>
          <span>256-bit Encryption</span>
        </div>
      </div>
    </main>
  );
};

export default Login;
