import {
  useTheme,
  Link,
  Button,
  Loading,
  Typography,
  Grid,
  Flex,
  Container,
  Spacing,
} from "@wipsie/ui";
import DefaultLayout from "../components/DefaultLayout";
import NextLink from "next/link";
import { isProd } from "../config";
import { useSelector, useDispatch } from "react-redux";
import { buyCake } from "../redux/slices/cake";
import { fetchUsers } from "../redux/slices/user";
import { fetchPosts } from "../redux/slices/blog";
import { useEffect, useState } from "react";

type ColorThemes =
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "primary"
  | "secondary"
  | "basic";

interface StartFlowNode {
  id: string;
  type: "start";
  label: string;
  description?: string;
  connectedTo: string; // id of the node this node is connected to
  nextLabel?: string;
  color?: ColorThemes;
}

interface EndFlowNode {
  id: string;
  type: "end";
  label: string;
  description?: string;
  color?: ColorThemes;
}

interface IfFlowNode {
  id: string;
  type: "if";
  label: string;
  description?: string;
  connectedTo: [string, string]; // ids of the nodes, yes, no
  yesLabel?: string;
  noLabel?: string;
  yesColor?: ColorThemes;
  noColor?: ColorThemes;
}

interface ActionFlowNode {
  id: string;
  type: "action";
  label: string;
  description?: string;
  connectedTo?: string; // id of the node this node is connected to
  nextLabel?: string;
  color?: ColorThemes;
}

type FlowNode = StartFlowNode | EndFlowNode | IfFlowNode | ActionFlowNode;

const flowchartTemplate: FlowNode[] = [
  {
    id: "1",
    type: "start",
    label: "Should You Buy It?",
    description:
      "Follow the steps below to know if you should buy what you are looking at.",
    nextLabel: "Let's start",
    connectedTo: "2",
  },
  {
    id: "2",
    type: "if",
    label: "Do you need it?",
    description: "I mean, do you REALLY need it?",
    connectedTo: ["3", "4"],
  },
  {
    id: "3",
    type: "if",
    label: "Can you afford it?",
    description:
      "Is this something you have money for, and will not bring you financial problems?",
    connectedTo: ["5", "6"],
  },
  {
    id: "4",
    type: "action",
    label: "Your wants are not needs",
    description:
      "You are not buying this. You should not spend your money on this now.",
    connectedTo: "end-dont-buy",
  },
  {
    id: "5",
    type: "if",
    label: "Have vou looked at alternatives?",
    description:
      "Have you looked at alternatives to this, and found other that you might like?",
    connectedTo: ["7", "8"],
  },
  {
    id: "6",
    type: "action",
    label: "Credit does not count",
    description: "If you don't have the money to buy, you should not buy it.",
    connectedTo: "end-dont-buy",
  },
  {
    id: "7",
    type: "if",
    label: "...and this was the best deal?",
    description: "Maybe look for other brands, or try a different product?",
    connectedTo: ["9", "10"],
  },
  {
    id: "8",
    type: "action",
    label: "Do your research. Come back when done.",
    description: "You should look at other brands, or try a different product.",
    connectedTo: "end-dont-buy",
  },
  {
    id: "9",
    type: "if",
    label: "Is it high quality?",
    description:
      "Is this durable, and does it look good? Is it the best quality you can find?",
    connectedTo: ["end-buy", "11"],
  },
  {
    id: "10",
    type: "action",
    label: "Consider your alternatives. Come back when done.",
    description: "You should look at other brands, or try a different product.",
    connectedTo: "end-dont-buy",
  },
  {
    id: "11",
    type: "if",
    label: "Does high quality matter?",
    description:
      "Will you be able to use this product? Will quality affect your life?",
    connectedTo: ["end-dont-buy", "end-buy"],
  },
  {
    id: "end-dont-buy",
    type: "end",
    label: "DON'T BUY IT",
    description: "All signs points to no, you should not buy this.",
    color: "danger",
  },
  {
    id: "end-buy",
    type: "end",
    label: "BUY IT",
    description: "Decisions point to yes, make sense to buy this.",
    color: "success",
  },
];

