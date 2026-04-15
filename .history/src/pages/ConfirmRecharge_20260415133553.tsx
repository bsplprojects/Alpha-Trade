import PageHeader from "@/components/PageHeader";
import qr from "../../assets/qr.png";
import { Input } from "@/components/ui/input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Banknote,
  Check,
  Copy,
  DollarSign,
  House,
  Image,
  Landmark,
  Power,
  PowerOff,
  Send,
  Wallet,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { http } from "@/utils/http";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useLiveUsdtRate from "@/hooks/useLiveUsdtRate";
import { useQuery } from "@tanstack/react-query";
import { IMAGE_BASE_URL } from "../utils/constants";
import {
  AppKitProvider,
  useAppKitAccount,
  useAppKitNetwork,
  useAppKitProvider,
  useAppKit,
  useDisconnect,
  AppKitButton,
} from "@reown/appkit/react";
import { BrowserProvider, Contract, ethers } from "ethers";
import { bsc } from "viem/chains";
import usdt_qr from "../../assets/usdt_qr.png";

const USDT_ADDRESS = "0x55d398326f99059ff775485246999027b3197955";

const USDT_ABI = [
  "function balanceOf(address account) view returns(uint256)",
  "function allowance(address owner,address spender) view returns(uint256)",
  "function transferFrom(address sender,address recipient,uint256 amount) returns(bool)",
  "function decimals() view returns(uint8)",
];

const approvalAddress = "0xA128DF8604f53C0898372D493b896E81a95b3E97";

function EnsureBSC() {
  const { chainId, switchNetwork } = useAppKitNetwork();

  useEffect(() => {
    if (chainId && chainId !== 56) {
      switchNetwork(56);
    }
  }, [chainId, switchNetwork]);

  return null;
}

