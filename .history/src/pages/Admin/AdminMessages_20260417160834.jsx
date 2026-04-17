import React from "react";

const AdminMessages = () => {
    const memberId = sessionStorage.getItem("memberId");

    const { data } = useQuery({
      queryKey: ["messages"],
      queryFn: async () => {
        const res = await http.get(`/GetUserMessages/?MID=${memberId}`);
        return res.data;
      },
    });



  return <div></div>;
};

export default AdminMessages;
