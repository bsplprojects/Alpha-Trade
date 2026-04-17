import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Popup from "../../../components/Popup";
import { Textarea } from "@/components/ui/textarea";

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
import { Switch } from "@/components/ui/switch";
import { useEffect, useMemo, useState } from "react";
import { useWithdrawl } from "./hook";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { handleExportToExcel } from "./utils";
import { useMutation } from "@tanstack/react-query";
import { http } from "../../../utils/http";
import { toast } from "sonner";

const WithdrawlHistory = () => {
  const memberId = sessionStorage.getItem("memberId");
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [ids, setIDs] = useState([]);

  const [remarkData, setRemarkData] = useState({
    ID: "",
    status: "",
    remarks: "",
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await http.post("/UpdateBankMultipleJson", {
        IDs: ids,
      });
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.status === "SUCCESS") {
        toast.success(data?.message);
      }
    },
  });

  const { withdrawlHistoryMutation, addRemarkMutation } = useWithdrawl();

  useEffect(() => {
    const list = withdrawlHistoryMutation?.data?.data;
    if (!Array.isArray(list)) return;

    const offList = list
      .filter((item) => item.PayMode === "OFF")
      .map((item) => ({
        id: item.ID,
        status: "OFF",
      }));

    setIDs(offList);
  }, [withdrawlHistoryMutation?.data?.data]);

  const breadcrumbs = [
    {
      label: "Withdrawl",
      link: "/admin/withdrawl",
    },
  ];

  const filteredMembers = useMemo(() => {
    let members = withdrawlHistoryMutation.data?.data || [];

    if (memberId === "Admins") {
      members = members.filter((item) => item.PayMode === "ON");
    }

    return members.filter((member) => {
      const statusMatch = status
        ? member?.Status?.toLowerCase() === status.toLowerCase()
        : true;

      const dateMatch = date ? member?.SendDate?.split("T")[0] === date : true;

      return statusMatch && dateMatch;
    });
  }, [withdrawlHistoryMutation.data?.data, status, date]);

  useEffect(() => {
    if (addRemarkMutation.isSuccess) {
      setIsOpen(false);
      setRemarkData({
        ID: "",
        status: "",
        remarks: "",
      });
    }
  }, [addRemarkMutation.isSuccess]);
  console.log(ids);

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="grid lg:grid-cols-7 gap-2 py-8 mt-4">
        {/* <div>
          <Label>Member Id</Label>
          <Input
            placeholder="Enter Member Id"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div> */}

        <div>
          <Label>Status</Label>
          <Select
            value={status}
            onValueChange={(e) => {
              setStatus(e);
            }}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Reject">Rejected</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="All">All</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* <div>
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
        </div> */}

        <div className="flex items-end">
          <Button
            onClick={() => {
              setStatus("");
              setDate("");
              withdrawlHistoryMutation.mutate({
                searchQuery,
                status,
              });
            }}
            disabled={withdrawlHistoryMutation.isPending}
            className="w-full bg-orange-500"
          >
            {withdrawlHistoryMutation.isPending ? "Loading..." : "Search"}
          </Button>
        </div>
        <div className="flex items-end">
          <Button
            onClick={() => handleExportToExcel(filteredMembers)}
            className="w-full"
          >
            Export to Excel
          </Button>
        </div>
      </div>

      {memberId === "Admin" && filteredMembers?.length > 0 && (
        <div className="w-full mt-5">
          <Button
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      )}
      {filteredMembers?.length > 0 && (
        <h1 className=" mt-3 text-muted-foreground">
          Showing{" "}
          <span className="font-semibold">{filteredMembers?.length}</span>{" "}
          orders
        </h1>
      )}

      {withdrawlHistoryMutation.data?.status === "SUCCESS" && (
        <Table className="border mt-5">
          <TableHeader>
            <TableRow className="text-nowrap bg-white ">
              <TableHead className="w-[100px]">Sr</TableHead>
              <TableHead>Invitation ID</TableHead>
              <TableHead>Member Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Account No</TableHead>
              <TableHead>IFSC</TableHead>
              <TableHead>Bank</TableHead>
              <TableHead>Mobile No</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Approved Date</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
              {memberId === "Admin" && (
                <TableHead className="text-right">Hide/Show</TableHead>
              )}
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
                  <TableCell>{d.MID || "-"}</TableCell>
                  <TableCell>{d.Name || "-"}</TableCell>
                  <TableCell>{d.Amount || "-"}</TableCell>
                  <TableCell>{d.ACCNO || "-"}</TableCell>
                  <TableCell>{d.IFSC || "-"}</TableCell>
                  <TableCell>{d.Bank || "-"}</TableCell>
                  <TableCell>{d.PayMobNo || "-"}</TableCell>
                  <TableCell>{d.PDate?.split("T")[0] || "-"}</TableCell>
                  <TableCell>{d.ApprovedDate?.split("T")[0] || "-"}</TableCell>
                  <TableCell className="text-right">
                    {d.Status || "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      onClick={() => {
                        setIsOpen(d);
                        setRemarkData((prev) => ({ ...prev, ID: d.ID }));
                      }}
                    >
                      Remark
                    </Button>
                  </TableCell>
                  {memberId === "Admin" && (
                    <TableCell>
                      <Switch
                        size="sm"
                        checked={
                          ids.find((m) => m.id === d.ID)?.status === "OFF"
                        }
                        onCheckedChange={() =>
                          setIDs((prev) => {
                            const exists = prev.find((m) => m.id === d.ID);

                            if (exists) {
                              return prev.map((m) =>
                                m.id === d.ID
                                  ? {
                                      ...m,
                                      status: m.status === "ON" ? "OFF" : "ON",
                                    }
                                  : m,
                              );
                            }

                            return [...prev, { id: d.ID, status: "ON" }];
                          })
                        }
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      )}

      <Popup isOpen={isOpen} onClose={() => setIsOpen(false)} title="Remark">
        <main className="w-[300px]">
          <div className="mt-5">
            <Label>Status</Label>
            <Select
              value={remarkData.status}
              onValueChange={(e) => setRemarkData({ ...remarkData, status: e })}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Approved">Approve</SelectItem>
                  <SelectItem value="Reject">Reject</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-5">
            <Label>Remark</Label>
            <Textarea
              value={remarkData.remarks}
              onChange={(e) =>
                setRemarkData({ ...remarkData, remarks: e.target.value })
              }
            />
          </div>
          <div className="mt-5 w-full flex">
            <Button
              onClick={() => addRemarkMutation.mutate(remarkData)}
              className=" ml-auto"
            >
              Submit
            </Button>
          </div>
        </main>
      </Popup>
    </>
  );
};

export default WithdrawlHistory;
