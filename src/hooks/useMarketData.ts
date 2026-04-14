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
  {
    code: "ARB",
    name: "ARB/USDT",
    volume: "36196.99K",
    price: 0.2,
    change: -2.78,
    icon: "🔷",
  },
  {
    code: "AAVE",
    name: "AAVE/USDT",
    volume: "55.37K",
    price: 164.7,
    change: -0.98,
    icon: "👻",
  },
  {
    code: "DOGE",
    name: "DOGE/USDT",
    volume: "677658.70K",
    price: 0.14,
    change: -2.17,
    icon: "🐕",
  },
  {
    code: "EOS",
    name: "EOS/USDT",
    volume: "1180.28K",
    price: 0.78,
    change: -0.66,
    icon: "⬡",
  },
  {
    code: "ADA",
    name: "ADA/USDT",
    volume: "107161.19K",
    price: 0.39,
    change: -0.9,
    icon: "🔵",
  },
  {
    code: "AVAX",
    name: "AVAX/USDT",
    volume: "2125.52K",
    price: 13.63,
    change: -1.23,
    icon: "🔺",
  },
  {
    code: "UNI",
    name: "UNI/USDT",
    volume: "3691.08K",
    price: 5.4,
    change: -1.93,
    icon: "🦄",
  },
  {
    code: "APT",
    name: "APT/USDT",
    volume: "4271.01K",
    price: 1.76,
    change: -2.28,
    icon: "📱",
  },
  {
    code: "EGLD",
    name: "EGLD/USDT",
    volume: "218.31K",
    price: 6.1,
    change: -3.63,
    icon: "✖️",
  },
  {
    code: "FTM",
    name: "FTM/USDT",
    volume: "1858.97K",
    price: 0.7,
    change: -0.77,
    icon: "👻",
  },
  {
    code: "THETA",
    name: "THETA/USDT",
    volume: "2755.47K",
    price: 0.29,
    change: -4.3,
    icon: "🎬",
  },
  {
    code: "RNDR",
    name: "RNDR/USDT",
    volume: "233.25K",
    price: 7.03,
    change: 2.58,
    icon: "🎨",
  },
  {
    code: "BTC",
    name: "BTC/USDT",
    volume: "987654.12K",
    price: 43250.5,
    change: 1.24,
    icon: "🟠",
  },
  {
    code: "ETH",
    name: "ETH/USDT",
    volume: "654321.45K",
    price: 2350.75,
    change: -0.87,
    icon: "💠",
  },
  {
    code: "SOL",
    name: "SOL/USDT",
    volume: "124567.89K",
    price: 98.4,
    change: 3.12,
    icon: "🌞",
  },
  {
    code: "MATIC",
    name: "MATIC/USDT",
    volume: "88542.11K",
    price: 0.74,
    change: -1.45,
    icon: "🟣",
  },
  {
    code: "LINK",
    name: "LINK/USDT",
    volume: "43120.55K",
    price: 14.6,
    change: 0.92,
    icon: "🔗",
  },
  {
    code: "DOT",
    name: "DOT/USDT",
    volume: "29876.33K",
    price: 6.42,
    change: -2.11,
    icon: "🔴",
  },
  {
    code: "LTC",
    name: "LTC/USDT",
    volume: "15422.76K",
    price: 71.9,
    change: 0.34,
    icon: "💿",
  },
  {
    code: "XRP",
    name: "XRP/USDT",
    volume: "341122.18K",
    price: 0.56,
    change: 1.88,
    icon: "💧",
  },
  {
    code: "TRX",
    name: "TRX/USDT",
    volume: "214598.64K",
    price: 0.11,
    change: -0.45,
    icon: "⚡",
  },
  {
    code: "NEAR",
    name: "NEAR/USDT",
    volume: "19344.28K",
    price: 2.87,
    change: 4.21,
    icon: "🌐",
  },
  {
    code: "ALGO",
    name: "ALGO/USDT",
    volume: "16233.91K",
    price: 0.18,
    change: -3.05,
    icon: "🔺",
  },
  {
    code: "ICP",
    name: "ICP/USDT",
    volume: "8456.37K",
    price: 9.22,
    change: 0.67,
    icon: "🧠",
  },
  {
    code: "SAND",
    name: "SAND/USDT",
    volume: "27345.19K",
    price: 0.42,
    change: -1.98,
    icon: "🏖️",
  },
  {
    code: "MANA",
    name: "MANA/USDT",
    volume: "18765.44K",
    price: 0.39,
    change: 2.45,
    icon: "🌌",
  },
  {
    code: "AXS",
    name: "AXS/USDT",
    volume: "9321.88K",
    price: 6.75,
    change: -0.62,
    icon: "🎮",
  },
  {
    code: "GALA",
    name: "GALA/USDT",
    volume: "45678.22K",
    price: 0.03,
    change: 5.14,
    icon: "🎉",
  },
  {
    code: "OP",
    name: "OP/USDT",
    volume: "22871.09K",
    price: 1.92,
    change: -2.73,
    icon: "🚀",
  },
  {
    code: "AR",
    name: "AR/USDT",
    volume: "5123.66K",
    price: 7.85,
    change: 1.09,
    icon: "📦",
  },
  {
    code: "KSM",
    name: "KSM/USDT",
    volume: "2876.43K",
    price: 21.3,
    change: -4.02,
    icon: "🕊️",
  },
  {
    code: "CHZ",
    name: "CHZ/USDT",
    volume: "32451.77K",
    price: 0.09,
    change: 0.81,
    icon: "⚽",
  },
  {
    code: "HBAR",
    name: "HBAR/USDT",
    volume: "19876.55K",
    price: 0.06,
    change: -1.14,
    icon: "🌿",
  },
  {
    code: "ZIL",
    name: "ZIL/USDT",
    volume: "11234.66K",
    price: 0.02,
    change: 2.02,
    icon: "⚙️",
  },
  {
    code: "CAKE",
    name: "CAKE/USDT",
    volume: "9432.18K",
    price: 2.11,
    change: -0.89,
    icon: "🥞",
  },
  {
    code: "ROSE",
    name: "ROSE/USDT",
    volume: "13654.27K",
    price: 0.05,
    change: 3.76,
    icon: "🌹",
  },
  {
    code: "LDO",
    name: "LDO/USDT",
    volume: "17654.82K",
    price: 2.04,
    change: -1.36,
    icon: "💧",
  },
  {
    code: "IMX",
    name: "IMX/USDT",
    volume: "12398.11K",
    price: 1.57,
    change: 4.89,
    icon: "🧱",
  },
  {
    code: "PEPE",
    name: "PEPE/USDT",
    volume: "745221.33K",
    price: 0.00000123,
    change: -6.42,
    icon: "🐸",
  },
  {
    code: "FLOKI",
    name: "FLOKI/USDT",
    volume: "231998.45K",
    price: 0.000032,
    change: 7.18,
    icon: "🐶",
  },
  {
    code: "BONK",
    name: "BONK/USDT",
    volume: "198332.77K",
    price: 0.000014,
    change: -3.55,
    icon: "🔥",
  },
  {
    code: "INJ",
    name: "INJ/USDT",
    volume: "8234.91K",
    price: 28.6,
    change: 2.97,
    icon: "💉",
  },
  {
    code: "RUNE",
    name: "RUNE/USDT",
    volume: "11432.54K",
    price: 4.91,
    change: -2.19,
    icon: "🪓",
  },
  {
    code: "WOO",
    name: "WOO/USDT",
    volume: "17234.09K",
    price: 0.23,
    change: 1.66,
    icon: "📈",
  },
  {
    code: "GMT",
    name: "GMT/USDT",
    volume: "19876.33K",
    price: 0.18,
    change: -0.74,
    icon: "⌚",
  },
  {
    code: "MINA",
    name: "MINA/USDT",
    volume: "8654.44K",
    price: 0.79,
    change: 3.31,
    icon: "🪶",
  },
  {
    code: "ASTR",
    name: "ASTR/USDT",
    volume: "7432.88K",
    price: 0.07,
    change: -1.92,
    icon: "⭐",
  },
  {
    code: "SUI",
    name: "SUI/USDT",
    volume: "26455.21K",
    price: 1.02,
    change: 2.44,
    icon: "💦",
  },
  {
    code: "SEI",
    name: "SEI/USDT",
    volume: "19342.91K",
    price: 0.48,
    change: -3.18,
    icon: "🏃",
  },
  {
    code: "TIA",
    name: "TIA/USDT",
    volume: "15673.88K",
    price: 9.35,
    change: 5.62,
    icon: "🧬",
  },
  {
    code: "JUP",
    name: "JUP/USDT",
    volume: "33421.55K",
    price: 0.62,
    change: -1.08,
    icon: "🪐",
  },
];

export const useMarketData = () => {
  const [marketData, setMarketData] =
    useState<MarketItemData[]>(initialMarketData);
  const basePricesRef = useRef<Record<string, number>>({});

  useEffect(() => {
    // Store base prices for change calculation
    initialMarketData.forEach((item) => {
      basePricesRef.current[item.code] = item.price;
    });

    const updatePrices = () => {
      setMarketData((prevData) =>
        prevData.map((item) => {
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
        }),
      );
    };

    // Update every 1 second
    const interval = setInterval(updatePrices, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return marketData;
};
