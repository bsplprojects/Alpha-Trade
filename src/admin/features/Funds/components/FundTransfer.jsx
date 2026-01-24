import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { http } from "../../../../utils/http";
import { useMember } from "../../../../hooks/useMember";
import { useFunds } from "../hook";
import { toast } from "sonner";

const FundTransfer = () => {
  const [formdata, setFormData] = useState({
    memberId: "",
    paymentType: "",
    amount: "",
  });
  const breadcrumbs = [
    {
      label: "Funds",
      link: "/admin/funds-history",
    },
    {
      label: "Fund Transfer",
      link: "/admin/funds-history",
    },
  ];

  const { data } = useMember(formdata.memberId);
  const { transferMutation } = useFunds();

  useEffect(() => {
    if (transferMutation.isSuccess) {
      setFormData({ memberId: "", paymentType: "", amount: "" });
      toast.success("Fund Transferred Successfully");
    }
  }, [transferMutation.isSuccess]);

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <div className="py-8 lg:grid grid-cols-2 gap-3">
        <div>
          <Label>Member Id</Label>
          <Input
            placeholder="Enter Member Id"
            value={formdata.memberId}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, memberId: e.target.value }))
            }
          />
        </div>
        <div>
          <Label>Member Name</Label>
          <Input
            placeholder="Member Name"
            disabled
            value={data?.Name}
            onChange={() => {}}
          />
        </div>
        <div>
          <Label>Mobile No.</Label>
          <Input
            placeholder="Mobile No"
            disabled
            value={data?.MobileNo}
            onChange={() => {}}
          />
        </div>
        <div>
          <Label>Amount</Label>
          <Input
            placeholder="Amount"
            value={formdata.amount}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, amount: e.target.value }))
            }
          />
        </div>
        <div>
          <Label>Payment Type</Label>
          <Select
            value={formdata.paymentType}
            onValueChange={(val) =>
              setFormData((prev) => ({ ...prev, paymentType: val }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Payment Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Credit">Credit</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button
        onClick={() => transferMutation.mutate(formdata)}
        variant={"gold"}
      >
        Submit
      </Button>
    </>
  );
};

export default FundTransfer;
