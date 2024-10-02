import { Edge } from "@xyflow/react";
import { TNode } from "./types";

export const initialNodes: TNode[] = [
  {
    id: "1",
    type: "start",
    position: { x: 250, y: 0 },
    data: { label: "Start" },
  },
  {
    id: "2",
    type: "approval",
    position: { x: 250, y: 100 },
    data: { label: "Manager Approval" },
  },
  {
    id: "3",
    type: "condition",
    position: { x: 250, y: 200 },
    data: { label: "Check Leave Balance" },
  },
  {
    id: "4",
    type: "notification",
    position: { x: 100, y: 300 },
    data: { label: "Reject Notification" },
  },
  {
    id: "5",
    type: "documentGeneration",
    position: { x: 400, y: 300 },
    data: { label: "Generate Leave Document" },
  },
  {
    id: "6",
    type: "end",
    position: { x: 250, y: 400 },
    data: { label: "End" },
  },
];

export const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-4", source: "3", target: "4", sourceHandle: "no" },
  { id: "e3-5", source: "3", target: "5", sourceHandle: "yes" },
  { id: "e4-6", source: "4", target: "6" },
  { id: "e5-6", source: "5", target: "6" },
];
