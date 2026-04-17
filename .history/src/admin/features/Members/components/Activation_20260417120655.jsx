import Breadcrumbs from "../../../../components/Breadcrumbs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useMember } from "../../../../hooks/useMember";
import { toast } from "sonner";

export function useDebounce(key, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(key);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(key);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [key, delay]);
  return debouncedValue;
}

const Activation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    memberId: "",
    name: "",
    amount: "",
  });

  const breadcrumbs = [
    {
      label: "Member Details",
      link: "/admin/member-details",
    },
    {
      label: "Activation",
      link: "/admin/member-details/activation",
    },
  ];

  const debouncedSearch = useDebounce(searchQuery);
  const { data, memberActivation } = useMember(debouncedSearch);

  useEffect(() => {
    if (data) {
      setFormData((prev) => ({
        ...prev,
        name: data?.Name,
        memberId: debouncedSearch,
      }));
    } else {
      setFormData((prev) => ({ ...prev, name: "" }));
    }
  }, [data, searchQuery, debouncedSearch]);

  const handleSubmit = () => {
    if (!formData.name) {
      toast.success("Name is required");
      return;
    }
    if (!formData.amount) {
      toast.success("Amount is required");
      return;
    }
    memberActivation.mutate(formData);
  };

  useEffect(() => {
    if (memberActivation.isSuccess) {
      setFormData({ memberId: "", name: "", amount: "" });
      setSearchQuery("");
    }
  }, [memberActivation.isSuccess]);

  return (
    <div className="p-1">
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <div className="grid lg:grid-cols-4 mt-8 gap-4">
        <div className="">
          <Label>Member Id</Label>
          <Input
            placeholder="Enter member id"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="">
          <Label>Name</Label>
          <Input disabled value={formData?.name} onChange={() => {}} />
        </div>
        <div className="">
          <Label>Amount</Label>
          <Input
            placeholder="Enter amount"
            type={"number"}
            value={formData?.amount}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, amount: e.target.value }))
            }
          />
        </div>
      </div>
      <div className=" mt-4">
        <Button className="bg-orange-500" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Activation;
