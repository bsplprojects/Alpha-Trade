import * as XLSX from "xlsx";

export const handleExportToExcel = (filteredMembers) => {
  if (!filteredMembers?.length) return;

  const formattedData = filteredMembers.map((item, index) => ({
    Sr: index + 1,
    "Member ID": item?.MID,
    "Member Name": item?.Name,
    Account: item?.AdminCharge,
    Deduction: item?.Tax,
    Net: item?.Payable,
    "Hash ID": item?.HashID,
    Date: item?.SendDate?.split("T")[0],
    Status: item?.Status,
  }));

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Ledger");

  XLSX.writeFile(workbook, "ledger-report.xlsx");
};
