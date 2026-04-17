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

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useEffect, useMemo, useState } from "react";
import { useAdminReports } from "../hook";

const LedgerReport = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEM_PER_PAGE = 10;

  const { ledgerDetailsMutation } = useAdminReports();

  const breadcrumbs = [
    {
      label: "Reports",
      link: "/admin/reports",
    },
    {
      label: "Ledger Report",
      link: "/admin/reports/ledger-report",
    },
  ];

  const totalAmount = useMemo(() => {
    return ledgerDetailsMutation.data?.data?.reduce(
      (total, d) => total + parseFloat(d.amount),
      0,
    );
  }, [ledgerDetailsMutation.data?.data]);

  const filteredMembers = useMemo(() => {
    const members = ledgerDetailsMutation.data?.data || [];

    return members.filter((member) => {
      const joiningDate = new Date(member?.pDate);

      const fromMatch = fromDate ? joiningDate >= new Date(fromDate) : true;

      const toMatch = toDate ? joiningDate <= new Date(toDate) : true;

      return fromMatch && toMatch;
    });
  }, [ledgerDetailsMutation.data?.data, fromDate, toDate]);

  const paginatedMembers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEM_PER_PAGE;
    const endIndex = startIndex + ITEM_PER_PAGE;
    return filteredMembers.slice(startIndex, endIndex);
  }, [filteredMembers, currentPage]);

  const totalPages = Math.ceil(filteredMembers.length / ITEM_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [fromDate, toDate]);

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
            onClick={() => ledgerDetailsMutation.mutate(searchQuery)}
            className="w-full"
          >
            Search
          </Button>
        </div>
        <div className="flex items-end">
          <Button
            className="bg-orange-500 w-full"
            onClick={() => {
              setSearchQuery("");
              ledgerDetailsMutation.mutate(searchQuery);
            }}
          >
            {ledgerDetailsMutation.isPending ? "Loading..." : "All Members"}
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

      {ledgerDetailsMutation.data?.status === "SUCCESS" && (
        <Table className="border">
          <TableHeader>
            <TableRow className="text-nowrap bg-muted">
              <TableHead className="w-[100px]">Sr</TableHead>
              <TableHead>Member ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Remarks</TableHead>
              <TableHead>Cr./Dr.</TableHead>
              <TableHead>Current Rate</TableHead>
              <TableHead>TRX</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead className="text-right">Transfer ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedMembers?.map((d, index) => (
              <TableRow key={d.ID} className="text-nowrap">
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{d.MID}</TableCell>
                <TableCell>{d.Name}</TableCell>
                <TableCell>
                  {d.pDate?.split("T")[0]}{" "}
                  {d.pDate?.split("T")[1]?.split(".")[0]}
                </TableCell>
                <TableCell>{d.Amount > 0 ? `$${d.Amount}` : "-"}</TableCell>
                <TableCell>{d.type}</TableCell>
                <TableCell>{d.Remarks}</TableCell>
                <TableCell
                  className={`${
                    d.tType === "Dr." ? "text-indigo-500" : "text-rose-500"
                  }`}
                >
                  {d.tType}
                </TableCell>
                <TableCell>{d.cRate || "-"}</TableCell>
                <TableCell>{d.TRX || "-"}</TableCell>
                <TableCell>{d.bal || "-"}</TableCell>
                <TableCell className="text-right">{d.transID || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {paginatedMembers?.length > 0 && (
        <Pagination className="mt-5 ">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50 cursor-pointer"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <PaginationItem
                  key={page}
                  className="cursor-pointer hidden lg:block"
                >
                  <PaginationLink
                    isActive={page === currentPage}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50 cursor-pointer"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default LedgerReport;
