import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

interface MarketItemProps {
  code: string;
  name: string;
  volume: string;
  price: number;
  change: number;
  icon: string;
  isHighlighted: boolean;
}

const MarketItem = ({
  code,
  name,
  volume,
  price,
  change,
  icon,
  isHighlighted,
}: MarketItemProps) => {
  const navigate = useNavigate();
  const isPositive = change >= 0;
  const [flash, setFlash] = useState<"up" | "down" | null>(null);
  const prevPriceRef = useRef(price);

  // Flash effect when price changes
  useEffect(() => {
    if (price > prevPriceRef.current) {
      setFlash("up");
    } else if (price < prevPriceRef.current) {
      setFlash("down");
    }
    prevPriceRef.current = price;

    const timer = setTimeout(() => setFlash(null), 300);
    return () => clearTimeout(timer);
  }, [price]);

  // Format price based on magnitude
  const formatPrice = (p: number) => {
    if (p >= 100) return p.toFixed(2);
    if (p >= 1) return p.toFixed(2);
    return p.toFixed(2);
  };

  return (
    <div
      className={`flex items-center justify-between py-3 px-4 border-b border-border animate-fade-in cursor-pointer hover:bg-muted/50 transition-colors  `}
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
        <div
          className={`font-medium transition-all duration-300 ${
            flash === "up"
              ? "text-indigo-400 scale-105"
              : flash === "down"
                ? "text-red-400 scale-105"
                : isPositive
                  ? "text-indigo-500"
                  : "text-red-500"
          }`}
        >
          {formatPrice(price)}
        </div>
      </div>
      <div>
        <span
          className={`change-badge ${isPositive ? "positive" : "negative"}`}
        >
          {isPositive ? "+" : ""}
          {change.toFixed(2)}%
        </span>
      </div>
    </div>
  );
};

export default MarketItem;
