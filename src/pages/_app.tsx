import "../styles/global.css";

import Providers from "../providers";

const MyApp: React.FC<any> = ({ Component, pageProps }) => {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
};

export default MyApp;
