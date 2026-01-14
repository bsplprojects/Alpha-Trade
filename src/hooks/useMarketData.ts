import { useState, useEffect, useRef } from "react";

export interface MarketItemData {
  code: string;
  name: string;
  volume: string;
  price: number;
  change: number;
  icon: string;
}

const initialMarketData: MarketItemData[] = [
  { code: "ARB", name: "ARB/USDT", volume: "36196.99K", price: 0.20, change: -2.78, icon: "🔷" },
  { code: "AAVE", name: "AAVE/USDT", volume: "55.37K", price: 164.70, change: -0.98, icon: "👻" },
  { code: "DOGE", name: "DOGE/USDT", volume: "677658.70K", price: 0.14, change: -2.17, icon: "🐕" },
  { code: "EOS", name: "EOS/USDT", volume: "1180.28K", price: 0.78, change: -0.66, icon: "⬡" },
  { code: "ADA", name: "ADA/USDT", volume: "107161.19K", price: 0.39, change: -0.90, icon: "🔵" },
  { code: "AVAX", name: "AVAX/USDT", volume: "2125.52K", price: 13.63, change: -1.23, icon: "🔺" },
  { code: "UNI", name: "UNI/USDT", volume: "3691.08K", price: 5.40, change: -1.93, icon: "🦄" },
  { code: "APT", name: "APT/USDT", volume: "4271.01K", price: 1.76, change: -2.28, icon: "📱" },
  { code: "EGLD", name: "EGLD/USDT", volume: "218.31K", price: 6.10, change: -3.63, icon: "✖️" },
  { code: "FTM", name: "FTM/USDT", volume: "1858.97K", price: 0.70, change: -0.77, icon: "👻" },
  { code: "THETA", name: "THETA/USDT", volume: "2755.47K", price: 0.29, change: -4.30, icon: "🎬" },
  { code: "RNDR", name: "RNDR/USDT", volume: "233.25K", price: 7.03, change: 2.58, icon: "🎨" },
];

export const useMarketData = () => {
  const [marketData, setMarketData] = useState<MarketItemData[]>(initialMarketData);
  const basePricesRef = useRef<Record<string, number>>({});

  useEffect(() => {
    // Store base prices for change calculation
    initialMarketData.forEach(item => {
      basePricesRef.current[item.code] = item.price;
    });

    const updatePrices = () => {
      setMarketData(prevData => 
        prevData.map(item => {
          // Random price movement (-0.5% to +0.5%)
          const volatility = 0.005;
          const randomChange = (Math.random() - 0.5) * 2 * volatility;
          const newPrice = item.price * (1 + randomChange);
          
          // Calculate change from base price
          const basePrice = basePricesRef.current[item.code];
          const newChange = ((newPrice - basePrice) / basePrice) * 100;

          return {
            ...item,
            price: newPrice,
            change: newChange,
          };
        })
      );
    };

    // Update every 1 second
    const interval = setInterval(updatePrices, 1000);
    
    console.log("[Market] Started real-time price simulation");

    return () => {
      console.log("[Market] Stopped real-time price simulation");
      clearInterval(interval);
    };
  }, []);

  return marketData;
};
