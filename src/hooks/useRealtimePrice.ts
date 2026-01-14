import { useState, useEffect, useCallback, useRef } from "react";

interface PriceData {
  time: string;
  price: number;
}

interface RealtimePriceState {
  currentPrice: number;
  change: number;
  chartData: PriceData[];
  high24h: number;
  low24h: number;
}

export const useRealtimePrice = (basePrice: number, initialChange: number) => {
  const [state, setState] = useState<RealtimePriceState>(() => {
    const initialData = generateInitialData(basePrice, initialChange >= 0);
    return {
      currentPrice: basePrice,
      change: initialChange,
      chartData: initialData,
      high24h: basePrice * 1.05,
      low24h: basePrice * 0.95,
    };
  });

  const priceRef = useRef(basePrice);
  const startPriceRef = useRef(basePrice);

  const updatePrice = useCallback(() => {
    // Simulate price movement with random walk
    const volatility = 0.002; // 0.2% volatility per tick
    const randomChange = (Math.random() - 0.5) * 2 * volatility;
    const newPrice = priceRef.current * (1 + randomChange);
    priceRef.current = newPrice;

    const newChange = ((newPrice - startPriceRef.current) / startPriceRef.current) * 100;

    setState((prev) => {
      const now = new Date();
      const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
      
      // Keep last 50 data points for smooth animation
      const newChartData = [
        ...prev.chartData.slice(-49),
        { time: timeStr, price: newPrice },
      ];

      return {
        currentPrice: newPrice,
        change: newChange,
        chartData: newChartData,
        high24h: Math.max(prev.high24h, newPrice),
        low24h: Math.min(prev.low24h, newPrice),
      };
    });
  }, []);

  useEffect(() => {
    priceRef.current = basePrice;
    startPriceRef.current = basePrice;
    
    // Update price every 500ms for smooth animation
    const interval = setInterval(updatePrice, 500);
    
    console.log("[Realtime] Started price simulation for base price:", basePrice);
    
    return () => {
      console.log("[Realtime] Stopped price simulation");
      clearInterval(interval);
    };
  }, [basePrice, updatePrice]);

  return state;
};

function generateInitialData(basePrice: number, isPositive: boolean): PriceData[] {
  const data: PriceData[] = [];
  let price = basePrice * 0.98;
  const now = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const variance = (Math.random() - 0.5) * basePrice * 0.02;
    price = price + variance + (isPositive ? basePrice * 0.0005 : -basePrice * 0.0003);
    price = Math.max(price, basePrice * 0.9);
    
    const time = new Date(now.getTime() - i * 500);
    const timeStr = `${time.getHours()}:${time.getMinutes().toString().padStart(2, "0")}:${time.getSeconds().toString().padStart(2, "0")}`;
    
    data.push({ time: timeStr, price });
  }
  
  return data;
}
