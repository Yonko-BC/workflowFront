import { useCallback, useEffect, useRef, useState } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant as C,
  Edge,
  Node,
  OnConnect,
  Handle,
  Position,
  useReactFlow,
} from "@xyflow/react";
import { twMerge } from "tailwind-merge";

type NodeData = {
  label: string;
  [key: string]: any;
};

interface CustomNodeProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  data: NodeData;
  isConnectable: boolean;
  showHandles?: boolean;
}

const ValidateNode = ({
  id,
  data,
  isConnectable,
  className,
  showHandles = true,
  ...props
}: CustomNodeProps) => {
  return (
    <>
      <div
        id={"node-" + id}
        className={twMerge(
          "border rounded px-2 py-1 text-sm w-32 hover:shadow-lg bg-green-500 focus-visible:border-primary",
          className
        )}
        {...props}
      >
        {data.label}
      </div>
      {showHandles && (
        <>
          <Handle
            type="source"
            position={Position.Bottom}
            isConnectable={isConnectable}
            // id="a"
          />
          <Handle
            type="target"
            isConnectable={isConnectable}
            position={Position.Top}
          />
        </>
      )}
    </>
  );
};
const EndNode = ({
  id,
  data,
  isConnectable,
  className,
  showHandles = true,
  ...props
}: CustomNodeProps) => {
  return (
    <div
      id={"node-" + id}
      className={twMerge(
        "border rounded px-2 py-1 text-sm w-32 hover:shadow-lg bg-gray-500 focus-visible:border-primary",
        className
      )}
      {...props}
    >
      {showHandles && (
        <>
          {/* <Handle
            type="source"
            position={Position.Bottom}
            isConnectable={isConnectable}
            id="a"
          /> */}
          <Handle
            type="target"
            isConnectable={isConnectable}
            position={Position.Top}
          />
        </>
      )}
      {data.label}
    </div>
  );
};
const StartNode = ({
  id,
  data,
  isConnectable,
  className,
  showHandles = true,
  ...props
}: CustomNodeProps) => {
  return (
    <div
      id={"node-" + id}
      className={twMerge(
        "border rounded px-2 py-1 text-sm w-32 hover:shadow-lg  bg-red-500 focus-visible:border-primary",
        className
      )}
      // {...props}
    >
      {showHandles && (
        <>
          <Handle
            type="source"
            position={Position.Bottom}
            isConnectable={isConnectable}
            id="a"
          />
          {/* <Handle
            type="target"
            isConnectable={isConnectable}
            position={Position.Top}
          /> */}
        </>
      )}
      {data.label}
    </div>
  );
};

const nodeTypes = {
  start: StartNode,
  end: EndNode,
  validate: ValidateNode,
} as const;

type TNodeType = keyof typeof nodeTypes;
type TNode = Node & {
  type: TNodeType;
};

const initialNodes: TNode[] = [
  // {
  //   id: "1",
  //   type: "start",
  //   position: { x: 0, y: 0 },
  //   data: { label: "node 1" },
  // },
  // {
  //   id: "2",
  //   position: { x: -100, y: 100 },
  //   type: "validate",
  //   data: { label: "node 2" },
  // },
  // {
  //   id: "3",
  //   position: { x: 100, y: 100 },
  //   type: "validate",
  //   data: { label: "node 3" },
  // },
  // {
  //   id: "4",
  //   position: { x: 0, y: 200 },
  //   type: "end",
  //   data: { label: "node 4" },
  // },
];
const initialEdges: Edge[] = [
  // {
  //   id: "e1-2",
  //   source: "1",
  //   target: "3",
  //   type: "boolean",
  //   label: "false",
  //   animated: true,
  // },
  // { id: "e1-1", source: "1", target: "2", label: "true", animated: true },
  // { id: "e1-3", source: "2", target: "4", label: "true", animated: true },
  // { id: "e1-4", source: "3", target: "4", label: "true", animated: true },
];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [dragType, setDragType] = useState<TNodeType | null>(null);
  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback<OnConnect>(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  useEffect(() => {}, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div className="absolute top-4 left-4 bottom-4 border bg-card z-10 p-6 rounded w-64 flex flex-col gap-4">
        {Object.entries(nodeTypes).map(([key, Component]) => (
          <button
            onDragStart={(e) => {
              setDragType(key as TNodeType);
              e.dataTransfer.effectAllowed = "move";
              e.dataTransfer.setData("application/reactflow", key);
            }}
            draggable
            key={key}
          >
            <div>
              {/* <Component
                id="1"
                data={{ label: key }}
                isConnectable={false}
                showHandles={false}
                className="w-full"
              /> */}
              {key}
            </div>
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
        onDrop={(event) => {
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
        }}
      >
        <Controls />
        <MiniMap />
        <Background variant={C.Dots} gap={20} size={2} />
      </ReactFlow>
    </div>
  );
}
