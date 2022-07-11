import Router from "next/router";
import NProgress from "nprogress";

export default function () {
  Router.events.on("routeChangeStart", NProgress.start);
  Router.events.on("routeChangeError", NProgress.done);
  Router.events.on("routeChangeComplete", NProgress.done);

  return null;
}
