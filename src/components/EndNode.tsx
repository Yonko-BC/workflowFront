import { Handle, Position } from "@xyflow/react";
import { twMerge } from "tailwind-merge";
import { CustomNodeProps } from "../types";

export const EndNode = ({
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
        "border rounded px-2 py-1 text-sm w-32 hover:shadow-lg bg-gray-500 focus-visible:border-primary",
        className
      )}
    >
      {data.label}
      {showHandles && (
        <Handle
          type="target"
          isConnectable={isConnectable}
          position={Position.Top}
        />
      )}
    </div>
  );
};
