import Breadcrumbs from "../../../../components/Breadcrumbs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo, useState } from "react";
import { useFunds } from "../hook";
import { Loader2 } from "lucide-react";
import { IMAGE_BASE_URL } from "../../../../utils/constants";

const RequestHistory = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const breadcrumbs = [
    {
      label: "Funds",
      link: "/admin/funds-history",
    },
    {
      label: "Request History",
      link: "/admin/funds-history/request-history",
    },
  ];

  const { data, isLoading, updateStatus } = useFunds(searchQuery);

  const filtered = useMemo(() => {
    let items = data?.data || [];

    if (status) {
      items = items.filter(
        (item) => item?.Status?.toLowerCase() === status.toLowerCase(),
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();

      items = items.filter((item) => item?.MID?.toLowerCase().includes(query));
    }

    // if (fromDate) {
    //   const from = new Date(fromDate);
    //   items = items.filter((item) => new Date(item?.rDate) >= from);
    // }

    // if (toDate) {
    //   const to = new Date(toDate);
    //   items = items.filter((item) => new Date(item?.rDate) <= to);
    // }

    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      items = items.filter(
        (item) => new Date(item?.rDate) >= from && new Date(item?.rDate) <= to,
      );
    }

    return items;
  }, [status, searchQuery, data, fromDate, toDate]);

  if (isLoading) {
    return (
      <div className="h-screen w-full grid place-items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  const handleStatusChange = async (val, id) => {
    setNewStatus(val);
    await updateStatus.mutate({ val, id });
  };

  const statusColorMap = {
    Pending: "text-yellow-500",
    Success: "text-green-500",
    Cancelled: "text-red-500",
  };

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="py-5 grid lg:grid-cols-7 gap-3 mt-5">
        <div>
          <Label>Member Id</Label>
          <Input
            type="text"
            placeholder="Member Id"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div>
          <Label>Status</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Success">Success</SelectItem>
                <SelectItem value="Cancelled">Rejected</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
      </div>

      {data?.status === "SUCCESS" && (
        <Table className="border bg-background mt-5">
          <TableHeader>
            <TableRow className="text-nowrap bg-muted">
              <TableHead className="w-[100px]">Sr</TableHead>
              <TableHead>MID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Remark</TableHead>
              <TableHead>HKey</TableHead>
              <TableHead>TxnID</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Action</TableHead>
              {/* <TableHead className="text-right">Action</TableHead> */}
            </TableRow>
          </TableHeader>
          {filtered?.length === 0 ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No Data Found
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {filtered?.map((d, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{d.MID}</TableCell>
                  <TableCell>
                    {d.rDate?.split("T")[0]} {d.rDate?.split("T")[1]}
                  </TableCell>
                  <TableCell>{d.Amount > 0 ? `₹${d.Amount}` : `-`}</TableCell>
                  <TableCell className={` ${statusColorMap[d.Status]} `}>
                    {d.Status}
                  </TableCell>
                  <TableCell>{d.Remark || "-"}</TableCell>

                  <TableCell>{d.Refrence || "-"}</TableCell>
                  <TableCell>{d.tNo || "-"}</TableCell>
                  <TableCell>
                    <a
                      href={`${IMAGE_BASE_URL}/${d?.ImageUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={`${IMAGE_BASE_URL}/${d?.ImageUrl}`}
                        alt="img"
                        className="cursor-pointer"
                      />
                    </a>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={newStatus}
                      onValueChange={(val) => handleStatusChange(val, d.ID)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Success">Accept</SelectItem>
                          <SelectItem value="Cancelled">Reject</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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

export default RequestHistory;
