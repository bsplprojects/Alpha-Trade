import PageHeader from "@/components/PageHeader";
import MarketItem from "@/components/MarketItem";
import { useMarketData } from "@/hooks/useMarketData";
import { Activity } from "lucide-react";

const Market = () => {
  const { marketData, highlightedCode } = useMarketData();

  return (
    <div className="page-content ">
      <PageHeader title="Market" />

      {/* Table Header */}
      <div className="grid grid-cols-3 py-3 px-4 text-sm text-muted-foreground bg-card border-b border-border sticky top-0">
        <span>Code</span>
        <span className="text-center">Price</span>
        <span className="text-right flex items-center justify-end gap-1">
          <Activity className="w-3 h-3 text-indigo-500 animate-pulse" />
          Increase
        </span>
      </div>

      {/* Market List */}
      <div className="bg-card">
        {marketData.map((item) => (
          <MarketItem
            key={item.code}
            {...item}
            isHighlighted={item.code === highlightedCode}
          />
        ))}
      </div>
    </div>
  );
};

export default Market;
