import { ArrowLeft, Copy } from "lucide-react";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Invitation = () => {
  const navigate = useNavigate();
  const memberId = sessionStorage.getItem("memberId");
  const inviteLink = window.location.origin + `/signup?ref=${memberId}`;

  return (
    <main className="page-content">
      <header className="header-gradient flex items-center gap-2">
        <ArrowLeft onClick={() => navigate(-1)} />
        <h1 className="text-lg text-white">Referral link</h1>
      </header>

      <div className="flex items-center flex-col mt-5">
        <h1 className="text-lg px-5 font-semibold text-zinc-800 text-center">
          Earn <span className="text-primary">10%</span> of your friend’s first
          deposit by inviting them 🎉
        </h1>
      </div>

      <div
        style={{
          height: "auto",
          margin: "0 auto",
          maxWidth: 200,
          width: "100%",
          marginTop: 30,
          marginBottom: 30,
        }}
      >
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={inviteLink}
          viewBox={`0 0 256 256`}
        />
      </div>

      <div className="flex items-center justify-center flex-col ">
        <h2 className="mb-3 border px-5 py-2 bg-background rounded-xl shadow ">
          Your Referral Code :<span className="font-bold"> {memberId}</span>
        </h2>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(inviteLink);
            toast.success("Copied to clipboard");
          }}
        >
          <Copy /> Copy Referral Link
        </Button>
      </div>
    </main>
  );
};

export default Invitation;
