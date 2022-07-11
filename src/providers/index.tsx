import ReduxProvider from "./ReduxProvider";
import ThemeProvider from "./ThemeProvider";
import LoadingProvider from "./LoadingProvider";

const Providers = ({ children }) => {
  return (
    <ReduxProvider>
      <ThemeProvider>
        <LoadingProvider>{children}</LoadingProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
};

export default Providers;
