// import React, { useRef, useState } from "react";
// import PageHeader from "@/components/PageHeader";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { http } from "../utils/http";
// import { toast } from "sonner";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Loader2, QrCode, X } from "lucide-react";
// import useLiveUsdtRate from "@/hooks/useLiveUsdtRate";
// import fdQr from "../../assets/fd-qr.jpeg";

// const FixedDeposit = () => {
//   const fileRef = useRef(null);
//   const [amount, setAmount] = useState();
//   const [usdtInput, setUsdtInput] = useState("");
//   const [transactionId, setTransactionId] = useState("");
//   const [file, setFile] = useState("");
//   const { rate: usdtInrRate } = useLiveUsdtRate();
//   const client = useQueryClient();
//   const memberId = sessionStorage.getItem("memberId");
//   const quickAmounts = [5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000];

//   const { data, isLoading } = useQuery({
//     queryKey: ["fund-wallet"],
//     queryFn: async () => {
//       const res = await http.post("/MyFundWallet", {
//         UserID: memberId,
//       });
//       return res.data;
//     },
//   });

//   const { data: fds } = useQuery({
//     queryKey: ["fixed-deposit"],
//     queryFn: async () => {
//       const res = await http.get(`/FixedDepositReport/?MID=${memberId}`);
//       return res.data;
//     },
//   });

//   const mutation = useMutation({
//     mutationFn: async (formdata) => {
//       const res = await http.post(`/FixedDepositInsert`, formdata);
//       return res.data;
//     },

//     onSuccess: (data) => {
//       if (data?.status === "SUCCESS") {
//         toast.success(data?.message);
//         client.invalidateQueries({ queryKey: ["fixed-deposit"] });
//         client.invalidateQueries({ queryKey: ["fund-wallet"] });
//         setAmount("");
//       }
//       setFile("");
//       setTransactionId("");
//       fileRef.current.value = null;
//       setUsdtInput("");
//       setAmount("");
//     },
//   });

//   const handleSubmit = () => {
//     // if (+amount > +data?.data?.Balance) {
//     //   toast.error("Insufficient Balance");
//     //   return;
//     // }
//     const formData = new FormData();
//     if (file) {
//       formData.append("file", file.file);
//     }
//     formData.append("MID", memberId);
//     formData.append("Amount", usdtInput);
//     formData.append("HashID", transactionId);

//     mutation.mutate(formData);
//   };

//   const totalAmount = fds?.data
//     ?.filter((d) => d?.Status === "Success")
//     ?.reduce((total, d) => total + parseFloat(d?.amount), 0);

//   if (isLoading)
//     return (
//       <div className="h-full w-full flex items-center justify-center">
//         <Loader2 className="animate-spin" />
//       </div>
//     );

//   return (
//     <main>
//       <PageHeader title="Fixed Deposit" />

//       <section className="mx-4 my-8 flex flex-col gap-4">
//         <div className="w-full max-w-full rounded-2xl p-5 bg-gradient-to-r from-orange-500 to-red-600 text-black shadow-xl">
//           {/* Top Label */}
//           <p className="text-sm font-medium opacity-80">Fixed Deposit Amount</p>

//           {/* Amount */}
//           <h1 className="text-3xl font-bold mt-2">$ {totalAmount}</h1>
//           {/* <h1 className="text-3xl font-bold mt-2">$ 0</h1> */}
//         </div>

//         <img src={fdQr} alt="fd-qr" className="w-full" />

//         <div>
//           <label>Amount</label>
//           <Input
//             type="number"
//             value={usdtInput}
//             onChange={(e) => {
//               const val = e.target.value;
//               setUsdtInput(val);

//               const usdt = parseFloat(val);
//               if (!isNaN(usdt)) {
//                 setAmount(usdt * usdtInrRate);
//               }
//             }}
//             onBlur={() => {
//               const num = parseFloat(usdtInput) || 0;
//               setUsdtInput(num.toFixed(2));
//             }}
//           />
//         </div>

