import { Handle, Position } from "@xyflow/react";
import { twMerge } from "tailwind-merge";
import { CustomNodeProps } from "../types";

export const ConditionNode = ({
  id,
  data,
  isConnectable,
  className,
  showHandles = true,
}: CustomNodeProps) => {
  return (
    <div
      id={`node-${id}`}
      className={twMerge(
        "border rounded px-2 py-1 text-sm w-32 hover:shadow-lg bg-purple-500 focus-visible:border-primary",
        className
      )}
    >
      {data.label}
      {showHandles && (
        <>
          <Handle
            type="target"
            position={Position.Top}
            isConnectable={isConnectable}
          />
          <Handle
            type="source"
            position={Position.Bottom}
            id="yes"
            style={{ left: "25%" }}
            isConnectable={isConnectable}
          />
          <Handle
            type="source"
            position={Position.Bottom}
            id="no"
            style={{ left: "75%" }}
            isConnectable={isConnectable}
          />
        </>
      )}
    </div>
  );
};
