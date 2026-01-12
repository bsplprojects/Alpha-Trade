import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import Market from "./pages/Market";
import Team from "./pages/Team";
import Assets from "./pages/Assets";
import Profile from "./pages/Profile";
import RechargeRecord from "./pages/RechargeRecord";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="mobile-container bg-muted">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/market" element={<Market />} />
            <Route path="/team" element={<Team />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/recharge-record" element={<RechargeRecord />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