export default function Home(props) {
  const theme = useTheme();

  const [flowData, setFlowData] = useState<FlowNode[]>(flowchartTemplate);
  const [currentNode, setCurrentNode] = useState<FlowNode>(flowData[0]);

  const getFlowNodeById = (id: string) => {
    return flowData.find((node) => node.id === id);
  };

  const restartFlow = () => {
    setCurrentNode(flowData[0]);
  };

  return (
    <DefaultLayout meta={{}}>
      {/* draw the flowchart */}
      <Flex fullWidth direction="column" align="center" justify="center">
        <Container fullWidth maxWidth="500px" align="center" display="flex">
          {currentNode && currentNode.type === "start" && (
            <>
              <Typography
                variant="h1"
                align="center"
                color={currentNode.color || "text"}
              >
                {currentNode.label}
              </Typography>
              {currentNode.description && (
                <>
                  <Spacing height={1} />
                  <Typography variant="body1" align="center">
                    {currentNode.description}
                  </Typography>
                </>
              )}
              <Spacing height={3} />
              <Button
                size="small"
                backgroundColor={currentNode.color || "primary"}
                onClick={() => {
                  setCurrentNode(getFlowNodeById(currentNode.connectedTo));
                }}
              >
                {currentNode.nextLabel || "Next"}
              </Button>
            </>
          )}

          {currentNode && currentNode.type === "if" && (
            <>
              <Typography variant="h1" align="center">
                {currentNode.label}
              </Typography>
              {currentNode.description && (
                <>
                  <Spacing height={1} />
                  <Typography variant="body1" align="center">
                    {currentNode.description}
                  </Typography>
                </>
              )}
              <Spacing height={3} />
              <Grid container>
                <Grid item xs={6}>
                  <Button
                    size="small"
                    backgroundColor={currentNode.noColor || "danger"}
                    fullWidth
                    onClick={() => {
                      setCurrentNode(
                        getFlowNodeById(currentNode.connectedTo[1])
                      );
                    }}
                  >
                    {currentNode.noLabel || "No"}
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    size="small"
                    fullWidth
                    backgroundColor={currentNode.yesColor || "success"}
                    onClick={() => {
                      setCurrentNode(
                        getFlowNodeById(currentNode.connectedTo[0])
                      );
                    }}
                  >
                    {currentNode.yesLabel || "Yes"}
                  </Button>
                </Grid>
              </Grid>
            </>
          )}

          {currentNode && currentNode.type === "action" && (
            <>
              <Typography
                variant="h1"
                color={currentNode.color || "text"}
                align="center"
              >
                {currentNode.label}
              </Typography>
              {currentNode.description && (
                <>
                  <Spacing height={2} />
                  <Typography variant="body1" align="center">
                    {currentNode.description}
                  </Typography>
                </>
              )}

              <Spacing height={2} />

              {currentNode?.connectedTo && (
                <Button
                  size="small"
                  backgroundColor={currentNode.color || "primary"}
                  onClick={() => {
                    setCurrentNode(getFlowNodeById(currentNode.connectedTo));
                  }}
                >
                  {currentNode.nextLabel || "Next"}
                </Button>
              )}
              {!currentNode?.connectedTo && (
                <Button
                  size="small"
                  backgroundColor={currentNode.color || "primary"}
                  onClick={restartFlow}
                >
                  Restart
                </Button>
              )}
            </>
          )}

          {currentNode && currentNode.type === "end" && (
            <>
              <Typography variant="h1" color={currentNode.color || "text"}>
                {currentNode.label}
              </Typography>
              {currentNode.description && (
                <>
                  <Spacing height={1} />
                  <Typography variant="body1" align="center">
                    {currentNode.description}
                  </Typography>
                </>
              )}
              <Spacing height={3} />
              <Button
                size="small"
                backgroundColor={currentNode.color || "primary"}
                onClick={restartFlow}
              >
                Restart
              </Button>
            </>
          )}
        </Container>
      </Flex>
    </DefaultLayout>
  );
}

const StartNode = ({
  node,
  flowData,
}: {
  node: StartFlowNode;
  flowData: FlowNode[];
}) => {
  return (
    <Button
      id={node?.id}
      chip
      label={node?.label}
      backgroundColor="info"
      variant="outlined"
    ></Button>
  );
};

const EndNode = ({
  node,
  flowData,
}: {
  node: EndFlowNode;
  flowData: FlowNode[];
}) => {
  return (
    <Button
      id={node?.id}
      chip
      label={node?.label}
      backgroundColor="info"
      variant="outlined"
    ></Button>
  );
};

const IfNode = ({
  node,
  flowData,
}: {
  node: IfFlowNode;
  flowData: FlowNode[];
}) => {
  return (
    <Button
      id={node?.id}
      chip
      label={node?.label}
      backgroundColor="primary"
    ></Button>
  );
};

const ActionNode = ({
  node,
  flowData,
}: {
  node: ActionFlowNode;
  flowData: FlowNode[];
}) => {
  return (
    <Button
      id={node?.id}
      chip
      label={node?.label}
      backgroundColor="basic"
    ></Button>
  );
};

const getConnectedNode = (nodeId: string) => {
  const connectedNode = document.getElementById(nodeId);

  return connectedNode;
};
