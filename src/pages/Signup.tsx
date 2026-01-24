import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  User,
  SquareUserRound,
  UserCog,
  Phone,
  CircleUserRound,
  Lock,
  MailOpen,
  ShieldHalf,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { http } from "@/utils/http";

const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    password: "",
    confPassword: "",
    contact: "",
    verificationCode: "",
    invitationCode: "",
  });

  const [agreeTerms, setAgreeTerms] = useState(false);

  const signupMutation = useMutation({
    mutationFn: async () => {
      const response = await http.post("/ConsumerSignup", {
        // Referral: data.sponsorAccountNumber,
        // ReferralName: data.sponsorAccountName,
        // FirstName: data.fullName,
        // MobileNo: data.contact,
        // EmailID: data.email,
      });
      return response.data;
    },
    onSuccess: () => {
      navigate("/login");
    },
  });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreeTerms) {
      toast({
        title: "Error",
        description: "Please agree to the terms and conditions",
        variant: "destructive",
      });
      return;
    }

    signupMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        <div className="text-center mb-4">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">
              <CircleUserRound size={40} className="text-primary" />
            </span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
          <p className="text-muted-foreground mt-2">
            Start your trading journey
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-3">
          {/* CONTACT NUMBER */}
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Contact number"
              value={data.contact}
              onChange={(e) => setData({ ...data, contact: e.target.value })}
              className="pl-10 h-12 bg-muted border-border"
              required
            />
          </div>

          {/* Name Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="pl-10 h-12 bg-muted border-border"
              required
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={data.confPassword}
              onChange={(e) =>
                setData({ ...data, confPassword: e.target.value })
              }
              className="pl-10 h-12 bg-muted border-border"
              required
            />
          </div>

          {/* INVITATION CODE */}
          <div className="relative">
            <MailOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Invitation code"
              className="pl-10 h-12 bg-muted border-border"
              value={data.invitationCode}
              onChange={(e) =>
                setData({ ...data, invitationCode: e.target.value })
              }
              required
            />
          </div>

          {/* VERIFICATION CODE */}
          {/* <div className="relative">
            <ShieldHalf className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Verification code"
              className="pl-10 h-12 bg-muted border-border"
              required
              value={data.verificationCode}
              onChange={(e) => {
                setData({ ...data, verificationCode: e.target.value });
              }}
            />
          </div> */}

          {/* Terms Checkbox */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={agreeTerms}
              onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
              className="mt-1"
            />
            <label
              htmlFor="terms"
              className="text-sm text-muted-foreground leading-relaxed"
            >
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
            disabled={signupMutation.isPending}
          >
            {signupMutation.isPending
              ? "Creating account..."
              : "Create Account"}
          </Button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-1 text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
