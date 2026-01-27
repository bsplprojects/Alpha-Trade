import PageHeader from "@/components/PageHeader";
import qr from "../../assets/qr.png";
import { Input } from "@/components/ui/input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Image, X } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { http } from "@/utils/http";

const ConfirmRecharge = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const memberId = sessionStorage.getItem("memberId");
  const { channel, amount } = location.state || {};
  const navigate = useNavigate();

  const [data, setData] = useState({
    txnId: "",
    image: null,
  });

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("Image", data.image);
    formData.append("MID", memberId);
    formData.append("Amount", amount);
    formData.append("UTRNo", data.txnId);

    if (!data.txnId) {
      toast({
        title: "Error",
        description: "Transaction ID is required",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await http.post("/AddFundRqu", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data?.status === "SUCCESS") {
        toast({
          title: "Success",
          description: "Recharge successful",
          variant: "default",
        });
        navigate("/recharge-record");
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-content">
      <PageHeader title="Confirm recharge" />
      <Link to="/recharge" className="px-5 mt-2 flex items-center gap-2">
        <ArrowLeft size={16} /> Go back
      </Link>
      <div className="flex items-center justify-center py-3">
        <img src={qr} alt="qr" width={280} />
      </div>

      {/* recharge details */}
      <div className="flex items-center justify-center gap-3 px-10">
        <div className="border border-zinc-300 w-1/2 rounded-2xl shadow p-2 bg-white">
          <h1 className="font-medium px-2">Channel</h1>
          <span className="px-2 text-primary font-bold uppercase">
            {channel}
          </span>
        </div>
        <div className="border border-zinc-300 w-1/2 rounded-2xl shadow p-2 bg-white">
          <h1 className="font-medium px-2">Amount</h1>
          <span className="px-2 text-primary font-bold">₹{amount || 0}</span>
        </div>
      </div>

      {/* Banking details */}
      <div className="px-10 my-4">
        <h1 className="font-semibold px-2">Bank Details</h1>
        <div className="border border-zinc-300 rounded-2xl shadow p-2 bg-white w-full">
          <div className="flex items-center px-1 justify-between">
            <h1 className="font-medium px-2">Account Number</h1>
            <span className="px-2 text-primary font-semibold">42209951129</span>
          </div>
          <div className="flex items-center px-1 justify-between">
            <h1 className="font-medium px-2">IFSC Code</h1>
            <span className="px-2 text-primary font-semibold">SBIN0000230</span>
          </div>
          <div className="flex items-center px-1 justify-between">
            <h1 className="font-medium px-2">Account Holder's Name</h1>
            <span className="px-2 text-primary font-semibold">
              Jyoti Charles
            </span>
          </div>
        </div>
      </div>

      {/* transaction id */}
      <div className="px-10 my-4">
        <label htmlFor="hash" className="font-semibold px-2">
          Transaction ID
        </label>
        <Input
          placeholder="Enter Transaction ID"
          value={data.txnId}
          onChange={(e) =>
            setData((prev) => ({ ...prev, txnId: e.target.value }))
          }
        />
      </div>

      {/* uploaded file name */}
      {data.image && (
        <div className="px-8 py-1 flex items-center  justify-between  border border-dashed w-1/3 rounded-md border-zinc-400 mx-10 ">
          {data.image?.name}

          <button
            onClick={(e) => setData((prev) => ({ ...prev, image: null }))}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* screenshot button */}
      <div className="flex items-center justify-center my-4 px-10">
        <label
          htmlFor="ss"
          className="border-2 border-primary px-4 py-2 rounded-md text-primary font-medium w-full flex items-center justify-center gap-1"
        >
          <Image size={20} /> {data.image ? "Change" : "Upload Screenshot"}
        </label>
        <input
          type="file"
          id="ss"
          className="hidden"
          onChange={(e) => setData({ ...data, image: e.target.files[0] })}
        />
      </div>

      <div className="flex items-center justify-center my-4 px-10">
        <Button
          disabled={loading || !data.txnId}
          onClick={handleSubmit}
          className="w-full"
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </main>
  );
};

export default ConfirmRecharge;
