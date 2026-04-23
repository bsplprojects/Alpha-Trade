import React, { useRef, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { http } from "../utils/http";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, QrCode, X } from "lucide-react";
import useLiveUsdtRate from "@/hooks/useLiveUsdtRate";

const FixedDeposit = () => {
  const fileRef = useRef(null);
  const [amount, setAmount] = useState();
  const [usdtInput, setUsdtInput] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [file, setFile] = useState("");
  const { rate: usdtInrRate } = useLiveUsdtRate();
  const client = useQueryClient();
  const memberId = sessionStorage.getItem("memberId");
  const quickAmounts = [5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000];

  const { data, isLoading } = useQuery({
    queryKey: ["fund-wallet"],
    queryFn: async () => {
      const res = await http.post("/MyFundWallet", {
        UserID: memberId,
      });
      return res.data;
    },
  });

  const { data: fds } = useQuery({
    queryKey: ["fixed-deposit"],
    queryFn: async () => {
      const res = await http.get(`/FixedDepositReport/?MID=${memberId}`);
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (formdata) => {
      const res = await http.post(`/FixedDepositInsert`, formdata);
      return res.data;
    },

    onSuccess: (data) => {
      if (data?.status === "SUCCESS") {
        toast.success(data?.message);
        client.invalidateQueries({ queryKey: ["fixed-deposit"] });
        client.invalidateQueries({ queryKey: ["fund-wallet"] });
        setAmount("");
      }
      setFile("");
      setTransactionId("");
      fileRef.current.value = null;
      setUsdtInput("");
      setAmount("");
    },
  });

  const handleSubmit = () => {
    // if (+amount > +data?.data?.Balance) {
    //   toast.error("Insufficient Balance");
    //   return;
    // }
    const formData = new FormData();
    if (file) {
      formData.append("file", file.file);
    }
    formData.append("MID", memberId);
    formData.append("Amount", usdtInput);
    formData.append("HashID", transactionId);

    mutation.mutate(formData);
  };

  if (isLoading)
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );

  console.log(file);

  return (
    <main>
      <PageHeader title="Fixed Deposit" />

      <section className="mx-4 my-8 flex flex-col gap-4">
        <div className="w-full max-w-full rounded-2xl p-5 bg-gradient-to-r from-orange-500 to-red-600 text-black shadow-xl">
          {/* Top Label */}
          <p className="text-sm font-medium opacity-80">Available Amount</p>

          {/* Amount */}
          {/* <h1 className="text-3xl font-bold mt-2">$ {data?.data?.Balance}</h1> */}
          <h1 className="text-3xl font-bold mt-2">$ 0</h1>
        </div>

        <div>
          <label>Amount</label>
          <Input
            type="number"
            value={usdtInput}
            onChange={(e) => {
              const val = e.target.value;
              setUsdtInput(val);

              const usdt = parseFloat(val);
              if (!isNaN(usdt)) {
                setAmount(usdt * usdtInrRate);
              }
            }}
            onBlur={() => {
              const num = parseFloat(usdtInput) || 0;
              setUsdtInput(num.toFixed(2));
            }}
          />
        </div>

        <div>
          <label>Transaction ID</label>
          <Input
            value={transactionId}
            onChange={(e) => {
              const val = e.target.value;
              setTransactionId(val);
            }}
          />
        </div>

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
                setFile((prev) => ({ ...prev, file }));
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
          {file.file && (
            <div className="flex items-center justify-between bg-white/40 rounded-xl px-3 py-2 mt-2">
              <span className="text-sm truncate">{file.file.name}</span>

              <X
                size={16}
                className="cursor-pointer"
                onClick={() => setFile((prev) => ({ ...prev, file: null }))}
              />
            </div>
          )}
        </div>

        <div className="mt-6">
          <p className="text-center text-primary text-sm mb-4 font-medium">
            Quick Selection (INR)
          </p>

          <div className="grid grid-cols-4 gap-3">
            {quickAmounts.map((inrValue) => {
              const isSelected = Math.round(amount) === inrValue; // Compare with INR amount

              return (
                <button
                  key={inrValue}
                  onClick={() => {
                    setAmount(inrValue);

                    const usdt = inrValue / usdtInrRate;
                    setUsdtInput(usdt.toFixed(2));
                  }}
                  className={`py-3.5 rounded-2xl border text-sm font-semibold transition-all ${
                    isSelected
                      ? "border-primary bg-primary text-white shadow-sm"
                      : "border-orange-100 hover:border-orange-300 bg-white text-orange-800 hover:bg-orange-50"
                  }`}
                >
                  ₹{inrValue}
                </button>
              );
            })}
          </div>
        </div>
        <Button onClick={handleSubmit}>
          {mutation.isPending ? "Saving..." : "Submit Deposit"}
        </Button>
      </section>

      <section>
        <Table>
          <TableHeader>
            <TableRow className="bg-white">
              <TableHead className="w-[100px]">Date</TableHead>
              <TableHead className="text-center">Amount</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fds?.data?.map((fd) => (
              <TableRow key={fd?.id}>
                <TableCell className="font-medium text-nowrap">
                  {fd?.Date?.split("T")[0]}
                </TableCell>
                <TableCell className="text-center">${fd?.amount}</TableCell>
                <TableCell className="text-right">{fd?.Status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  );
};

export default FixedDeposit;
