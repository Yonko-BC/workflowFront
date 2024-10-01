import { Handle, Position } from "@xyflow/react";
import { twMerge } from "tailwind-merge";
import { CustomNodeProps } from "../types";

export const ValidateNode = ({
  id,
  data,
  isConnectable,
  className,
  showHandles = true,
}: CustomNodeProps) => {
  return (
    <>
      <div
        id={`node-${id}`}
        className={twMerge(
          "border rounded px-2 py-1 text-sm w-32 hover:shadow-lg bg-green-500 focus-visible:border-primary",
          className
        )}
      >
        {data.label}
      </div>
      {showHandles && (
        <>
          <Handle
            type="source"
            position={Position.Bottom}
            isConnectable={isConnectable}
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
