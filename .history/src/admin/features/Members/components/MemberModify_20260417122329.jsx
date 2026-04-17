import Breadcrumbs from "../../../../components/Breadcrumbs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { http } from "@/utils/http";
import { useMember } from "@/hooks/useMember";
import { useAdminReports } from "../../Reports/hook";

const MemberModify = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({});
  const { updateMutation } = useMember();

  const breadcrumbs = [
    {
      label: "Member Details",
      link: "/admin/member-details",
    },
    {
      label: "Modify",
      link: "/admin/member-details",
    },
  ];

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await http.post("/MemberInfoData", {
        UserID: searchQuery,
      });
      return response.data;
    },
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      setFormData(mutation.data?.data);
    }
  }, [mutation.isSuccess]);

  useEffect(() => {
    if (updateMutation.isSuccess) {
      setFormData({});
    }
  }, [updateMutation.isSuccess, updateMutation.data, formData]);

  return (
    <div className="p-1 ">
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <div className="my-8">
        <Label>Consumer Id</Label>

        <div className="flex items-center gap-2 lg:w-1/3">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter Consumer Id"
          />
          <Button className="bg-orange-500" onClick={() => mutation.mutate()}>
            {mutation.isPending ? "Searching..." : "Search"}
          </Button>
        </div>

        {mutation.isSuccess && (
          <div className="grid lg:grid-cols-4 gap-2 my-5">
            <div>
              <Label>Consumer ID</Label>
              <Input value={formData?.ConsumerID} disabled />
            </div>
            <div>
              <Label>Joining Date</Label>
              <Input
                type="date"
                disabled
                value={formData?.JoiningDate?.split("T")[0]}
              />
            </div>
            <div>
              <Label>Name</Label>
              <Input
                value={formData?.Name}
                onChange={(e) =>
                  setFormData({ ...formData, Name: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Status</Label>
              <Select
                value={formData?.mStatus}
                onValueChange={(e) => setFormData({ ...formData, mStatus: e })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Withdrawl Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Deactive">Deactive</SelectItem>
                    <SelectItem value="Block">Block</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={formData?.MobileNo}
                onChange={(e) =>
                  setFormData({ ...formData, MobileNo: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Email ID</Label>
              <Input
                value={formData?.PhoneNo}
                onChange={(e) =>
                  setFormData({ ...formData, PhoneNo: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Sponsor ID</Label>
              <Input value={formData?.ReferralId} disabled />
            </div>
            <div>
              <Label>Sponsor Name</Label>
              <Input value={formData?.ReferralName} disabled />
            </div>
            <div>
              <Label>Amount</Label>
              <Input value={formData?.Price} disabled />
            </div>
            <div>
              <Label>Wallet Address(USDT only BEP20)</Label>
              <Input
                value={formData?.Password}
                onChange={(e) =>
                  setFormData({ ...formData, Password: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Withdrawl</Label>
              <Select
                value={formData?.Nominee}
                onValueChange={(e) => setFormData({ ...formData, Nominee: e })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Withdrawl Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="on">On</SelectItem>
                    <SelectItem value="off">Off</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Trade</Label>
              <Select
                value={formData?.Fname}
                onValueChange={(e) => setFormData({ ...formData, Fname: e })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Trade Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="on">On</SelectItem>
                    <SelectItem value="off">Off</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {/* <div>
              <Label>P2P</Label>
              <Select
                value={formData?.Nominee_Relation}
                onValueChange={(e) =>
                  setFormData({ ...formData, Nominee_Relation: e })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select P2P Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="on">On</SelectItem>
                    <SelectItem value="off">Off</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div> */}
            <div>
              <Button
                className={"lg:w-1/2 w-full my-3 bg-green-500"}
                onClick={() => updateMutation.mutate(formData)}
              >
                {updateMutation.isPending ? "Updating..." : "Update"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberModify;
