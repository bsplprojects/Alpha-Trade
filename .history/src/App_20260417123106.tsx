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
import Recharge from "./pages/Recharge";
import Withdraw from "./pages/Withdraw";
import MarketDetail from "./pages/MarketDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminLayout from "./pages/Admin/AdminLayout";
import MemberDetails from "./admin/features/Members/pages/MemberDetails";
import MemberModify from "./admin/features/Members/components/MemberModify";
import ChangeMemberPassword from "./admin/features/Members/components/ChangeMemberPassword";
import EnterMember from "./admin/features/Members/components/EnterMember";
import Activation from "./admin/features/Members/components/Activation";
import MemberProfile from "./admin/features/Profile/pages/MemberProfile";
import BankDetails from "./admin/features/Profile/components/BankDetails";
import ProfileChangePassword from "./admin/features/Profile/components/ProfileChangePassword";
import Settings from "./admin/features/Profile/components/Settings";
import ControlPanel from "./admin/features/Profile/components/ControlPanel";
import Reports from "./admin/features/Reports/pages/Reports";
import JoiningReport from "./admin/features/Reports/components/JoiningReport";
import ActivationReport from "./admin/features/Reports/components/ActivationReport";
import LedgerReport from "./admin/features/Reports/components/LedgerReport";
import Payout from "./admin/features/Payout/pages/Payout";
import PayoutStakingBonus from "./admin/features/Payout/components/PayoutStakingBonus";
import PayoutSponsorBonus from "./admin/features/Payout/components/PayoutSponsorBonus";
import PayoutWalletBonus from "./admin/features/Payout/components/PayoutWalletBonus";
import PayoutPerformanceBonus from "./admin/features/Payout/components/PayoutPerformanceBonus";
import PayoutRewards from "./admin/features/Payout/components/PayoutRewards";
import WithdrawlHistory from "./admin/features/Withdrawl/WithdrawlHistory";
import SupportHistory from "./admin/features/Support/SupportHistory";
import AdminFundHistory from "./admin/features/Funds/pages/AdminFundHistory";
import TransferHistory from "./admin/features/Funds/components/TransferHistory";
import AddFund from "./admin/features/Funds/components/AddFund";
import Request from "./admin/features/Funds/components/Request";
import RequestHistory from "./admin/features/Funds/components/RequestHistory";
import FundTransfer from "./admin/features/Funds/components/FundTransfer";
import ConfirmRecharge from "./pages/ConfirmRecharge";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminSettings from "./admin/features/Settings/pages/AdminSettings";
import Invitation from "./pages/Invitation";
import MyOrder from "./pages/MyOrder";
import Protected from "./components/Protected";
import WithdrawalRecord from "./pages/WithdrawalRecord";
import Bank from "./pages/Bank";
import Vip from "./pages/Vip";
import TradeIncomeReport from "./pages/TradeIncomeReport";
import LevelIncomeReport from "./pages/LevelIncomeReport";
import ReferalIncomeReport from "./pages/ReferalIncomeReport";
import FixedDeposit from "./pages/FixedDeposit";

import { AppKitProvider } from "@reown/appkit/react";
import { bsc } from "viem/chains";

const queryClient = new QueryClient();

