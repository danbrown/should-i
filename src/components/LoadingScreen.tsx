import React from "react";
import { Page, Loading } from "@wipsie/ui";

// ----------------------------------------------------------------------

const TRANSITION = {
  ease: "linear",
  duration: 3.2,
  loop: Infinity,
};

function LoadingScreen(props) {
  return (
    <Page
      display="flex"
      direction="column"
      align="center"
      justify="center"
      style={{ zIndex: 99 }}
      {...props}
    >
      <Loading size="xlarge" />
    </Page>
  );
}

export default LoadingScreen;
