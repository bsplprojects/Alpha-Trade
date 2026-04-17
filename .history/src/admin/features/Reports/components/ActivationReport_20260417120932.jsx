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
import { useAdminReports } from "../hook";

const ActivationReport = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const { activationDetailsMutation } = useAdminReports();

  const breadcrumbs = [
    {
      label: "Reports",
      link: "/admin/reports",
    },
    {
      label: "Recharge Report",
      link: "/admin/reports/activation-report",
    },
  ];

  const totalAmount = useMemo(() => {
    return activationDetailsMutation.data?.data?.reduce(
      (total, d) => total + parseFloat(d.amount),
      0,
    );
  }, [activationDetailsMutation.data?.data]);

  const filteredMembers = useMemo(() => {
    const members = activationDetailsMutation.data?.data || [];

    return members.filter((member) => {
      const joiningDate = new Date(member?.pDate);

      const fromMatch = fromDate ? joiningDate >= new Date(fromDate) : true;

      const toMatch = toDate ? joiningDate <= new Date(toDate) : true;

      return fromMatch && toMatch;
    });
  }, [activationDetailsMutation.data?.data, fromDate, toDate]);

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

            onClick={() => activationDetailsMutation.mutate(searchQuery)}
            className="w-full bg-orange-500"
          >
            Search
          </Button>
        </div>
        <div className="flex items-end">
          <Button
            onClick={() => activationDetailsMutation.mutate(searchQuery)}
            className="w-full bg-orange-500"
          >
            {activationDetailsMutation.isPending ? "Loading..." : "All Members"}
          </Button>
        </div>
        {totalAmount > 0 && (
          <div className="flex flex-col mt-2 gap-1">
            <Label>Total Amount</Label>
            <p className="border py-1.5 rounded-md px-3 bg-background font-semibold">
              ${totalAmount}
            </p>
          </div>
        )}
      </div>

      {activationDetailsMutation.data?.status === "SUCCESS" && (
        <Table className="border mt-2">
          <TableCaption>A list of members activation details.</TableCaption>
          <TableHeader>
            <TableRow className="text-nowrap bg-background">
              <TableHead className="w-[100px]">Sr</TableHead>
              <TableHead>Member ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>TopUp Date</TableHead>
              <TableHead className="text-right">Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers?.map((d, index) => (
              <TableRow key={d.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{d.MID}</TableCell>
                <TableCell>{d.Name}</TableCell>
                <TableCell>{d.amount > 0 ? `$${d.amount}` : "-"}</TableCell>
                <TableCell>
                  {d.pDate?.split("T")[0]}{" "}
                  {d.pDate?.split("T")[1]?.split(".")[0]}
                </TableCell>
                <TableCell className="text-right">{d.pType}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default ActivationReport;
