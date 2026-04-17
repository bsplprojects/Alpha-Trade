import { useQuery } from "@tanstack/react-query";
import React from "react";
import { http } from "../../utils/http";
import AdminMessageList from "../../components/AdminMessageReply";

const AdminMessages = () => {
  const memberId = sessionStorage.getItem("memberId");

  const { data } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const res = await http.get(`/GetMessageHistory`);
      return res.data;
    },
  });

  console.log(data);

  return <AdminMessageList data={data?.Data} />;
};

export default AdminMessages;
