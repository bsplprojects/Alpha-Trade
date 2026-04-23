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
import { useEffect, useMemo, useState } from "react";
import { useFunds } from "../hook";
import { Loader2 } from "lucide-react";
import { IMAGE_BASE_URL } from "../../../../utils/constants";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { http } from "../../../../utils/http";
import { toast } from "sonner";

const FixedDepositHistory = () => {
  const client = useQueryClient();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState("");
  const [newStatus, setNewStatus] = useState({
    id: "",
    status: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [ids, setIds] = useState([]);
  const memberId = sessionStorage.getItem("memberId");

  const { data, isLoading } = useQuery({
    queryKey: ["fixed-deposit-history"],
    queryFn: async () => {
      const res = await http.get(`/GetFixFundRequest/?search=${searchQuery}`);
      return res.data;
    },
  });

  console.log(data);

  const fdStatusMutation = useMutation({
    mutationFn: async ({ val, id }) => {
      const res = await http.post("/UpdateReTopUpStatus", {
        Status: val,
        Id: id,
      });
      return res.data;
    },
    onSuccess: (data) => {
      client.invalidateQueries({ queryKey: ["fixed-deposit-history"] });
      if (data?.status === "SUCCESS") {
        toast.success(data?.message);
      }
    },
  });

  const breadcrumbs = [
    {
      label: "Funds",
      link: "/admin/funds-history",
    },
    {
      label: "Fixed Deposit History",
      link: "/admin/funds-history/fd-history",
    },
  ];

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

    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      items = items.filter(
        (item) =>
          new Date(item?.toDate) >= from && new Date(item?.toDate) <= to,
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
    setNewStatus({
      id: id,
      status: val,
    });
    await fdStatusMutation.mutate({ val, id });
  };

  const statusColorMap = {
    Pending: "text-yellow-500",
    Success: "text-indigo-500",
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

      {/* {memberId === "Admin" && (
        <div className="w-full mt-5">
          <Button
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      )} */}

      {filtered?.length > 0 && (
        <h1 className=" mt-3 text-muted-foreground">
          Showing <span className="font-semibold">{filtered?.length}</span>{" "}
          orders
        </h1>
      )}

      {data?.status === "SUCCESS" && (
        <Table className="border bg-background mt-5">
          <TableHeader>
            <TableRow className="text-nowrap bg-background">
              <TableHead className="w-[100px]">Sr</TableHead>
              <TableHead>MID</TableHead>
              <TableHead>Hash ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
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
                  <TableCell>{d.HashID}</TableCell>
                  <TableCell className>
                    {d.toDate?.split("T")[0]} {d.rDate?.split("T")[1]}
                  </TableCell>
                  <TableCell>{d.amount > 0 ? `$${d.amount}` : `-`}</TableCell>
                  <TableCell className={` ${statusColorMap[d.Status]} `}>
                    {d.Status}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={
                        newStatus?.id === d.MID ? newStatus?.status : d.Status
                      }
                      onValueChange={(val) => handleStatusChange(val, d.id)}
                    >
                      <SelectTrigger size>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Success">Success</SelectItem>
                          <SelectItem value="Reject">Reject</SelectItem>
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

export default FixedDepositHistory;
