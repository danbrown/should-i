import { Flex, Typography, Link, Accordion, Box, Container } from "@wipsie/ui";

const Footer = () => {
  return (
    <Flex width="100vw" mt={2}>
      <Container
        display="flex"
        direction={{ xs: "column", md: "row" }}
        align={{ xs: "start", md: "center" }}
        justify="between"
        shape="square"
        fullWidth
      >
        <Typography variant="body1">
          © 2021 DumbOldSpider LLC All Rights Reserved.
        </Typography>
      </Container>
    </Flex>
  );
};

export default Footer;
