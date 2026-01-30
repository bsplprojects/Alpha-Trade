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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { http } from "@/utils/http";
import Popup from "../components/Popup";
import BCTrade from "../../assets/BC_Trade.png";

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
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        <div className="text-center mb-4">
          <div className="w-20 h-20  rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">
              <img src={BCTrade} alt="logo" />
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
              type="number"
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
            disabled={signupMutation.isPending || !agreeTerms}
          >
            {signupMutation.isPending
              ? "Creating account..."
              : "Create Account"}
          </Button>
        </form>

        <Popup isOpen={open} onClose={() => setOpen(false)}>
          <div className="mt-3 max-w-md mx-auto rounded-xl p-6 shadow-sm">
            {/* Header */}
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                ✓
              </div>
              <h1 className="text-lg font-semibold text-zinc-900">
                Account Created Successfully
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Please save your login credentials for future access
              </p>
            </div>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between rounded-lg border px-4 py-2">
                <span className="font-medium text-zinc-600">
                  Invitation Code
                </span>
                <span className="font-semibold text-primary">
                  {signupMutation.data?.data?.UserID}
                </span>
              </div>

              <div className="flex justify-between rounded-lg border px-4 py-2">
                <span className="font-medium text-zinc-600">Password</span>
                <span className="font-semibold text-primary">
                  {signupMutation.data?.data?.Pass}
                </span>
              </div>

              <div className="flex justify-between rounded-lg border px-4 py-2">
                <span className="font-medium text-zinc-600">Phone</span>
                <span className="font-semibold text-primary">
                  {signupMutation.data?.data?.MobileNo}
                </span>
              </div>
            </div>

            <Button
              onClick={() =>
                navigate("/login", {
                  state: {
                    mob: signupMutation.data?.data.MobileNo,
                    pass: signupMutation.data?.data.Pass,
                  },
                })
              }
              className="mt-6 w-full"
            >
              Sign In to Your Account
            </Button>
          </div>
        </Popup>

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
