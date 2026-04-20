import { useNavigate } from "react-router-dom";
import { ChevronLeft, Loader } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { http } from "@/utils/http";

const RecordCard = ({ record }) => {
  const stateStyles = {
    Pending: "text-foreground font-semibold",
    Success: "text-success font-semibold",
    Failed: "text-destructive font-semibold",
  };

  const formatDate = (date) => {
    const day = date?.split("T")[0];
    const time = date?.split("T")[1]?.split(".")[0];

    return `${day}, ${time}`;
  };

  return (
    <div className="bg-background rounded-xl p-4 space-y-2 animate-fade-in">
      <div className="flex gap-2">
        <span className="text-muted-foreground">Recharge Amount:</span>
        <span className="text-primary font-bold">${record?.Amount || 0}</span>
      </div>
      <div className="flex gap-2">
        <span className="text-muted-foreground">Order No.:</span>
        <span className="font-semibold text-foreground">
          {record?.Refrence || "-"}
        </span>
      </div>
      <div className="flex gap-2">
        <span className="text-muted-foreground">Status:</span>
        <span className={stateStyles[record?.Status]}>{record?.Status}</span>
      </div>
      <div className="flex gap-2">
        <span className="text-muted-foreground">Time:</span>
        <span className="text-muted-foreground">
          {formatDate(record?.rDate)}
        </span>
      </div>
      {/* <div className="flex gap-2">
        <span className="text-muted-foreground">Expire Time:</span>
        <span className="text-muted-foreground">{expireTime}</span>
      </div> */}
      <div className="flex gap-2">
        <span className="text-muted-foreground">Transaction ID:</span>
        <span className="text-muted-foreground">{record?.tNo}</span>
      </div>
      <div className="flex gap-2">
        <span className="text-muted-foreground">Paymode:</span>
        <span className="text-muted-foreground">{record?.Method || "-"}</span>
      </div>
    </div>
  );
};

const RechargeRecord = () => {
  const navigate = useNavigate();
  

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (!data || data?.total === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        No records found
      </div>
    );
  }
  return (
    <div className="page-content ">
      {/* Header with back button */}
      <header className="header-gradient flex items-center px-4">
        <ChevronLeft onClick={() => navigate(-1)} />
        <span className="flex-1 text-center">Recharge record</span>
      </header>

      <p className="px-5 mt-5 text-muted-foreground text-sm">
        Showing <span className="font-medium">{data?.total}</span> records
      </p>

      {/* Records List */}
      <div className="p-4 space-y-4">
        {data?.data?.map((record, index) => (
          <RecordCard key={index} record={record} />
        ))}
      </div>
    </div>
  );
};

export default RechargeRecord;
