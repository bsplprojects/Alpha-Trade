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
import logo from "../../assets/AlphaLogo.png";

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
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 isolate">
        <div className="w-full max-w-md px-6">
          <div className="rounded-3xl shadow-2xl border border-indigo-100 p-8 bg-white">
            {/* Header */}
            <header className="text-center mb-8">
              <img src={logo} alt="" width={100} className="mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Create Account
              </h2>
              <p className="text-gray-500 mt-1 text-sm">
                Start your trading journey in minutes
              </p>
            </header>

            {/* Form */}
            <form onSubmit={handleSignup} className="space-y-5">
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  type="number"
                  placeholder="Contact number"
                  value={data.contact}
                  onChange={(e) =>
                    setData({ ...data, contact: e.target.value })
                  }
                  className="pl-10"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  className="pl-10"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Confirm password"
                  value={data.confPassword}
                  onChange={(e) =>
                    setData({ ...data, confPassword: e.target.value })
                  }
                  className="pl-10"
                  required
                />
              </div>

              <div className="relative">
                <MailOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Invitation code"
                  value={data.invitationCode}
                  onChange={(e) =>
                    setData({ ...data, invitationCode: e.target.value })
                  }
                  className="pl-10"
                  required
                />
              </div>

              {/* Terms */}
              <div className="flex items-start space-x-3">
                <Checkbox
                  checked={agreeTerms}
                  onCheckedChange={(c) => setAgreeTerms(!!c)}
                />
                <label className="text-sm text-gray-500">
                  I agree to the{" "}
                  <Link to="/terms" className="text-indigo-600">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-indigo-600">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button
                className="w-full"
                type="submit"
                disabled={signupMutation.isPending || !agreeTerms}
              >
                {signupMutation.isPending ? "Creating..." : "Create Account"}
              </Button>
            </form>

            {/* Footer */}
            <p className="text-center mt-6 text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* ✅ POPUP OUTSIDE MAIN */}
      <Popup
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Registered Successfully"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">Here are your credentials:</p>

          <div className="bg-gray-50 p-4 rounded-xl space-y-2 text-sm">
            <div className="flex justify-between">
              <span>User ID</span>
              <span>{signupMutation?.data?.data?.UserID}</span>
            </div>
            <div className="flex justify-between">
              <span>Mobile</span>
              <span>{signupMutation?.data?.data?.MobileNo}</span>
            </div>
            <div className="flex justify-between">
              <span>Password</span>
              <span>{signupMutation?.data?.data?.Pass}</span>
            </div>
          </div>

          <Button onClick={() => navigate("/login")}>Go to Login</Button>
        </div>
      </Popup>
    </>
  );
};

export default Signup;
