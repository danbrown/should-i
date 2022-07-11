import { FileText } from "react-feather";
import { FileImageFilled, CaretRightOutlined } from "@ant-design/icons";

type RouteConfig = {
  label: string;
  icon?: any;
  path: string;
  subitems?: RouteConfig[];
};

const routes: RouteConfig[] = [
  {
    label: "Guide",
    icon: <FileImageFilled />,
    path: "/getting-started",
    subitems: [
      {
        label: "Getting Started",
        icon: <CaretRightOutlined />,
        path: "/getting-started",
      },
      {
        label: "Introduction",
        icon: <CaretRightOutlined />,
        path: "/introduction",
      },
      {
        label: "Introduction",
        icon: <CaretRightOutlined />,
        path: "/introduction",
      },
      {
        label: "Introduction",
        icon: <CaretRightOutlined />,
        path: "/introduction",
      },
    ],
  },
  {
    label: "Components",
    icon: <FileImageFilled />,
    path: "/",
    subitems: [
      {
        label: "Button",
        icon: <FileImageFilled />,
        path: "/components/button",
      },
    ],
  },
  {
    label: "Getting Started",
    icon: <FileImageFilled />,
    path: "/getting-started",
    subitems: [
      {
        label: "Introduction",
        icon: <FileImageFilled />,
        path: "/introduction",
      },
    ],
  },
];

export default routes;
