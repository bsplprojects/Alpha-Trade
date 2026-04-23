import { ArrowLeft, QrCode, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { http } from "@/utils/http";
import { toast } from "sonner";

const Bank = () => {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const member

  const [data, setData] = useState({
    address: "",
    UserID:"",
    file: null,
  });

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const res = await http.post("/BankDetailsImage", formData);
      return res.data;
    },
    onSuccess: (res) => {
      if (res?.status === "SUCCESS") {
        toast.success("Details saved successfully");
        setData({ address: "", file: null });
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  const handleSubmit = () => {
    if (!data.address) {
      toast.error("Address is required");
      return;
    }

    const formData = new FormData();
    formData.append("Address", data.address);

    if (data.file) {
      formData.append("Image", data.file);
    }

    mutation.mutate(formData);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="header-gradient flex items-center gap-3 px-4 py-3">
        <ArrowLeft className="cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="text-lg text-white font-semibold">Wallet Details</h1>
      </header>

      {/* Card */}
      <div className="p-5">
        <div className="rounded-3xl p-5 bg-gradient-to-br bg-white shadow-xl space-y-5">
          {/* Address */}
          <div className="space-y-1">
            <label className="text-sm text-blue-900 font-medium">
              BEP20 USDT Address <span className="text-red-500">*</span>
            </label>
            <Input
              value={data.address}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
              placeholder="Enter your wallet address"
              className="bg-white/90"
            />
          </div>

          {/* Upload Section */}
          <div className="space-y-2">
            <label className="text-sm text-blue-900 font-medium">
              Upload QR Code
            </label>

            {/* Hidden Input */}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setData((prev) => ({ ...prev, file }));
                }
              }}
            />

            {/* Button */}
            <Button
              onClick={() => fileRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border-2 text-blue-900 font-medium bg-white/10 hover:bg-white/50 transition"
            >
              <QrCode size={18} />
              Choose Image
            </Button>

            {/* Preview */}
            {data.file && (
              <div className="flex items-center justify-between bg-white/40 rounded-xl px-3 py-2 mt-2">
                <span className="text-sm truncate">{data.file.name}</span>

                <X
                  size={16}
                  className="cursor-pointer"
                  onClick={() => setData((prev) => ({ ...prev, file: null }))}
                />
              </div>
            )}
          </div>

          {/* Submit */}
          <Button
            onClick={handleSubmit}
            disabled={mutation.isPending}
            className="w-full"
          >
            {mutation.isPending ? "Saving..." : "Save Details"}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Bank;
