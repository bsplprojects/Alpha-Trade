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
import logo from "../../assets/Alphatradelogo.png";

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
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      <div className="w-full max-w-md px-6">
        {/* Card */}
        <div className="relative rounded-3xl bg-white shadow-2xl  p-8">
          {/* Header */}
          <header className="text-center mb-8">
            {/* Logo */}
            <div className="flex items-center justify-center mb-4">
              <img src={logo} alt="" width={200} />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-blue-900">
              Welcome Back
            </h2>

            <p className="text-gray-500 mt-1 text-sm">
              Sign in to continue to your account
            </p>
          </header>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* User ID */}
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-900 transition" />
              <Input
                type="text"
                placeholder="User ID"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10 h-12 border  rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-blue-900"
                required
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-900 transition" />

              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 h-12 border border-yellow-300 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-blue-900"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-900 transition"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end text-sm">
              <button className="text-blue-900 hover:text-yellow-500 transition">
                Forgot password?
              </button>
            </div>

            {/* Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-white text-lg font-semibold rounded-xl bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all"
            >
              {isLoading ? (
                "Signing you in..."
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <LogIn className="w-5 h-5" />
                  Sign In
                </span>
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center mt-6 text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-900 font-semibold hover:text-yellow-500 transition"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
