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
    code: "TON",
    name: "TON/USDT",
    volume: "84215.33K",
    price: 5.62,
    change: 2.91,
    icon: "💎",
  },
  {
    code: "ARBX",
    name: "ARBX/USDT",
    volume: "12450.88K",
    price: 1.12,
    change: -1.45,
    icon: "🟦",
  },
  {
    code: "STRK",
    name: "STRK/USDT",
    volume: "65231.77K",
    price: 0.89,
    change: 4.22,
    icon: "⚡",
  },
  {
    code: "BLUR",
    name: "BLUR/USDT",
    volume: "33210.45K",
    price: 0.51,
    change: -2.38,
    icon: "🌫️",
  },
  {
    code: "PYTH",
    name: "PYTH/USDT",
    volume: "28761.21K",
    price: 0.72,
    change: 3.65,
    icon: "📡",
  },
  {
    code: "ORDI",
    name: "ORDI/USDT",
    volume: "17422.56K",
    price: 38.7,
    change: -1.12,
    icon: "🟠",
  },
  {
    code: "CYBER",
    name: "CYBER/USDT",
    volume: "9211.33K",
    price: 6.25,
    change: 5.01,
    icon: "🧠",
  },
  {
    code: "WLD",
    name: "WLD/USDT",
    volume: "45123.78K",
    price: 2.14,
    change: -3.08,
    icon: "🌍",
  },
  {
    code: "AI",
    name: "AI/USDT",
    volume: "76812.54K",
    price: 0.37,
    change: 6.72,
    icon: "🤖",
  },
  {
    code: "ARKM",
    name: "ARKM/USDT",
    volume: "19321.66K",
    price: 1.78,
    change: 1.95,
    icon: "🔍",
  },
  {
    code: "ALT",
    name: "ALT/USDT",
    volume: "14223.88K",
    price: 0.29,
    change: -2.66,
    icon: "🪙",
  },
  {
    code: "ZETA",
    name: "ZETA/USDT",
    volume: "27344.91K",
    price: 1.35,
    change: 4.11,
    icon: "✨",
  },
  {
    code: "ACE",
    name: "ACE/USDT",
    volume: "11872.33K",
    price: 9.42,
    change: -0.78,
    icon: "🃏",
  },
  {
    code: "NTRN",
    name: "NTRN/USDT",
    volume: "22114.56K",
    price: 0.64,
    change: 2.23,
    icon: "🌌",
  },
  {
    code: "DYM",
    name: "DYM/USDT",
    volume: "38421.90K",
    price: 3.11,
    change: 3.89,
    icon: "🧬",
  },
  {
    code: "MANTA",
    name: "MANTA/USDT",
    volume: "27451.21K",
    price: 2.77,
    change: -1.97,
    icon: "🐋",
  },
  {
    code: "PIXEL",
    name: "PIXEL/USDT",
    volume: "31222.66K",
    price: 0.58,
    change: 5.44,
    icon: "🎮",
  },
  {
    code: "XAI",
    name: "XAI/USDT",
    volume: "18776.44K",
    price: 1.09,
    change: -2.05,
    icon: "🧠",
  },
  {
    code: "SAGA",
    name: "SAGA/USDT",
    volume: "14432.77K",
    price: 2.45,
    change: 3.12,
    icon: "📖",
  },
  {
    code: "BEAM",
    name: "BEAM/USDT",
    volume: "26554.90K",
    price: 0.027,
    change: 6.88,
    icon: "💥",
  },
  {
    code: "TAO",
    name: "TAO/USDT",
    volume: "9123.45K",
    price: 315.6,
    change: 2.67,
    icon: "🧘",
  },
  {
    code: "FLUX",
    name: "FLUX/USDT",
    volume: "18234.88K",
    price: 0.93,
    change: -1.22,
    icon: "⚡",
  },
  {
    code: "KAVA",
    name: "KAVA/USDT",
    volume: "13321.76K",
    price: 0.71,
    change: 1.54,
    icon: "🍶",
  },
  {
    code: "ENS",
    name: "ENS/USDT",
    volume: "16442.21K",
    price: 18.9,
    change: -0.66,
    icon: "🌐",
  },
  {
    code: "SSV",
    name: "SSV/USDT",
    volume: "8421.56K",
    price: 24.3,
    change: 4.77,
    icon: "🔐",
  },
];

const getDailyRandomCode = (data: MarketItemData[]) => {
  const today = new Date().toDateString(); // unique per day

  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = today.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % data.length;
  return data[index].code;
};

export const useMarketData = () => {
  const [marketData, setMarketData] =
    useState<MarketItemData[]>(initialMarketData);

  const [highlightedCode, setHighlightedCode] = useState<string | null>(null);

  const basePricesRef = useRef<Record<string, number>>({});

  useEffect(() => {
    initialMarketData.forEach((item) => {
      basePricesRef.current[item.code] = item.price;
    });

    // 👇 set daily highlighted item
    setHighlightedCode(getDailyRandomCode(initialMarketData));

    const updatePrices = () => {
      setMarketData((prevData) =>
        prevData.map((item) => {
          const volatility = 0.005;
          const randomChange = (Math.random() - 0.5) * 2 * volatility;
          const newPrice = item.price * (1 + randomChange);

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

    const interval = setInterval(updatePrices, 1000);
    return () => clearInterval(interval);
  }, []);

  return { marketData, highlightedCode };
};
