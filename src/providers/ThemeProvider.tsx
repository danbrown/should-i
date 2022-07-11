import { useEffect } from "react";
import dynamic from "next/dynamic";
const TopProgressBar = dynamic(() => import("../components/TopProgressBar"));
import {
  ThemeProvider as WipsieThemeProvider,
  CssBaseline,
  NprogressBaseline,
} from "@wipsie/ui";
import { useSelector, useDispatch } from "react-redux";
import { settingsInit } from "../redux/slices/settings";

const ThemeProvider = ({ children }) => {
  const { theme } = useSelector((state: any) => state.settings);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(settingsInit());
  }, [dispatch]);

  return (
    <WipsieThemeProvider theme={theme}>
      <CssBaseline />
      <NprogressBaseline type="bar" height="3px" />
      <TopProgressBar />
      {children}
    </WipsieThemeProvider>
  );
};

export default ThemeProvider;
