import { http } from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Info = ({ label, value }) => (
  <div className="flex items-center gap-3">
    <p className="text-muted-foreground">{label}:</p>
    <p className={`${label === "Amount" && "text-primary font-bold"}`}>
      {value || "-"}
    </p>
  </div>
);

const WithdrawalRecord = () => {
  const navigate = useNavigate();
  const memberId = sessionStorage.getItem("memberId");

  const { data: record, isPending } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await http.get(`/UserBankTransferReport?MID=${memberId}`);
      return res.data;
    },
  });

  console.log(record);

  return (
    <div className="page-content">
      <header className="header-gradient flex items-center gap-2">
        <ArrowLeft onClick={() => navigate(-1)} />
        <h1 className="text-lg text-white">Payout Record</h1>
      </header>

      <p className="px-5 mt-5 text-muted-foreground text-sm">
        Showing <span className="font-medium">{record?.data?.length}</span>{" "}
        records
      </p>

      {isPending ? (
        <div className="w-full flex items-center justify-center mt-5">
          <Loader className="animate-spin" />
        </div>
      ) : (
        <>
          {record?.data?.length > 0 ? (
            <div className="space-y-4 p-3">
              {record?.data?.map((d, index) => (
                <div
                  key={index}
                  className="bg-white border rounded-xl shadow-sm p-4 grid grid-cols-1 gap-2"
                >
                  <Info label="Wallet Address" value={d?.Bank} />
                  <Info label="Mode" value={d?.Mode} />
                  <Info label="Amount" value={`$${d?.Amount}`} />

                  <Info
                    label="Date"
                    value={`${d?.PDate?.split("T")[0]} • ${
                      d?.PDate?.split("T")[1]?.split(".")[0]
                    }`}
                  />

                  <Info label="Mobile" value={d?.PayMobNo} />

                  <div className="flex items-center gap-2">
                    <p className="text-muted-foreground">Status</p>
                    <span
                      className={`inline-flex  px-3 py-1 rounded-full text-xs font-bold
                              ${
                                d?.Status === "Approved"
                                  ? "bg-indigo-100 text-indigo-700"
                                  : d?.Status === "Pending"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-red-100 text-red-700"
                              }`}
                    >
                      {d?.Status}
                    </span>
                  </div>

                  <Info label="Remark" value={d?.Remark} />
                  <div>
                    <
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full flex items-center justify-center mt-5">
              No records found
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WithdrawalRecord;
