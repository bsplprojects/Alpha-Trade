import React, { useState } from "react";
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
import { Loader2 } from "lucide-react";

const FixedDeposit = () => {
  const [amount, setAmount] = useState();
  const client = useQueryClient();
  const memberId = sessionStorage.getItem("memberId");

  const { data } = useQuery({
    queryKey: ["fund-wallet"],
    queryFn: async () => {
      const res = await http.post("/MyFundWallet", {
        MID: memberId,
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
    mutationFn: async () => {
      const res = await http.post(
        `/FixedDepositInsert/?MID=${memberId}&Amount=${amount}`,
      );
      return res.data;
    },

    onSuccess: (data) => {
      if (data?.status === "SUCCESS") {
        toast.success(data?.message);
        client.invalidateQueries({ queryKey: ["fixed-deposit"] });
        client.invalidateQueries({ queryKey: ["fund-wallet"] });
        setAmount("");
      }
    },
  });

  const handleSubmit = () => {
    if (+amount > +data?.data?.[0]?.TotalMemberDeactive) {
      toast.error("Insufficient Balance");
      return;
    }
    mutation.mutate();
  };

  if (!data)
    return (
      <Loader2 className="animate-spin h-screen w-full grid place-items-center" />
    );

  return (
    <main>
      <PageHeader title="Fixed Deposit" />

      <section className="mx-4 my-8 flex flex-col gap-4">
        <div className="w-full max-w-full rounded-2xl p-5 bg-gradient-to-r from-orange-500 to-red-600 text-black shadow-xl">
          {/* Top Label */}
          <p className="text-sm font-medium opacity-80">Available Amount</p>

          {/* Amount */}
          <h1 className="text-3xl font-bold mt-2">
            $ {data?.data?.[0]?.TotalMemberDeactive}
          </h1>
        </div>

        <div>
          <label>Amount</label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <Button onClick={handleSubmit}>
          {mutation.isPending ? "Saving..." : "Save"}
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
