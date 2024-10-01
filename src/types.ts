import { Node } from "@xyflow/react";

export type NodeData = {
  label: string;
  [key: string]: unknown;
};

export interface CustomNodeProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  data: NodeData;
  isConnectable: boolean;
  showHandles?: boolean;
}

export type TNodeType = "start" | "end" | "validate";

export type TNode = Node & {
  type: TNodeType;
};
