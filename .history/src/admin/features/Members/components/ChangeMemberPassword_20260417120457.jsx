import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
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
import { Loader, Loader2, Pencil } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const ChangeMemberPassword = () => {
  const { allMembersInAdmin, updateMemberPassword } = useMember();
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [passwordToChange, setPasswordToChange] = useState({
    memberId: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const breadcrumbs = [
    {
      label: "Member Details",
      link: "/admin/member-details",
    },
    {
      label: "Change Password",
      link: "/admin/change-password",
    },
  ];

  const handleSubmit = () => {
    if (!passwordToChange.newPassword) {
      toast.error("Please enter new password");
      return;
    }

    if (!passwordToChange.confirmPassword) {
      toast.error("Please enter confirm password");
      return;
    }

    if (passwordToChange.newPassword !== passwordToChange.confirmPassword) {
      toast.error("Password does not match");
      return;
    } else {
      updateMemberPassword.mutate(passwordToChange);
    }
  };

  useEffect(() => {
    if (updateMemberPassword.isSuccess) {
      toast.success("Password changed successfully");
      setPasswordToChange({
        memberId: "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setOpen(false);
    }
  }, [updateMemberPassword.isSuccess]);

  return (
    <div className="p-1">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="my-8 flex lg:items-end lg:flex-row flex-col gap-2">
        <div className="">
          <Label>Member Id</Label>
          <Input
            placeholder="Enter member id"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          className="bg-orange-500"
          onClick={() => allMembersInAdmin.mutate(searchQuery)}
        >
          Search
        </Button>
        <Button
          className="bg-orange-500"
          onClick={() => allMembersInAdmin.mutate(searchQuery)}
        >
          All Members
        </Button>
      </div>

      {allMembersInAdmin.isPending ? (
        <div className="w-full flex justify-center my-2">
          <Loader2 className="animate-spin" size={30} />
        </div>
      ) : (
        allMembersInAdmin.isSuccess && (
          <Table className="border">
            <TableCaption>A list of all members.</TableCaption>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead className="w-[100px]">Sr</TableHead>
                <TableHead>Member Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Password</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allMembersInAdmin.data?.data?.map((mem, index) => (
                <TableRow key={mem.Id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{mem?.User_Name}</TableCell>
                  <TableCell>{mem?.Name}</TableCell>
                  <TableCell>{mem?.Password}</TableCell>
                  <TableCell>{mem?.User_Type}</TableCell>
                  <TableCell className="text-right">
                    <Dialog open={open} onOpenChange={setOpen}>
                      <div>
                        <DialogTrigger asChild>
                          <Button
                            className="bg-orange-500"
                            title="Change Password"
                            onClick={() =>
                              setPasswordToChange({
                                memberId: mem?.User_Name,
                                oldPassword: mem?.Password,
                              })
                            }
                            size="sm"
                          >
                            <Pencil />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Change Password</DialogTitle>
                            <DialogDescription>
                              Enter your new password
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4">
                            <div className="grid gap-3">
                              <Label htmlFor="name-1">Old Password</Label>
                              <Input
                                id="name-1"
                                type="text"
                                disabled
                                value={passwordToChange.oldPassword}
                              />
                            </div>
                          </div>
                          <div className="grid gap-4">
                            <div className="grid gap-3">
                              <Label htmlFor="name-1">New Password</Label>
                              <Input
                                id="name-1"
                                type="password"
                                value={passwordToChange.newPassword}
                                onChange={(e) =>
                                  setPasswordToChange({
                                    ...passwordToChange,
                                    newPassword: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div className="grid gap-4">
                            <div className="grid gap-3">
                              <Label htmlFor="name-1">Confirm Password</Label>
                              <Input
                                id="name-1"
                                type="password"
                                value={passwordToChange.confirmPassword}
                                onChange={(e) =>
                                  setPasswordToChange({
                                    ...passwordToChange,
                                    confirmPassword: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline" size="sm">
                                Cancel
                              </Button>
                            </DialogClose>
                            <Button onClick={handleSubmit} size="sm">
                              Update
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </div>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      )}
    </div>
  );
};

export default ChangeMemberPassword;
