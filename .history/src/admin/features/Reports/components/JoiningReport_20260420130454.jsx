import Breadcrumbs from "../../../../components/Breadcrumbs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMember } from "@/hooks/useMember";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Trash } from "lucide-react";
const JoiningReport = () => {
  const { reportMembers } = useAdminReports();
  const [value, setValue] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const breadcrumbs = [
    {
      label: "Reports",
      link: "/admin/reports",
    },
    {
      label: "Joining Report",
      link: "/admin/reports",
    },
  ];

  const totalAmount = useMemo(() => {
    return reportMembers.data?.data?.reduce(
      (total, member) => total + parseFloat(member.Price),
      0,
    );
  }, [reportMembers.data?.data]);

  const filteredMembers = useMemo(() => {
    const members = reportMembers.data?.data || [];

    return members.filter((member) => {
      const joiningDate = new Date(member?.JoiningDate);

      const statusMatch = value ? member?.mStatus === value : true;

      const fromMatch = fromDate ? joiningDate >= new Date(fromDate) : true;

      const toMatch = toDate ? joiningDate <= new Date(toDate) : true;

      return statusMatch && fromMatch && toMatch;
    });
  }, [reportMembers.data?.data, value, fromDate, toDate]);

  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      {/* menus & search inputs */}
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
          <Label>Status</Label>
          <Select value={value} onValueChange={(val) => setValue(val)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Deactive">Deactive</SelectItem>
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
        <div className="flex items-end">
          <Button
            onClick={() => reportMembers.mutate(searchQuery)}
            className="w-full"
          >
            Search
          </Button>
        </div>
        <div className="flex items-end">
          <Button
            onClick={() => {
              reportMembers.mutate(searchQuery);
            }}
            className="w-full"
          >
            {reportMembers.isPending ? "Loading..." : "All Members"}
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

      {reportMembers.data?.status === "SUCCESS" && (
        <Table className="border">
          <TableCaption>A list of members.</TableCaption>
          <TableHeader>
            <TableRow className="text-nowrap bg-muted">
              <TableHead className="w-[100px]">Sr</TableHead>
              <TableHead>Member ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Sponsor ID</TableHead>
              <TableHead>Sponsor Name</TableHead>
              <TableHead>Joining Date</TableHead>
              <TableHead>Mobile No</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers?.map((d, index) => (
              <TableRow key={d.ConsumerID}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{d.ConsumerID}</TableCell>
                <TableCell>{d.Name}</TableCell>
                <TableCell>{d.ReferralId}</TableCell>
                <TableCell>{d.ReferralName}</TableCell>
                <TableCell>{d.JoiningDate?.split("T")[0]}</TableCell>
                <TableCell>{d.MobileNo}</TableCell>
                <TableCell>{d.Price}</TableCell>
                <TableCell className="text-right">
                  <Button
                    onClick={() => handleDelete(d.ConsumerID)}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default JoiningReport;
