import { useEffect, useState } from "react";

function useLiveUsdtRate() {
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRate() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=inr`,
        );
        const data = await res.json();
        // Example: data = { tether: { inr: 91.65 } }
        if (data?.tether?.inr) {
          setRate(data.tether.inr);
        } else {
          setError("Rate not available");
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRate();
    // Optionally refresh every minute:
    const interval = setInterval(fetchRate, 60000);
    return () => clearInterval(interval);
  }, []);

  return { rate, loading, error };
}

export default useLiveUsdtRate;
