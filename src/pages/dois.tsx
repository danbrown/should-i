/* eslint-disable react/display-name */
import { useTheme, Link } from "@wipsie/ui";
import DefaultLayout from "../components/DefaultLayout";
import NextLink from "next/link";
import { isProd } from "../config";

export default function Home({ currentTheme, setCurrentTheme }: any) {
  const theme = useTheme();

  return (
    <DefaultLayout
      meta={{}}
      currentTheme={currentTheme}
      setCurrentTheme={setCurrentTheme}
    >
      <NextLink href="/">
        <Link>Um</Link>
      </NextLink>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
      consequuntur reprehenderit, exercitationem quia reiciendis earum deleniti
      assumenda nemo laboriosam eligendi!
    </DefaultLayout>
  );
}
