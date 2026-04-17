import React, { useEffect, useState } from "react";
import { useAdminSettings } from "../hook";
import { Settings } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const AdminSettings = () => {
  const { controlPanelList, saveSettings } = useAdminSettings();
  const [list, setList] = useState([]);

  useEffect(() => {
    if (controlPanelList?.data && list.length === 0) {
      setList(controlPanelList.data);
    }
  }, [controlPanelList?.data]);

  const toggleStatus = (id, checked) => {
    setList((prev) =>
      prev.map((item) =>
        item.ID === id ? { ...item, Status: checked ? "ON" : "OFF" } : item,
      ),
    );
    saveSettings.mutate({ ID: id, Status: checked ? "ON" : "OFF" });
  };

  return (
    <main className="p-2">
      <div className="text-muted-foreground flex  items-center gap-2">
        <Settings size={20} /> Settings
      </div>

      <div className="mt-5 px-3 border bg-white rounded-xl p-3">
        <p className="w-full flex justify-end text-xs text-muted-foreground">
          Hide visibilty
        </p>
        {list?.map((item) => {
          return (
            <div
              key={item.ID}
              className="flex items-start justify-between mt-4"
            >
              <h2>{item.Section}</h2>

              <Switch
                checked={item.Status === "ON"}
                className="bg-orange-500"
                onCheckedChange={(checked) => toggleStatus(item.ID, checked)}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default AdminSettings;
