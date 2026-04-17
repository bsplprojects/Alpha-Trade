import {
  BadgeDollarSign,
  BadgeInfo,
  Banknote,
  ChartArea,
  FileText,
  HandCoins,
  Home,
  MessageSquareMore,
  Settings,
  User,
  UsersRound,
} from "lucide-react";

export const IMAGE_BASE_URL = "https://api.bctrade1.in";

export const adminItems = [
  {
    icon: Home,
    label: "Dashboard",
    link: "/admin",
  },
  {
    icon: UsersRound,
    label: "Member Details",
    link: "/admin/member-details",
    children: [
      {
        label: "Member Modify",
        link: "/admin/member-details",
      },
      {
        label: "Change Password",
        link: "/admin/member-details/change-password",
      },
      {
        label: "Enter to Member",
        link: "/admin/member-details/enter-member",
      },
      {
        label: "Activation",
        link: "/admin/member-details/activation",
      },
    ],
  },
  {
    icon: User,
    label: "Profile",
    link: "/admin/profile",
    children: [
      {
        label: "Change Password",
        link: "/admin/profile",
      },
      {
        label: "Bank details",
        link: "/admin/profile/bank",
      },
      // {
      //   label: "Settings",
      //   link: "/admin/profile/settings",
      // },
      // {
      //   label: "Control Panel",
      //   link: "/admin/profile/control-panel",
      // },
    ],
  },
  {
    icon: FileText,
    label: "Reports",
    link: "/admin/reports",
    children: [
      {
        label: "Joining Report",
        link: "/admin/reports",
      },
      {
        label: "Recharge Report",
        link: "/admin/reports/activation-report",
      },
      // {
      //   label: "Ledger Report",
      //   link: "/admin/reports/ledger-report",
      // },
    ],
  },
  {
    icon: BadgeDollarSign,
    label: "Payout",
    link: "/admin/payout",
    children: [
      {
        label: "Staking Bonus",
        link: "/admin/payout",
      },
      {
        label: "Sponsor Bonus",
        link: "/admin/payout/sponsor-bonus",
      },
      {
        label: "E-Wallet Compound Bonus",
        link: "/admin/payout/wallet-compound-bonus",
      },
      {
        label: "Performance Bonus",
        link: "/admin/payout/performance-bonus",
      },
      {
        label: "Rewards",
        link: "/admin/payout/rewards",
      },
    ],
  },
  {
    icon: HandCoins,
    label: "Withdrawl History",
    link: "/admin/withdrawl-history",
  },
  {
    icon: BadgeInfo,
    label: "Support History",
    link: "/admin/support-history",
  },
  {
    icon: Banknote,
    label: "Funds",
    link: "/admin/funds-history",
    children: [
      // {
      //   label: "Fund Transfer",
      //   link: "/admin/funds-history",
      // },
      // {
      //   label: "Transfer History",
      //   link: "/admin/funds-history/transfer-history",
      // },
      {
        label: "Add Fund",
        link: "/admin/funds-history/add-fund",
      },
      {
        label: "Request History",
        link: "/admin/funds-history/request-history",
      },
      {
        label: "Fixed Deposit History",
        link: "/admin/funds-history/fd-history",
      },
    ],
  },
  {
    icon: Settings,
    label: "Settings",
    link: "/admin/settings",
  },
  {
    icon: MessageSquareMore ,
    label: "Messages",
    link: "/messages",
  },
];
