import dynamic from "next/dynamic";
import { Provider as ReduxBaseProvider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
// const LoadingScreen = dynamic(() => import("../components/LoadingScreen"));
import LoadingScreen from "../components/LoadingScreen";
import { persistor, store } from "../redux/store";

const ReduxProvider: React.FC<any> = ({ children }) => {
  return (
    <ReduxBaseProvider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        {children}
      </PersistGate>
    </ReduxBaseProvider>
  );
};

export default ReduxProvider;
