import { ArrowLeft, Building2, QrCode, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { http } from "@/utils/http";
import { toast } from "sonner";
import { IMAGE_BASE_URL } from "../utils/constants";

const Bank = () => {
  const navigate = useNavigate();
  const client = useQueryClient();
  const memberId = sessionStorage.getItem("memberId");
  const [data, setData] = useState({
    Bank: "",
    AcNo: "",
    IFSC: "",
    Branch: "",
    Name: "",
    Password: "",
    address: "",
    file: null,
  });

  const { data: bankDetails } = useQuery({
    queryKey: ["bank-details"],
    queryFn: async () => {
      const res = await http.post("/BankDetails", {
        UserID: memberId,
      });
      return res.data;
    },
  });

  useEffect(() => {
    if (bankDetails && bankDetails?.status === "SUCCESS") {
      setData({
        Bank: bankDetails?.data?.Bank,
        AcNo: bankDetails?.data?.AccountNo,
        IFSC: bankDetails?.data?.IFSC,
        Branch: bankDetails?.data?.Branch,
        Name: bankDetails?.data?.Name,
        Password: bankDetails?.data?.Password,
      });
    }
  }, [bankDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await http.post("/BankDetails", {
        UserID: memberId,
        Bank: data.Bank,
        AcNo: data.AcNo,
        IFSC: data.IFSC,
        Branch: data.Branch,
        Name: data.Name,
        Password: data.Password,
      });
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.status === "SUCCESS") {
        toast.success(data?.message);
        client.invalidateQueries(["bank-details"]);
      }
    },
  });

  const handleSubmit = () => {
    if (!data.Bank) {
      toast.error("Bank Name is required");
      return;
    }
    if (!data.AcNo) {
      toast.error("Account Number is required");
      return;
    }
    if (!data.IFSC) {
      toast.error("IFSC Code is required");
      return;
    }
    if (!data.Password) {
      toast.error("Withdrawal Password is required");
      return;
    }

    console.log(data);

    // mutation.mutate();
  };

  return (
    <main>
      <header className="header-gradient flex items-center gap-2">
        <ArrowLeft onClick={() => navigate(-1)} />
        <h1 className="text-lg text-white">Bank Details</h1>
      </header>

      <div className="   p-6 space-y-6">
        <h2 className="text-xl border p-2 bg-white rounded-xl shadow-md font-semibold text-muted-foreground flex items-center gap-2">
          <Building2 /> Bank Account Details
        </h2>

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 p-4 border bg-white rounded-lg shadow-lg overflow-hidden">
          <Building2
            size={160}
            style={{
              color: "black",
              opacity: 0.04,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 z-0"
          />

          {/* Form Fields */}
          <div className="space-y-1 mt-3 mr-1  relative z-10">
            <label className="text-sm font-medium text-gray-600">
              Account Holder Name
            </label>
            <Input
              name="Name"
              placeholder="Enter account holder name"
              value={data.Name}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-1 mt-3 relative z-10">
            <label className="text-sm font-medium text-gray-600">
              Account Number <span className="text-red-500">*</span>
            </label>
            <Input
              type="number"
              placeholder="000000000000"
              name="AcNo"
              value={data.AcNo}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-1 mt-3 mr-1 relative z-10">
            <label className="text-sm font-medium text-gray-600">
              IFSC Code <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="ABCD0123456"
              className="uppercase"
              name="IFSC"
              value={data.IFSC}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-1 md:col-span-2 mt-3 relative z-10">
            <label className="text-sm font-medium text-gray-600">
              Bank Name <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="HDFC Bank"
              name="Bank"
              value={data.Bank}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-1 md:col-span-2 mr-1 mt-3 mb-3 relative z-10">
            <label className="text-sm font-medium text-gray-600">
              Branch Name
            </label>
            <Input
              placeholder="XYZ"
              name="Branch"
              value={data.Branch}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-1 md:col-span-2 mt-3 mb-3 relative z-10">
            <label className="text-sm font-medium text-gray-600">
              Withdrawal Password <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="******"
              type="password"
              name="Password"
              value={data.Password}
              onChange={handleInputChange}
            />
          </div>

          <div>
            {data?.file ? (
              <div className="flex items-center justify-center border rounded-xl w-fit py-1 px-2 border-dashed gap-3">
                <span>{data?.file?.name}</span>{" "}
                <X
                  size={15}
                  onClick={() => setData((prev) => ({ ...prev, file: null }))}
                />
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="space-y-1 md:col-span-2 mt-3 mb-3 relative z-10">
            <label className="text-sm font-medium text-gray-600">BEP 20 USDT</label>
            <Input
              name="Address"
              value={data.address}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              htmlFor="qr"
              className="flex items-center py-2 rounded-xl justify-center border-2 gap-1 mt-5 border-primary text-primary font-semibold cursor-pointer hover:bg-primary/10"
            >
              <QrCode size={16} />
              Upload QR
            </label>
            <input
              id="qr"
              type="file"
              className="hidden"
              onChange={(e) =>
                setData((prev) => ({ ...prev, file: e.target.files[0] }))
              }
            />
          </div>

          {bankDetails?.status !== "FAILURE" && (
            <div className="mt-5 bg-red-500 flex relative z-10">
              <Button
                disabled={
                  mutation.isLoading || !data.Bank || !data.AcNo || !data.IFSC
                }
                onClick={handleSubmit}
              >
                {mutation.isPending ? "Saving..." : "Save Details"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Bank;
