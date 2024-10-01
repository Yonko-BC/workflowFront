import { useCallback, useState } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant as C,
  OnConnect,
  useReactFlow,
} from "@xyflow/react";

import { ValidateNode } from "./components/ValidateNode";
import { EndNode } from "./components/EndNode";
import { StartNode } from "./components/StartNode";

import { TNodeType } from "./types";

import { initialNodes, initialEdges } from "./initialData";

const nodeTypes = {
  start: StartNode,
  end: EndNode,
  validate: ValidateNode,
} as const;

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [dragType, setDragType] = useState<TNodeType | null>(null);
  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback<OnConnect>(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleDragStart = useCallback(
    (key: TNodeType) => (e: React.DragEvent) => {
      setDragType(key);
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

      setNodes((prevNodes) => [...prevNodes, newNode]);
    },
    [nodes.length, screenToFlowPosition, setNodes]
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
        <div className="mt-4 pt-4 border-t">{dragType}</div>
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
