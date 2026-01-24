import Breadcrumbs from "../../../../components/Breadcrumbs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { useFunds } from "../hook";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const TransferHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const breadcrumbs = [
    {
      label: "Funds",
      link: "/admin/funds-history",
    },
    {
      label: "Transfer History",
      link: "/admin/funds-history/transfer-history",
    },
  ];

  const { fundHistoryMutation } = useFunds();

  console.log(fundHistoryMutation.data);

  if (fundHistoryMutation.isPending) {
    <div className="h-screen w-full grid place-items-center">
      <Loader2 className="animate-spin" />
    </div>;
  }

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="py-5 flex lg:flex-row flex-col lg:items-end gap-3">
        <div>
          <Label>Member Id</Label>
          <Input
            placeholder="Enter Member Id"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          onClick={() => fundHistoryMutation.mutate(searchQuery)}
          variant={"gold"}
        >
          Search
        </Button>
        <Button
          disabled={fundHistoryMutation.isPending}
          onClick={() => fundHistoryMutation.mutate(searchQuery)}
          variant={"gold"}
        >
          All Members
        </Button>
      </div>

      {fundHistoryMutation.data?.status === "SUCCESS" && (
        <Table className="border">
          <TableHeader>
            <TableRow className="text-nowrap bg-muted">
              <TableHead className="w-[100px]">Sr</TableHead>
              <TableHead>Member ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Rec. Member ID</TableHead>
              <TableHead>Rec. Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">PStatus</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fundHistoryMutation.data?.data?.map((d, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{d?.MID}</TableCell>
                <TableCell>{d?.Name}</TableCell>
                <TableCell>
                  {d?.PDate?.split("T")[0]} {d?.PDate?.split("T")[1]}
                </TableCell>
                <TableCell>{d?.MIDTo}</TableCell>
                <TableCell>{d?.NameTo}</TableCell>
                <TableCell>{d?.Qty > 0 ? `$${d?.Qty}` : "-"}</TableCell>
                <TableCell className="text-right">
                  {d?.PStatus?.toUpperCase() || "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default TransferHistory;
