import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, Phone, MailOpen, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { http } from "@/utils/http";

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
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="w-full max-w-md px-6">
        {/* Card */}
        <div className="rounded-2xl bg-background/80 backdrop-blur-xl shadow-xl border border-border p-8">
          {/* Header */}
          <header className="text-center mb-10">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm"></div>

            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Welcome Back 👋
            </h1>
            <p className="text-muted-foreground mt-2">
              Sign in to continue to your account
            </p>
          </header>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Invitation ID */}
            <div className="relative group">
              <MailOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition" />
              <Input
                type="text"
                placeholder="Invitation ID"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10 h-12 bg-muted/50 border-border focus:ring-2 focus:ring-primary "
                required
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 h-12 bg-muted/50 border-border focus:ring-2 focus:ring-primary"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Button */}
            <Button
              variant="gradient"
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-white text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              {isLoading ? (
                "Signing you in..."
              ) : (
                <>
                  <LogIn /> Sign In
                </>
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center mt-8 text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-semibold hover:underline"
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
