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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useEffect, useMemo, useState } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { useSupport } from "./hook";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

const SupportHistory = () => {
  const [status, setStatus] = useState("");
  const [messageReply, setMessageReply] = useState("");
  const [open, setOpen] = useState(false);
  const { mutation, messageReplyMutation } = useSupport();

  const breadcrumbs = [
    {
      label: "Support",
      link: "/admin/support-history",
    },
  ];

  const filtered = useMemo(() => {
    if (!status) return mutation.data?.data;
    return mutation.data?.data?.filter(
      (item) => item.Status?.toLowerCase() === status?.toLowerCase()
    );
  }, [status, mutation.data]);

  useEffect(() => {
    if (messageReplyMutation.isSuccess) {
      toast.success("Message sent successfully");
      setOpen(false);
      setMessageReply("");
      mutation.mutate(status);
    }
  }, [messageReplyMutation.isSuccess]);

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="grid lg:grid-cols-7 gap-2 py-8">
        <div>
          <Label>Status</Label>
          <Select value={status} onValueChange={(e) => setStatus(e)}>
            <SelectTrigger className="">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Success">Success</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button
            onClick={() => {
              setStatus("");
              mutation.mutate(status);
            }}
            disabled={mutation.isPending}
            className="w-full bg-orange-500"
          >
            {mutation.isPending ? "Loading..." : "All Members"}
          </Button>
        </div>
      </div>

      {mutation.data?.status === "SUCCESS" && (
        <Table className="border">
          <TableHeader>
            <TableRow className="text-nowrap bg-muted">
              <TableHead className="w-[100px]">Sr</TableHead>
              <TableHead>Member ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Phone No</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Message Reply</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          {filtered.length === 0 ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={9} className="text-center">
                  No Data Found
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {filtered.map((d, index) => (
                <TableRow key={index} className="text-nowrap">
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{d.MID}</TableCell>
                  <TableCell>{d.Name}</TableCell>
                  <TableCell>{d.Mobile}</TableCell>
                  <TableCell>{d.reqDate}</TableCell>
                  <TableCell>{d.Status}</TableCell>
                  <TableCell>{d.rType || "-"}</TableCell>
                  <TableCell>{d.Message || "-"}</TableCell>
                  <TableCell>{d.MessageReplay || "-"}</TableCell>
                  <TableCell className="text-right">
                    <Dialog open={open} onOpenChange={setOpen}>
                      <div>
                        <DialogTrigger asChild>
                          <Button variant="default" size="icon">
                            <Pencil />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Message Reply</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4">
                            <div className="grid gap-3">
                              <textarea
                                placeholder="Enter a reply message"
                                rows={8}
                                id="message"
                                value={messageReply}
                                onChange={(e) =>
                                  setMessageReply(e.target.value)
                                }
                                className="bg-transparent border rounded outline-none border-gold text-sm p-3"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline" size="sm" classNamebg-orange-500>
                                Cancel
                              </Button>
                            </DialogClose>
                            <Button
                              onClick={() => {
                                if (!messageReply) {
                                  toast.error("Please enter message");
                                  return;
                                }
                                messageReplyMutation.mutate(messageReply);
                              }}
                              type="submit"
                              size="sm"
                            >
                              {messageReplyMutation.isLoading
                                ? "Sending..."
                                : "Send"}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </div>
                    </Dialog>
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

export default SupportHistory;
