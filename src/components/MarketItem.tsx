import { useNavigate } from "react-router-dom";

interface MarketItemProps {
  code: string;
  name: string;
  volume: string;
  price: number;
  change: number;
  icon: string;
}

const MarketItem = ({ code, name, volume, price, change, icon }: MarketItemProps) => {
  const navigate = useNavigate();
  const isPositive = change >= 0;

  return (
    <div 
      className="flex items-center justify-between py-3 px-4 border-b border-border animate-fade-in cursor-pointer hover:bg-muted/50 transition-colors"
      onClick={() => navigate(`/market/${code}`)}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">
          {icon}
        </div>
        <div>
          <div className="font-semibold text-foreground">{name}</div>
          <div className="text-xs text-muted-foreground">VOL: {volume}</div>
        </div>
      </div>
      <div className="text-center">
        <div className={isPositive ? "price-up font-medium" : "price-down font-medium"}>
          {price.toFixed(2)}
        </div>
      </div>
      <div>
        <span className={`change-badge ${isPositive ? "positive" : "negative"}`}>
          {isPositive ? "+" : ""}{change.toFixed(2)}%
        </span>
      </div>
    </div>
  );
};

export default MarketItem;
