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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useMemo, useState } from "react";
import { useWithdrawl } from "./hook";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { handleExportToExcel } from "./utils";

const WithdrawlHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const { withdrawlHistoryMutation } = useWithdrawl();

  const breadcrumbs = [
    {
      label: "Withdrawl",
      link: "/admin/withdrawl",
    },
  ];

  const filteredMembers = useMemo(() => {
    const members = withdrawlHistoryMutation.data?.data || [];

    return members.filter((member) => {
      const statusMatch = status
        ? member?.Status?.toLowerCase() === status.toLowerCase()
        : true;

      const dateMatch = date ? member?.SendDate?.split("T")[0] === date : true;

      return statusMatch && dateMatch;
    });
  }, [withdrawlHistoryMutation.data?.data, status, date]);

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="grid lg:grid-cols-7 gap-2 py-8">
        <div>
          <Label>Member Id</Label>
          <Input
            placeholder="Enter Member Id"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div>
          <Label>Status</Label>
          <Select value={status} onValueChange={(e) => setStatus(e)}>
            <SelectTrigger className="">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Date</Label>
          <Select value={date} onValueChange={(e) => setDate(e)}>
            <SelectTrigger className="">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {[
                  ...new Set(
                    withdrawlHistoryMutation?.data?.data
                      ?.map((m) => m?.SendDate?.split("T")[0])
                      .filter(Boolean)
                  ),
                ].map((date) => (
                  <SelectItem key={date} value={date}>
                    {date}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button
            onClick={() => {
              setStatus("");
              setDate("");
              withdrawlHistoryMutation.mutate(searchQuery);
            }}
            disabled={withdrawlHistoryMutation.isPending}
            className="w-full"
            variant={"gold"}
          >
            {withdrawlHistoryMutation.isPending ? "Loading..." : "Search"}
          </Button>
        </div>
        <div className="flex items-end">
          <Button
            onClick={() => handleExportToExcel(filteredMembers)}
            className="w-full"
            variant={"gold"}
          >
            Export to Excel
          </Button>
        </div>
      </div>

      {withdrawlHistoryMutation.data?.status === "SUCCESS" && (
        <Table className="border">
          <TableHeader>
            <TableRow className="text-nowrap bg-muted">
              <TableHead className="w-[100px]">Sr</TableHead>
              <TableHead>Member ID</TableHead>
              <TableHead>Member Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Deduction</TableHead>
              <TableHead>Net</TableHead>
              <TableHead>Hash ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          {filteredMembers?.length === 0 ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={9} className="text-center">
                  No Data Found
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {filteredMembers?.map((d, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{d.MID}</TableCell>
                  <TableCell>{d.Name}</TableCell>
                  <TableCell>{d.AdminCharge}</TableCell>
                  <TableCell>{d.Tax}</TableCell>
                  <TableCell>{d.Payable}</TableCell>
                  <TableCell>{d.HashID || "-"}</TableCell>
                  <TableCell>{d.SendDate?.split("T")[0]}</TableCell>
                  <TableCell className="text-right">{d.Status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      )}
    </>
  );
};

export default WithdrawlHistory;
