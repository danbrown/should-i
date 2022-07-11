/* eslint-disable react/display-name */
import { useState, useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Typography,
  Spacing,
  useTheme,
  Page,
  Switch,
  Flex,
  Fixed,
  Box,
  Container,
  Link,
  Hidden,
  Grid,
} from "@wipsie/ui";
import Head from "./Head";
import Header from "./Header";
import Footer from "./Footer";

function DefaultLayout({ meta, children, ...otherProps }: any) {
  return (
    <Page backgroundColor="shade" {...otherProps}>
      <Head {...meta} />

      <Header />

      <Flex mt={{ xs: -1, md: 2 }} p={2} direction="column">
        {children}
      </Flex>

      <Footer />
    </Page>
  );
}

export default DefaultLayout;
