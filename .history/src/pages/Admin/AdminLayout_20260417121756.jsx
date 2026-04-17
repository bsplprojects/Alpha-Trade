import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Circle, LogOut, Menu, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { adminItems } from "../../utils/constants";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const memberId = sessionStorage.getItem("memberId");
  useEffect(() => {
    if (!memberId || (memberId !== "Admin" && memberId !== "Admins")) {
      navigate("/admin/login");
    }
  }, [navigate]);

  return (
    <main className="h-full page-content relative">
      <header className="py-4 px-4 bg-orange-500 to-red-500 flex items-center justify-between">
        <h2>Admin</h2>
        <div className="flex items-center justify-between gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              sessionStorage.removeItem("memberId");
              navigate("/admin/login");
            }}
          >
            <LogOut />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>
            <Menu />
          </Button>
        </div>
      </header>

      {open && (
        <div
          className={`h-full md:w-1/2 top-0 border absolute z-10 bg-background transform transition-transform duration-500 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <h1 className="p-2 px-3 flex items-center gap-2 font-medium text-lg border-b">
            <ShieldCheck className="w-5 h-5 flex-shrink-0" /> Admin
          </h1>

          <nav className="flex-1 space-y-2">
            <Accordion type="single" collapsible className="p-3">
              {adminItems.map((item) => {
                if (item.children) {
                  const isParentActive = item.children.some(
                    (child) => child.link === location.pathname,
                  );

                  return (
                    <AccordionItem
                      key={item.label}
                      value={item.label.toLowerCase()}
                      className="border-none"
                    >
                      <AccordionTrigger
                        className={`flex items-center gap-3 px-3 py-2 transition-all duration-300 ${
                          isParentActive
                            ? "bg-orange-500 rounded text-white"
                            : "text-muted-foreground hover:bg-primary/10"
                        }`}
                      >
                        <p className="flex items-center gap-2 w-full">
                          <item.icon className="w-5 h-5 flex-shrink-0" />
                          <span className="text-nowrap">{item.label}</span>
                        </p>
                      </AccordionTrigger>

                      <AccordionContent className="pl-5 space-y-1">
                        {item.children.map((child) => (
                          <NavLink
                            onClick={() => setOpen(false)}
                            key={child.label}
                            to={child.link}
                            end
                            className={({ isActive }) =>
                              `block px-3 py-2  text-sm transition-colors ${
                                isActive
                                  ? "text-orange-500"
                                  : "text-muted-foreground hover:bg-primary/10"
                              }`
                            }
                          >
                            <div className="flex items-center gap-1">
                              <Circle size={10} />
                              {child.label}
                            </div>
                          </NavLink>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  );
                }

                return (
                  <NavLink
                    key={item.label}
                    to={item.link}
                    onClick={() => setOpen(false)}
                    end
                    className={({ isActive }) =>
                      `w-full flex items-center font-medium gap-3  p-2 transition-all duration-300 ${
                        isActive
                          ? "bg-orange-500 text-white rounded"
                          : "text-muted-foreground hover:bg-primary/10 border border-transparent"
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </Accordion>
          </nav>
        </div>
      )}

      <div className="p-2">
        <Outlet />
      </div>
    </main>
  );
};

export default AdminLayout;
