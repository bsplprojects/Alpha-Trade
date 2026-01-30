import { http } from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Info = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <p className="text-sm font-medium text-gray-800">{value || "-"}</p>
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
        <h1 className="text-lg text-white">Withdrawal Record</h1>
      </header>

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
                  className="bg-white border rounded-xl shadow-sm p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                >
                  <Info label="Account No" value={d?.ACCNO} />
                  <Info label="Account Name" value={d?.ACCName} />
                  <Info label="IFSC Code" value={d?.IFSC} />
                  <Info label="Bank" value={d?.Bank} />
                  <Info label="Mode" value={d?.Mode} />
                  <Info label="Amount" value={`₹ ${d?.Amount}`} />

                  <Info
                    label="Date"
                    value={`${d?.PDate?.split("T")[0]} • ${
                      d?.PDate?.split("T")[1]?.split(".")[0]
                    }`}
                  />

                  <Info label="Mobile" value={d?.PayMobNo} />

                  <div>
                    <p className="text-xs text-gray-500 mb-1">Status</p>
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium
            ${
              d?.Status === "Success"
                ? "bg-green-100 text-green-700"
                : d?.Status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
            }`}
                    >
                      {d?.Status}
                    </span>
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
