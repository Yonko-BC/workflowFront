import { Handle, Position } from "@xyflow/react";
import { twMerge } from "tailwind-merge";
import { CustomNodeProps } from "../types";

export const NotificationNode = ({
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
        "border rounded px-2 py-1 text-sm w-32 hover:shadow-lg bg-yellow-500 focus-visible:border-primary",
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
            isConnectable={isConnectable}
          />
        </>
      )}
    </div>
  );
};
