import Breadcrumbs from "../../../../components/Breadcrumbs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMember } from "../../../../hooks/useMember";
import { useEffect, useState } from "react";
import { http } from "../../../../utils/http";
import { toast } from "sonner";

const ProfileChangePassword = () => {
  const memberId = sessionStorage.getItem("memberId");
  const [oldPass, setOldPass] = useState("");
  const [passToChange, setPassToChange] = useState({
    memberId: memberId,
    confirmPass: "",
    newPass: "",
  });
  const { data, updateAdminPassword } = useMember(memberId);

  const fetchPass = async () => {
    const response = await http.get(
      `/GetMemberPinList/?search=${data?.ConsumerID}`,
    );
    setOldPass(response.data?.data?.[0]?.Password);
  };

  useEffect(() => {
    fetchPass();
  }, [data, updateAdminPassword.isSuccess]);

  const breadcrumbs = [
    {
      label: "Profile",
      link: "/admin/profile",
    },
    {
      label: "Change Password",
      link: "/admin/profile",
    },
  ];

  const handleSubmit = () => {
    if (!passToChange.newPass) {
      toast.error("Please enter new password");
      return;
    }
    if (!passToChange.confirmPass) {
      toast.error("Please enter confirm password");
      return;
    }
    if (passToChange.newPass !== passToChange.confirmPass) {
      toast.error("Password does not match");
      return;
    } else {
      updateAdminPassword.mutate(passToChange);
    }
  };

  useEffect(() => {
    if (updateAdminPassword.isSuccess) {
      toast.success("Password changed successfully");
      setPassToChange({
        memberId: "",
        newPass: "",
        confirmPass: "",
      });
    }
  }, [updateAdminPassword.isSuccess]);

  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="p-5 my-8 border grid lg:grid-cols-2 gap-2">
        <div>
          <Label>Admin Name</Label>
          <Input disabled value={data?.ConsumerID} />
        </div>
        <div>
          <Label>Old Password</Label>
          <Input disabled value={oldPass} type="password" />
        </div>
        <div>
          <Label>New Password</Label>
          <Input
            type="password"
            value={passToChange.newPass}
            onChange={(e) =>
              setPassToChange({ ...passToChange, newPass: e.target.value })
            }
          />
        </div>
        <div>
          <Label>Confirm Password</Label>
          <Input
            type="password"
            value={passToChange.confirmPass}
            onChange={(e) =>
              setPassToChange({ ...passToChange, confirmPass: e.target.value })
            }
          />
        </div>
        <Button onClick={handleSubmit} className="w-1/4 my-2 bg-orange-500">
          {updateAdminPassword.isPending ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default ProfileChangePassword;
