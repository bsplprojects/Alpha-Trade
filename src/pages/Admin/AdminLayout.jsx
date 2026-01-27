import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Circle, Menu, Shield, ShieldCheck } from "lucide-react";
import { useState } from "react";
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
  return (
    <main className="h-full page-content relative">
      <header className="header-gradient flex items-center justify-between">
        <h2>Admin</h2>
        <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>
          <Menu />
        </Button>
      </header>

      {open && (
        <div
          className={`h-full w-1/2 top-0 border absolute z-10 bg-background transform transition-transform duration-500 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <h1 className="p-2 px-3 flex items-center gap-2 font-medium text-lg border-b">
            <ShieldCheck className="w-5 h-5 flex-shrink-0" /> Admin Panel
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
                            ? "bg-primary rounded text-white"
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
                            key={child.label}
                            to={child.link}
                            end
                            className={({ isActive }) =>
                              `block px-3 py-2  text-sm transition-colors ${
                                isActive
                                  ? "text-primary"
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
                    end
                    className={({ isActive }) =>
                      `w-full flex items-center font-medium gap-3  p-2 transition-all duration-300 ${
                        isActive
                          ? "bg-primary text-white rounded"
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