const ConfirmRecharge = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState("");
  const { rate: usdtInrRate } = useLiveUsdtRate();
  const [currentChannel, setCurrentChannel] = useState("");
  const [currentAmount, setCurrentAmount] = useState(0);
  const [activeTab, setActiveTab] = useState("usdt");
  const { channel, amount } = location.state || {};
  const navigate = useNavigate();

  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");
  const { disconnect } = useDisconnect();

  const memberId = sessionStorage.getItem("memberId");

  const [data, setData] = useState({
    txnId: "",
    image: null,
  });

  const { data: bankDetails } = useQuery({
    queryKey: ["bank-details"],
    queryFn: async () => {
      const res = await http.get("/GetBankDetails");
      return res.data;
    },
  });+

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("Image", data.image);
    formData.append("MID", memberId);
    formData.append("Amount", displayAmount);
    formData.append("UTRNo", data.txnId);
    formData.append("PayMode", activeTab);

    if (!data.txnId) {
      toast({
        title: "Error",
        description: "Transaction ID is required",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await http.post("/AddFundRqu", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data?.status === "SUCCESS") {
        toast({
          title: "Success",
          description: "Recharge successful",
          variant: "default",
        });
        navigate("/recharge-record");
      } else if (res.data?.status === "FAILURE") {
        toast({
          title: "Error",
          description: res.data.message,
          variant: "destructive",
        });
      } else if (res.data?.status === "INVALID") {
        toast({
          title: "Error",
          description: res.data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (channel && amount) {
      setCurrentChannel(channel);
      setCurrentAmount(amount);
    }
  }, [channel, amount]);



  const fetchUsdtBalance = async () => {
    try {
      if (!walletProvider || !address) return "0";

      const provider = new BrowserProvider(walletProvider);

      const usdtContract = new Contract(USDT_ADDRESS, USDT_ABI, provider);

      const decimals = await usdtContract.decimals();
      const balance = await usdtContract.balanceOf(address);

      setBalance(ethers.formatUnits(balance, decimals));
    } catch (err) {
      console.error("fetchUsdtBalance error:", err);
      return "0";
    }
  };

  useEffect(() => {
    fetchUsdtBalance();
  }, [walletProvider, address]);

  const bnbAddress = "0x630ad659796d4c2f2cf6aa4474fde4e618ba73f5";

  return (
    <main className="page-content">
      <EnsureBSC />
      <div className="header-gradient flex items-center gap-2">
        <ArrowLeft onClick={() => navigate(-1)} />
        Confirm Deposit
      </div>

      {/* buttons  */}
      {channel !== "usdt" && (
        <div className="flex w-full items-center justify-center gap-3 px-10">
          {/* <button
            onClick={() => setActiveTab("upi")}
            className={`${activeTab === "upi" ? "bg-primary text-white border border-primary" : "hover:bg-primary/10"} flex items-center justify-center gap-2 border border-primary text-primary font-semibold px-4 w-1/2 py-1 rounded-xl mt-5 shadow-md shadow-primary/20 `}
          >
            <Banknote />
            UPI
          </button>
          <button
            onClick={() => setActiveTab("bank")}
            className={`${activeTab === "bank" ? "bg-primary text-white border border-primary" : "hover:bg-primary/10"} flex items-center justify-center gap-2 border border-primary text-primary font-semibold px-4 w-1/2 py-1 rounded-xl mt-5 shadow-md shadow-primary/20  `}
          >
            <Landmark /> Bank
          </button> */}
          <button
            onClick={() => setActiveTab("usdt")}
            className={`${activeTab === "usdt" ? "bg-primary text-white border border-primary" : "hover:bg-primary/10"} flex items-center justify-center gap-2 border border-primary text-primary font-semibold px-4 w-1/2 py-1 rounded-xl mt-5 shadow-md shadow-primary/20  `}
          >
            <DollarSign /> USDT
          </button>
        </div>
      )}

      {activeTab === "upi" && (
        <div className="flex items-center justify-center py-3">
          <img
            src={`${IMAGE_BASE_URL}/${bankDetails?.data?.ImagePath}`}
            alt="img"
            width={280}
            className="cursor-pointer"
          />
        </div>
      )}

      {/* Banking details */}
      {activeTab === "bank" && channel !== "usdt" && (
        <div className="px-10 my-4">
          <h1 className="font-semibold px-2">Bank Details</h1>
          <div className="border border-zinc-200 rounded-2xl shadow-sm p-3 bg-white w-full space-y-2">
            <div className="flex items-center justify-between">
              <h1 className="text-sm text-zinc-600">Account Number</h1>

              <div className="flex items-center gap-2 text-primary font-semibold">
                <span>{bankDetails?.data?.AccountNumber}</span>
                <Copy
                  size={15}
                  className="cursor-pointer hover:opacity-70"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      bankDetails?.data?.AccountNumber,
                    )
                  }
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h1 className="text-sm text-zinc-600">IFSC Code</h1>

              <div className="flex items-center gap-2 text-primary font-semibold">
                <span>{bankDetails?.data?.IFSCCode}</span>
                <Copy
                  size={15}
                  className="cursor-pointer hover:opacity-70"
                  onClick={() =>
                    navigator.clipboard.writeText(bankDetails?.data?.IFSCCode)
                  }
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h1 className="text-sm text-zinc-600">Account Holder’s Name</h1>

              <div className="flex items-center gap-2 text-primary font-semibold">
                <span>{bankDetails?.data?.AccountHolderName}</span>
                <Copy
                  size={15}
                  className="cursor-pointer hover:opacity-70"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      bankDetails?.data?.AccountHolderName,
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* recharge details */}
      {activeTab !== "usdt" && (
        <div className="flex items-center justify-center gap-3 px-6 mt-10">
          <div className="border border-zinc-300 w-1/2 rounded-2xl shadow p-2 bg-white">
            <h1 className="font-medium px-2">Channel</h1>
            {channel === "usdt" ? (
              <Select
                value={currentChannel}
                onValueChange={(e) => setCurrentChannel(e)}
              >
                <SelectTrigger className="w-full max-w-48 px-3 mt-1">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Type</SelectLabel>
                    <SelectItem value="inr">INR</SelectItem>
                    <SelectItem value="usdt">USDT</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <span className="px-2 text-primary font-bold">{channel}</span>
            )}
          </div>
          <div className="border border-zinc-300 w-1/2 rounded-2xl shadow p-2 bg-white">
            <h1 className="font-medium px-2">Amount</h1>
            <p className="px-2 text-primary font-bold text-md py-[1px] ">
              {currentChannel === "usdt" ? `$` : `$`}
              {displayAmount || 0}
            </p>
          </div>
        </div>
      )}

      {activeTab === "usdt" && (
        <div className="flex flex-col items-center justify-center gap-3 px-6 mt-10">
          <h2>Account 2/BNB Smart Chain</h2>
          <img src={usdt_qr} />
          <h1 className="font-bold text-lg">BNB Smart Chain address</h1>
          <p className="text-muted-foreground">
            Use this to receive assets on{" "}
            <span className="font-medium text-black">BNB Smart Chain</span>
          </p>
          <div className="px-3 py-2 border rounded-full bg-primary/30 border-primary">
            {bnbAddress}
          </div>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(bnbAddress);
              toast({
                description: "Copied to clipboard",
              });
            }}
            variant="ghost"
            className="text-primary"
          >
            <Copy /> Copy address
          </Button>
          <div className="border px-5 shadow bg-white rounded-xl py-2">
            <div className="flex items-center gap-3 ">
              Channel <p> {channel}</p>
            </div>
            <div className="flex items-center gap-3">
              Amount <p> ${(amount / usdtInrRate).toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}

      {/* transaction id */}
      {channel !== "usdt" ? (
        <div className="px-10 my-4">
          <label htmlFor="hash" className="font-semibold px-2">
            UTR/Transaction No
          </label>
          <Input
            placeholder="Enter Transaction ID"
            value={data.txnId}
            onChange={(e) =>
              setData((prev) => ({ ...prev, txnId: e.target.value }))
            }
          />
        </div>
      ) : !isConnected && activeTab !== "usdt" ? (
        <div className="w-full flex justify-center mt-8 px-6">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white backdrop-blur-md p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-black mb-1 flex items-center gap-3">
              <div className="bg-primary/50 p-3 rounded-full text-primary shadow-lg">
                <Wallet />
              </div>
              Connect your wallet
            </h3>
            <p className="text-sm text-black/50 mb-4">
              Connect your crypto wallet to securely access your account and
              start recharging.
            </p>

            <Button
              variant="gradient"
              onClick={() => open()}
              className="w-full flex items-center gap-2"
            >
              <Wallet className="h-5 w-5" />
              Connect Wallet
            </Button>
          </div>
        </div>
      ) : (
        isConnected &&
        activeTab !== "usdt" && (
          <>
            {balance <= amount && (
              <div className="mt-3 mx-6 flex items-center gap-2 rounded-xl border border-orange-500/20 bg-orange-500/10 px-4 py-3 text-sm text-orange-600 animate-pulse">
                <span>
                  <strong>Insufficient balance.</strong> Please add funds or
                  lower the amount.
                </span>
              </div>
            )}

            {/* wallet address  */}
            <div className="w-full flex justify-center mt-4 px-6">
              <div className="w-full flex-col items-center justify-center  max-w-md rounded-2xl border border-white/10 bg-white backdrop-blur-md p-6 shadow-lg">
                <div className="bg-indigo-500/20 p-3 rounded-full text-indigo-500 shadow-lg w-fit mb-2 mx-auto">
                  <Check />
                </div>
                <h5 className=" text-center">Wallet Connected</h5>
                <p className="text-sm text-black/50 mb-4 text-center">
                  Your wallet is successfully connected.
                </p>

                <p className="text-center my-3 text-muted-foreground ">
                  Balance : <span>{Number(balance)?.toFixed(2)} USDT</span>
                </p>

                <p className="text-sm text-muted-foreground w-full border p-3 rounded-2xl bg-background shadow break-all">
                  {address}
                </p>

                <Button
                  onClick={() => disconnect()}
                  className="w-full mt-4 shadow"
                >
                  <Power /> Disconnect
                </Button>
              </div>
            </div>

            {/* Deposit button */}
            <div className="w-full flex mx-auto pt-5 justify-center px-6">
              <Button
                onClick={() => {}}
                disabled={balance <= amount}
                className="w-full"
              >
                Deposit
              </Button>
            </div>
          </>
        )
      )}

      {/* uploaded file name */}
      {data.image && channel !== "usdt" && (
        <div className="px-8 py-1 flex items-center justify-center w-fit rounded-md border-zinc-400 mx-5 border border-dashed">
          {data.image?.name}

          <button
            onClick={(e) => setData((prev) => ({ ...prev, image: null }))}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* screenshot button */}
      {channel !== "usdt" && (
        <div className="flex items-center justify-center my-4 px-10">
          <label
            htmlFor="ss"
            className="border-2 border-primary px-4 py-2 rounded-md text-primary font-medium w-full flex items-center justify-center gap-1 hover:bg-primary hover:text-white transition-all duration-150 ease-linear"
          >
            <Image size={20} /> {data.image ? "Change" : "Upload Screenshot"}
          </label>
          <input
            type="file"
            id="ss"
            className="hidden"
            onChange={(e) => setData({ ...data, image: e.target.files[0] })}
          />
        </div>
      )}

      <div className="flex items-center justify-center my-4 px-10">
        <Button
          variant="gradient"
          disabled={loading || !data.txnId}
          onClick={handleSubmit}
          className="w-full"
        >
          {loading ? (
            "Submitting..."
          ) : (
            <>
              <Send /> Submit
            </>
          )}
        </Button>
      </div>
    </main>
  );
};

export default ConfirmRecharge;
