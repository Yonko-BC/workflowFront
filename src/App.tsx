import { useCallback } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant as C,
  useReactFlow,
  NodeChange,
  EdgeChange,
  Connection,
} from "@xyflow/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store/store";
import {
  updateNodes,
  updateEdges,
  addNode,
  addEdge,
} from "./store/workflowSlice";

import { ValidateNode } from "./components/ValidateNode";
import { EndNode } from "./components/EndNode";
import { StartNode } from "./components/StartNode";
import { ApprovalNode } from "./components/ApprovalNode";
import { NotificationNode } from "./components/NotificationNode";
import { ConditionNode } from "./components/ConditionNode";
import { DocumentGenerationNode } from "./components/DocumentGenerationNode";

import { TNodeType } from "./types";

const nodeTypes = {
  start: StartNode,
  end: EndNode,
  validate: ValidateNode,
  approval: ApprovalNode,
  notification: NotificationNode,
  condition: ConditionNode,
  documentGeneration: DocumentGenerationNode,
} as const;

export default function App() {
  const dispatch = useDispatch();
  const { nodes, edges } = useSelector((state: RootState) => state.workflow);
  const { screenToFlowPosition } = useReactFlow();

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      dispatch(updateNodes(changes));
    },
    [dispatch]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      dispatch(updateEdges(changes));
    },
    [dispatch]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      dispatch(addEdge(connection));
    },
    [dispatch]
  );

  const handleDragStart = useCallback(
    (key: TNodeType) => (e: React.DragEvent) => {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("application/reactflow", key);
    },
    []
  );

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow") as
        | TNodeType
        | "";
      if (!type) return;
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: `${nodes.length + 1}`,
        type,
        position: {
          x: position.x - 64,
          y: position.y - 16,
        },
        data: { label: `${type} Node` },
      };

      dispatch(addNode(newNode));
    },
    [nodes.length, screenToFlowPosition, dispatch]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div className="absolute top-4 left-4 bottom-4 border bg-card z-10 p-6 rounded w-64 flex flex-col gap-4">
        {Object.keys(nodeTypes).map((key) => (
          <button
            key={key}
            onDragStart={handleDragStart(key as TNodeType)}
            draggable
          >
            <div>{key}</div>
          </button>
        ))}
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        maxZoom={2}
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = "move";
        }}
        onDrop={handleDrop}
      >
        <Controls />
        <MiniMap />
        <Background variant={C.Dots} gap={20} size={2} />
      </ReactFlow>
    </div>
  );
}
