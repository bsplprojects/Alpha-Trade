import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (!agreeTerms) {
      toast({
        title: "Error",
        description: "Please agree to the terms and conditions",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate signup - replace with actual auth later
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account Created",
        description: "Welcome to the platform!",
      });
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🚀</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
          <p className="text-muted-foreground mt-2">Start your trading journey</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Name Input */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-10 h-12 bg-muted border-border"
              required
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 h-12 bg-muted border-border"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10 h-12 bg-muted border-border"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pl-10 pr-10 h-12 bg-muted border-border"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={agreeTerms}
              onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
              className="mt-1"
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
              I agree to the{" "}
              <Link to="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* Signup Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-border"></div>
          <span className="px-4 text-muted-foreground text-sm">or continue with</span>
          <div className="flex-1 border-t border-border"></div>
        </div>

        {/* Social Login */}
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1 h-12 border-border">
            <span className="text-xl mr-2">🍎</span>
            Apple
          </Button>
          <Button variant="outline" className="flex-1 h-12 border-border">
            <span className="text-xl mr-2">🔵</span>
            Google
          </Button>
        </div>

        {/* Login Link */}
        <p className="text-center mt-8 text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
