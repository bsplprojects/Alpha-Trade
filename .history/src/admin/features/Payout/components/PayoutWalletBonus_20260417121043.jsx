import Breadcrumbs from "../../../../components/Breadcrumbs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMember } from "@/hooks/useMember";

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

import { useMemo, useState } from "react";
import { usePayout } from "../hook";

const PayoutWalletBonus = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const { walletBonusMutation } = usePayout();

  const breadcrumbs = [
    {
      label: "Payout",
      link: "/admin/payout",
    },
    {
      label: "E-Wallet Compound Bonus",
      link: "/admin/payout/wallet-compound-bonus",
    },
  ];

  const totalAmount = useMemo(() => {
    return walletBonusMutation.data?.data?.data?.reduce(
      (total, d) => total + parseFloat(d.amount),
      0
    );
  }, [walletBonusMutation.data?.data]);

  const filteredMembers = useMemo(() => {
    const members = walletBonusMutation.data?.data?.data || [];

    return members.filter((member) => {
      const joiningDate = new Date(member?.pDate);

      const fromMatch = fromDate ? joiningDate >= new Date(fromDate) : true;

      const toMatch = toDate ? joiningDate <= new Date(toDate) : true;

      return fromMatch && toMatch;
    });
  }, [walletBonusMutation.data?.data, fromDate, toDate]);

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="grid lg:grid-cols-7 gap-2 py-8 mt-5">
        <div>
          <Label>Member Id</Label>
          <Input
            placeholder="Enter Member Id"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div>
          <Label>From</Label>
          <Input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div>
          <Label>To</Label>
          <Input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <div className="flex items-end">
          <Button
            onClick={() => walletBonusMutation.mutate(searchQuery)}
            className="w-full bg-orange-500"
          >
            Search
          </Button>
        </div>
        <div className="flex items-end">
          <Button
            onClick={() => walletBonusMutation.mutate(searchQuery)}
            className="w-full"
          >
            {walletBonusMutation.isPending ? "Loading..." : "All Members"}
          </Button>
        </div>
        {totalAmount > 0 && (
          <div className="flex flex-col mt-2 gap-1">
            <Label>Total Amount</Label>
            <p className="border py-1.5 rounded-md px-3 bg-muted">
              ${totalAmount}
            </p>
          </div>
        )}
      </div>

      {walletBonusMutation.data?.data?.status === "SUCCESS" && (
        <Table className="border">
          <TableHeader>
            <TableRow className="text-nowrap bg-muted">
              <TableHead className="w-[100px]">Sr</TableHead>
              <TableHead>Member ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>From MID</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Payout Date</TableHead>
            </TableRow>
          </TableHeader>
          {filteredMembers?.length === 0 ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No Data Found
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {filteredMembers?.map((d, index) => (
                <TableRow key={d.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{d.Consumerid}</TableCell>
                  <TableCell>{d.Name}</TableCell>
                  <TableCell>{d.lavelcosumied}</TableCell>
                  <TableCell>{d.Lavel}</TableCell>
                  <TableCell>{d.Levelincome}</TableCell>
                  <TableCell className="text-right">
                    {d.Payoutdate?.split("T")[0]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      )}
    </>
  );
};

export default PayoutWalletBonus;
