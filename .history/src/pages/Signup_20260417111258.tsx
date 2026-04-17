import { useEffect, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Phone, Lock, MailOpen, LogIn, X } from "lucide-react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { http } from "@/utils/http";
import logo from "../../assets/AlphaLogo2.png";

const Popup = ({ isOpen, onClose, title, children }: any) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-[100000] w-[90%]  max-w-md bg-white rounded-2xl shadow-2xl p-6 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold">{title}</h1>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {children}
      </div>
    </div>,
    document.body,
  );
};

const Signup = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [open, setOpen] = useState(false);

  const [data, setData] = useState({
    password: "",
    confPassword: "",
    contact: "",
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
    onSuccess: (res) => {
      if (res?.status === "INVALID") {
        toast({
          title: "Error",
          description: res.message,
          variant: "destructive",
        });
        return;
      }

      setOpen(true);

      setData({
        password: "",
        confPassword: "",
        contact: "",
        invitationCode: "",
      });
    },
  });

  const handleSignup = (e: any) => {
    e.preventDefault();

    if (!agreeTerms) {
      toast({
        title: "Error",
        description: "Please agree to the terms",
        variant: "destructive",
      });
      return;
    }

    if (data.password !== data.confPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    signupMutation.mutate();
  };

  // ✅ FIXED (no infinite loop)
  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      setData((prev) => ({
        ...prev,
        invitationCode: ref,
      }));
    }
  }, [searchParams]);

  return (
    <>
      {/* MAIN UI */}
      <main className="min-h-screen flex items-center overflow-y-scroll justify-center bg-gradient-to-br from-slate-50 via-white to-emerald-50 isolate">
        <div className="w-full max-w-md  py-8 ">
          <div className="rounded-3xl shadow-xl border border-emerald-100/80 bg-white overflow-hidden">
            {/* Header with subtle gradient accent */}
            <div className="bg-gradient-to-r from-orange-600 to-teal-600 px-8 py-8 text-center relative">
              <div className="absolute inset-0 bg-[radial-gradient(at_center,#ffffff15_0%,transparent_70%)]" />

              <img
                src={logo}
                alt="Logo"
                width={92}
                className="mx-auto mt-36 drop-shadow-md"
              />

              <h1 className="text-3xl font-semibold text-white tracking-tight">
                Create Account
              </h1>
              <p className="text-emerald-100 mt-2 text-[15px]">
                Join our trading platform in seconds
              </p>
            </div>

            {/* Form Section */}
            <div className="p-8 pt-6">
              <form onSubmit={handleSignup} className="space-y-6">
                {/* Contact Number */}
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 w-5 h-5" />
                  <Input
                    type="number"
                    placeholder="Contact number"
                    value={data.contact}
                    onChange={(e) =>
                      setData({ ...data, contact: e.target.value })
                    }
                    className="pl-12 h-12 border-emerald-100 focus:border-emerald-500 focus:ring-emerald-500 transition-all text-base"
                    required
                  />
                </div>

                {/* Password */}
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 w-5 h-5" />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    className="pl-12 h-12 border-emerald-100 focus:border-emerald-500 focus:ring-emerald-500 transition-all text-base"
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 w-5 h-5" />
                  <Input
                    type="password"
                    placeholder="Confirm password"
                    value={data.confPassword}
                    onChange={(e) =>
                      setData({ ...data, confPassword: e.target.value })
                    }
                    className="pl-12 h-12 border-emerald-100 focus:border-emerald-500 focus:ring-emerald-500 transition-all text-base"
                    required
                  />
                </div>

                {/* Invitation Code */}
                <div className="relative group">
                  <MailOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Invitation code (optional)"
                    value={data.invitationCode}
                    onChange={(e) =>
                      setData({ ...data, invitationCode: e.target.value })
                    }
                    className="pl-12 h-12 border-emerald-100 focus:border-emerald-500 focus:ring-emerald-500 transition-all text-base"
                  />
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-start gap-3 pt-2">
                  <Checkbox
                    checked={agreeTerms}
                    onCheckedChange={(c) => setAgreeTerms(!!c)}
                    className="mt-0.5 border-emerald-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                  />
                  <label className="text-sm text-slate-600 leading-relaxed">
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                {/* Submit Button */}
                <Button
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-lg shadow-emerald-500/30 disabled:opacity-70"
                  type="submit"
                  disabled={signupMutation.isPending || !agreeTerms}
                >
                  {signupMutation.isPending
                    ? "Creating Account..."
                    : "Create Account"}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-widest text-slate-400 bg-white px-4">
                  Secure &amp; Simple
                </div>
              </div>

              {/* Footer */}
              <p className="text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>

          {/* Trust signals */}
          <div className="text-center mt-6 text-xs text-slate-400 flex items-center justify-center gap-4">
            <span>🔒 SSL Secured</span>
            <span>•</span>
            <span>256-bit Encryption</span>
          </div>
        </div>

        {/* Success Popup - Also Updated */}
        <Popup
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Account Created Successfully"
          className="max-w-sm"
        >
          <div className="space-y-6">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-3xl">🎉</span>
              </div>
              <p className="text-slate-600">
                Welcome aboard! Here are your login details:
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">User ID</span>
                <span className="font-mono font-medium text-emerald-700">
                  {signupMutation?.data?.data?.UserID}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Mobile Number</span>
                <span className="font-medium">
                  {signupMutation?.data?.data?.MobileNo}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Password</span>
                <span className="font-mono font-medium text-rose-600">
                  {signupMutation?.data?.data?.Pass}
                </span>
              </div>
            </div>

            <Button
              onClick={() => navigate("/login")}
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-base font-semibold"
            >
              Continue to Login
            </Button>
          </div>
        </Popup>
      </main>
    </>
  );
};

export default Signup;
