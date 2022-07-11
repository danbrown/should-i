import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import LoadingScreen from "../components/LoadingScreen";

const LoadingProvider = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = (url) => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  if (loading) {
    return <LoadingScreen />;
  } else {
    return <>{children}</>;
  }
};

export default LoadingProvider;
