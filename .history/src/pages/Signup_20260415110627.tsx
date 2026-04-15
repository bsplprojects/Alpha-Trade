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
import logo from "../../assets/Alphatradelogo.png";

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
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <div className="w-full max-w-md px-6">
        {/* Card */}
        <div className="relative rounded-3xl shadow-2xl border border-indigo-100 p-8 bg-white">
          {/* Header */}
          <header className="text-center mb-8 relative z-10">
            {/* Brand */}
            {/* Logo + Brand */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <h1 className="text-2xl">
                <img src={logo} alt="" width={200} />
              </h1>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900">
              Create Account
            </h2>

            <p className="text-gray-500 mt-1 text-sm">
              Start your trading journey in minutes
            </p>
          </header>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-5 relative z-10">
            {/* Contact */}
            <div className="relative group">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition" />
              <Input
                type="tel"
                placeholder="Contact number"
                value={data.contact}
                onChange={(e) => setData({ ...data, contact: e.target.value })}
                className="pl-10 z-10 h-12 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition" />
              <Input
                type="password"
                placeholder="Password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className="pl-10 h-12 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition" />
              <Input
                type="password"
                placeholder="Confirm password"
                value={data.confPassword}
                onChange={(e) =>
                  setData({ ...data, confPassword: e.target.value })
                }
                className="pl-10 h-12 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {/* Invitation Code */}
            <div className="relative group">
              <MailOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition" />
              <Input
                type="text"
                placeholder="Invitation code"
                value={data.invitationCode}
                onChange={(e) =>
                  setData({ ...data, invitationCode: e.target.value })
                }
                className="pl-10 h-12 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
              <label className="text-sm text-gray-500 leading-relaxed">
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="text-indigo-600 font-medium hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-indigo-600 font-medium hover:underline"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Button */}
            <Button
              type="submit"
              disabled={signupMutation.isPending || !agreeTerms}
              className="w-full h-12 text-white text-lg font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
            >
              {signupMutation.isPending ? (
                "Creating account..."
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <LogIn className="w-5 h-5" />
                  Create Account
                </span>
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center mt-6 text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* SUCCESS POPUP (Improved UI) */}
      <Popup
        isOpen={open}
        onClose={() => setOpen(false)}
        title="🎉 Account Created Successfully"
      >
        <div className="w-[360px] mt-4 space-y-4 ">
          <p className="text-sm text-gray-600">
            Your account has been created successfully. Here are your
            credentials:
          </p>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-3">
            {[
              ["User ID", signupMutation?.data?.data?.UserID],
              ["Mobile", signupMutation?.data?.data?.MobileNo],
              ["Joining Date", signupMutation?.data?.data?.JoiningDate],
              ["Referral ID", signupMutation?.data?.data?.ReferralID],
              ["Password", signupMutation?.data?.data?.Pass],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <span className="text-sm text-gray-500">{label}</span>
                <span className="text-sm font-mono text-gray-900">{value}</span>
              </div>
            ))}
          </div>

          <Button
            onClick={() => navigate("/login")}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
          >
            Proceed to Login
          </Button>
        </div>
      </Popup>
    </main>
  );
};

export default Signup;