//         <div>
//           <label>Transaction ID</label>
//           <Input
//             value={transactionId}
//             onChange={(e) => {
//               const val = e.target.value;
//               setTransactionId(val);
//             }}
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="text-sm text-blue-900 font-medium">
//             Upload QR Code
//           </label>

//           {/* Hidden Input */}
//           <input
//             ref={fileRef}
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={(e) => {
//               const file = e.target.files?.[0];
//               if (file) {
//                 setFile((prev) => ({ ...prev, file }));
//               }
//             }}
//           />

//           {/* Button */}
//           <Button
//             onClick={() => fileRef.current?.click()}
//             className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border-2 text-blue-900 font-medium bg-white/10 hover:bg-white/50 transition"
//           >
//             <QrCode size={18} />
//             Choose Image
//           </Button>

//           {/* Preview */}
//           {file.file && (
//             <div className="flex items-center justify-between bg-white/40 rounded-xl px-3 py-2 mt-2">
//               <span className="text-sm truncate">{file.file.name}</span>

//               <X
//                 size={16}
//                 className="cursor-pointer"
//                 onClick={() => setFile((prev) => ({ ...prev, file: null }))}
//               />
//             </div>
//           )}
//         </div>

//         <div className="mt-6">
//           <p className="text-center text-primary text-sm mb-4 font-medium">
//             Quick Selection (INR)
//           </p>

//           <div className="grid grid-cols-4 gap-3">
//             {quickAmounts.map((inrValue) => {
//               const isSelected = Math.round(amount) === inrValue; // Compare with INR amount

//               return (
//                 <button
//                   key={inrValue}
//                   onClick={() => {
//                     setAmount(inrValue);

//                     const usdt = inrValue / usdtInrRate;
//                     setUsdtInput(usdt.toFixed(2));
//                   }}
//                   className={`py-3.5 rounded-2xl border text-sm font-semibold transition-all ${
//                     isSelected
//                       ? "border-primary bg-primary text-white shadow-sm"
//                       : "border-orange-100 hover:border-orange-300 bg-white text-orange-800 hover:bg-orange-50"
//                   }`}
//                 >
//                   ₹{inrValue}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//         <Button onClick={handleSubmit}>
//           {mutation.isPending ? "Saving..." : "Submit Deposit"}
//         </Button>
//       </section>

//       <section>
//         <Table>
//           <TableHeader>
//             <TableRow className="bg-white">
//               <TableHead className="w-[100px]">Date</TableHead>
//               <TableHead className="text-center">Amount</TableHead>
//               <TableHead className="text-right">Status</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {fds?.data?.map((fd) => (
//               <TableRow key={fd?.id}>
//                 <TableCell className="font-medium text-nowrap">
//                   {fd?.Date?.split("T")[0]}
//                 </TableCell>
//                 <TableCell className="text-center">${fd?.amount}</TableCell>
//                 <TableCell className="text-right">{fd?.Status}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </section>
//     </main>
//   );
// };

// export default FixedDeposit;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Check, Circle } from "lucide-react";
import Popup from "../components/Popup";
import { Button } from "@/components/ui/button";
import useLiveUsdtRate from "@/hooks/useLiveUsdtRate";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";

const channels = [
  { id: "pay1", name: "Pay1", range: "1000 ~ 100000" },
  { id: "pay2", name: "Pay2", range: "1000 ~ 100000" },
  { id: "pay3", name: "pay3", range: "1000 ~ 50000" },
  { id: "pay4", name: "pay4", range: "1000 ~ 50000" },
  { id: "pay5", name: "Pay5", range: "500000 ~ 1000000" },
  // { id: "usdt", name: "USDT" },
];

const quickAmounts = [
  1000, 2000, 5000, 10000, 50000, 100000, 500000, 1000000, 1500000, 2000000,
  2500000, 3000000,
];

const FixedDeposit = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("usdt");
  const [usdtInput, setUsdtInput] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("pay1");
  const { rate: usdtInrRate } = useLiveUsdtRate();
  const [showPopup, setShowPopup] = useState(false);
  const [amount, setAmount] = useState(0);

  // const handleQuickSelect = (value: number) => {
  //   setAmount(value.toString());
  // };
  const handleConfirm = () => {
    const value = Number(usdtInput);

    if ((!value || isNaN(value) || value <= 10) && type === "usdt") {
      toast.error("Amount should be more than 10 USDT");
      return;
    }

    navigate("/confirm-fixed-deposit", {
      state: {
        channel: selectedChannel,
        amount,
        type,
      },
    });
  };

  return (
    <div className="page-content bg-gradient-to-br from-slate-50 via-white to-emerald-50 min-h-screen pb-8 relative">
      {/* Header with Pista Green Gradient */}
      <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-5 flex items-center relative shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <ChevronLeft size={26} />
        </button>
        <span className="flex-1 text-center text-xl font-semibold tracking-tight">
          Fixed Deposit
        </span>
      </header>

      <div className="px-4 pt-6 space-y-6">
        {/* Channels Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-emerald-100 p-6">
          <h3 className="font-semibold text-lg text-emerald-950 mb-4 flex items-center gap-2">
            <span>Payment Channels</span>
          </h3>

          <div className="space-y-2">
            {channels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => setSelectedChannel(channel.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all border ${
                  selectedChannel === channel.id
                    ? "border-emerald-500 bg-emerald-50 shadow-sm"
                    : "border-transparent hover:bg-slate-50"
                }`}
              >
                <div>
                  <div className="font-medium text-emerald-950 text-base">
                    {channel.name}
                  </div>
                  {channel.range && (
                    <div className="text-sm text-emerald-600/80 mt-0.5">
                      Amount range: {channel.range}
                    </div>
                  )}
                </div>

                {selectedChannel === channel.id ? (
                  <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Check size={16} className="text-white" />
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full border-2 border-emerald-200" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full">
          <label className="mb-1!">Transaction Type</label>
          <Select value={type} onValueChange={(val) => setType(val)}>
            <SelectTrigger className="border-emerald-100 bg-emerald-50">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inr">INR</SelectItem>
              <SelectItem value="usdt">USDT</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Amount Section */}
        {type === "inr" ? (
          <>
            <input type="number" />
          </>
        ) : (
          <>
            <div className="bg-white rounded-3xl shadow-sm border border-emerald-100 p-6">
              <h3 className="font-semibold text-lg text-emerald-950 mb-5">
                Enter Amount
              </h3>

              {/* Big Display Input - Shows USDT Value */}
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 flex items-center gap-3">
                <div className="text-3xl font-bold text-emerald-700">$</div>
                <input
                  type="number"
                  step="0.01"
                  onFocus={(e) => e.target.select()}
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
                  placeholder="0.00"
                  className="flex-1 bg-transparent text-4xl font-semibold outline-none text-emerald-950 "
                />
                <div className="text-sm font-medium text-emerald-600">USDT</div>
              </div>

              {/* Quick Selection - INR Buttons */}
              <div className="mt-6">
                <p className="text-center text-emerald-600/70 text-sm mb-4 font-medium">
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
                            ? "border-emerald-600 bg-emerald-600 text-white shadow-sm"
                            : "border-emerald-100 hover:border-emerald-300 bg-white text-emerald-800 hover:bg-emerald-50"
                        }`}
                      >
                        ₹{inrValue}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Confirm Button */}
        <div className="px-1 pt-4">
          <Button
            onClick={handleConfirm}
            // disabled={!amount || !selectedChannel}
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-2xl shadow-lg shadow-emerald-500/30 transition-all disabled:opacity-60"
          >
            Confirm Deposit
          </Button>

          <p className="text-center text-xs text-emerald-600/60 mt-4">
            Secure & Instant Processing
          </p>
        </div>
      </div>
    </div>
  );
};

export default FixedDeposit;
