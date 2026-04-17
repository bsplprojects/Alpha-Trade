import React, { useState } from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const EnterMember = () => {
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const breadcrumbs = [
    {
      label: "Member Details",
      link: "/admin/member-details",
    },
    {
      label: "Enter Member",
      link: "/admin/enter-member",
    },
  ];

  const handleSubmit = () => {
    sessionStorage.setItem("memberId", id);
    const newWindow = window.open("/dashboard", "_blank");
    newWindow.focus();
  };

  return (
    <div className="p-1">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="my-8 flex items-end gap-2">
        <div className="">
          <Label>Member Id</Label>
          <Input
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter member id"
          />
        </div>
        <Button className="bg-orange-500" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default EnterMember;
