import { useEffect, useState } from "react";
import {
  useNavigate,
  Link,
  useParams,
  useSearchParams,
} from "react-router-dom";
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
  LogIn,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { http } from "@/utils/http";
import Popup from "../components/Popup";
import { Label } from "@radix-ui/react-menubar";

const Signup = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
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
        Referral: data.invitationCode,
        MobileNo: data.contact,
        Password: data.password,
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (data?.status === "INVALID") {
        toast({
          title: "Error",
          description: data.message,
          variant: "destructive",
        });
        return;
      }

      setOpen(true);
      setData({
        password: "",
        confPassword: "",
        contact: "",
        verificationCode: "",
        invitationCode: "",
      });
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

    if (data.password !== data.confPassword) {
      toast({
        title: "Error",
        description: "Passwords does not match",
        variant: "destructive",
      });
      return;
    }

    signupMutation.mutate();
  };

  useEffect(() => {
    if (searchParams.get("ref")) {
      setData({
        ...data,
        invitationCode: searchParams.get("ref"),
      });
    }
  }, [searchParams, data]);

  return (
    <main className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="w-full max-w-md px-6 ">
        {/* Card */}
        <div className="rounded-2xl bg-background backdrop-blur-md shadow-xl border border-border p-8">
          {/* Header */}
          <header className="text-center mb-8">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm"></div>

            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Create Account
            </h1>
            <p className="text-muted-foreground mt-2">
              Start your trading journey in minutes
            </p>
          </header>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            {/* Contact */}
            <div className="relative group">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition" />
              <Input
                type="number"
                placeholder="Contact number"
                value={data.contact}
                onChange={(e) => setData({ ...data, contact: e.target.value })}
                className="pl-10 h-12 bg-muted/50 border-border focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition" />
              <Input
                type="password"
                placeholder="Password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className="pl-10 h-12 bg-muted/50 border-border focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition" />
              <Input
                type="password"
                placeholder="Confirm password"
                value={data.confPassword}
                onChange={(e) =>
                  setData({ ...data, confPassword: e.target.value })
                }
                className="pl-10 h-12 bg-muted/50 border-border focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Invitation Code */}
            <div className="relative group">
              <MailOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition" />
              <Input
                type="text"
                placeholder="Invitation code"
                value={data.invitationCode}
                onChange={(e) =>
                  setData({ ...data, invitationCode: e.target.value })
                }
                className="pl-10 h-12 bg-muted/50 border-border focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-3 pt-1">
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
                <Link
                  to="/terms"
                  className="text-primary font-medium hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-primary font-medium hover:underline"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Button */}
            <Button
              type="submit"
              variant="gradient"
              disabled={signupMutation.isPending || !agreeTerms}
              className="w-full h-12 text-white text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              {signupMutation.isPending ? (
                "Creating account..."
              ) : (
                <>
                  <LogIn /> Create Account
                </>
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center mt-6 text-sm text-muted-foreground">
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

      <Popup
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Account Created Successfully"
      >
        <div className="w-[360px] mt-4 space-y-4">
          {/* Success message */}
          <p className="text-sm text-zinc-600">
            Your account has been created successfully. Please find your login
            credentials below.
          </p>

          {/* Credentials Box */}
          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-zinc-700">User ID</span>
              <span className="text-sm font-mono text-zinc-900">
                {signupMutation?.data?.data?.UserID}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-zinc-700">
                Mobile Number
              </span>
              <span className="text-sm font-mono text-zinc-900">
                {" "}
                {signupMutation?.data?.data?.MobileNo}
              </span>
            </div>
            {/* <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-zinc-700">Email</span>
              <span className="text-sm font-mono text-zinc-900">
                {" "}
                {signupMutation?.data?.data?.Email}
              </span>
            </div> */}
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-zinc-700">
                Joining Date
              </span>
              <span className="text-sm font-mono text-zinc-900">
                {" "}
                {signupMutation?.data?.data?.JoiningDate}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-zinc-700">
                Referral ID
              </span>
              <span className="text-sm font-mono text-zinc-900">
                {" "}
                {signupMutation?.data?.data?.ReferralID}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-zinc-700">
                Password
              </span>
              <span className="text-sm font-mono text-zinc-900">
                {" "}
                {signupMutation?.data?.data?.Pass}
              </span>
            </div>
          </div>

          {/* Info note */}
          {/* <p className="text-xs text-zinc-500">
            For security reasons, please change your password after first login.
          </p> */}

          {/* CTA */}
          <Button onClick={() => navigate("/login")} className="w-full mt-2">
            Proceed to Login
          </Button>
        </div>
      </Popup>
    </main>
  );
};

export default Signup;