const App = () => (
  <AppKitProvider
    projectId="cc08f00470620073bf1f39de6aa3ea10"
    networks={[bsc]}
    enableInjected
    features={{
      analytics: false,
      email: false,
      socials: false,
    }}
  >
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="mobile-container bg-muted">
            <Routes>
              <Route
                path="/"
                element={
                  <Protected>
                    <Home />
                  </Protected>
                }
              />
              <Route
                path="/market"
                element={
                  <Protected>
                    <Market />
                  </Protected>
                }
              />
              <Route
                path="/confirm"
                element={
                  <Protected>
                    <ConfirmRecharge />
                  </Protected>
                }
              />
              <Route
                path="/team"
                element={
                  <Protected>
                    <Team />
                  </Protected>
                }
              />
              <Route
                path="/assets"
                element={
                  <Protected>
                    <Assets />
                  </Protected>
                }
              />
              <Route
                path="/profile"
                element={
                  <Protected>
                    <Profile />
                  </Protected>
                }
              />
              <Route
                path="/recharge-record"
                element={
                  <Protected>
                    <RechargeRecord />
                  </Protected>
                }
              />
              <Route
                path="/withdrawal-record"
                element={
                  <Protected>
                    <WithdrawalRecord />
                  </Protected>
                }
              />
              <Route
                path="/bank"
                element={
                  <Protected>
                    <Bank />
                  </Protected>
                }
              />
              <Route
                path="/recharge"
                element={
                  <Protected>
                    <Recharge />
                  </Protected>
                }
              />
              <Route
                path="/withdraw"
                element={
                  <Protected>
                    <Withdraw />
                  </Protected>
                }
              />
              <Route
                path="/order"
                element={
                  <Protected>
                    <MyOrder />
                  </Protected>
                }
              />
              <Route
                path="/market/:code"
                element={
                  <Protected>
                    <MarketDetail />
                  </Protected>
                }
              />
              <Route
                path="/vip"
                element={
                  <Protected>
                    <Vip />
                  </Protected>
                }
              />
              <Route
                path="/trade-income-report"
                element={
                  <Protected>
                    <TradeIncomeReport />
                  </Protected>
                }
              />
              <Route
                path="/level-income-report"
                element={
                  <Protected>
                    <LevelIncomeReport />
                  </Protected>
                }
              />
              <Route
                path="/fixed-deposit"
                element={
                  <Protected>
                    <FixedDeposit />
                  </Protected>
                }
              />
              <Route
                path="/referal-income-report"
                element={
                  <Protected>
                    <ReferalIncomeReport />
                  </Protected>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/invite-friends"
                element={
                  <Protected>
                    <Invitation />
                  </Protected>
                }
              />
              <Route path="*" element={<NotFound />} />
              <Route path="/admin/login" element={<AdminLogin />} />

              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />

                {/* MEMBER DETAILS */}
                <Route path="member-details" element={<MemberDetails />}>
                  <Route index element={<MemberModify />} />
                  <Route
                    path="change-password"
                    element={<ChangeMemberPassword />}
                  />
                  <Route path="enter-member" element={<EnterMember />} />
                  <Route path="activation" element={<Activation />} />
                </Route>

                {/* PROFILE */}
                <Route path="profile" element={<MemberProfile />}>
                  <Route index element={<ProfileChangePassword />} />
                  <Route path="bank" element={<BankDetails />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="control-panel" element={<ControlPanel />} />
                </Route>

                {/* REPORTS */}
                <Route path="reports" element={<Reports />}>
                  <Route index element={<JoiningReport />} />
                  <Route
                    path="activation-report"
                    element={<ActivationReport />}
                  />
                  <Route path="ledger-report" element={<LedgerReport />} />
                </Route>

                {/* PAYOUT */}
                <Route path="payout" element={<Payout />}>
                  <Route index element={<PayoutStakingBonus />} />
                  <Route
                    path="sponsor-bonus"
                    element={<PayoutSponsorBonus />}
                  />
                  <Route
                    path="wallet-compound-bonus"
                    element={<PayoutWalletBonus />}
                  />
                  <Route
                    path="performance-bonus"
                    element={<PayoutPerformanceBonus />}
                  />
                  <Route path="rewards" element={<PayoutRewards />} />
                </Route>

                {/* WITHDRAWL */}
                <Route
                  path="withdrawl-history"
                  element={<WithdrawlHistory />}
                />
                <Route path="support-history" element={<SupportHistory />} />

                {/* FUNDS */}
                <Route path="funds-history" element={<AdminFundHistory />}>
                  <Route index element={<FundTransfer />} />
                  <Route
                    path="transfer-history"
                    element={<TransferHistory />}
                  />
                  <Route path="add-fund" element={<AddFund />} />
                  <Route path="request" element={<Request />} />
                  <Route path="request-history" element={<RequestHistory />} />
                  <Route path="request-history" element={<RequestHistory />} />
                </Route>
                <Route path="settings" element={<AdminSettings />} />
              </Route>
            </Routes>
            <BottomNav />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </AppKitProvider>
);

export default App;
