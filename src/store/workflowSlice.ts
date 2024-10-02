import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Edge,
  Connection,
  NodeChange,
  EdgeChange,
  applyNodeChanges,
  applyEdgeChanges,
} from "@xyflow/react";
import { TNode } from "../types";
import { initialNodes, initialEdges } from "../initialData";

export interface WorkflowState {
  nodes: TNode[];
  edges: Edge[];
}

const initialState: WorkflowState = {
  nodes: initialNodes,
  edges: initialEdges,
};

const workflowSlice = createSlice({
  name: "workflow",
  initialState,
  reducers: {
    updateNodes: (state, action: PayloadAction<NodeChange[]>) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes) as TNode[];
    },
    updateEdges: (state, action: PayloadAction<EdgeChange[]>) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    addNode: (state, action: PayloadAction<TNode>) => {
      state.nodes.push(action.payload);
    },
    updateNode: (
      state,
      action: PayloadAction<{ id: string; data: Partial<TNode> }>
    ) => {
      const index = state.nodes.findIndex(
        (node) => node.id === action.payload.id
      );
      if (index !== -1) {
        state.nodes[index] = { ...state.nodes[index], ...action.payload.data };
      }
    },
    removeNode: (state, action: PayloadAction<string>) => {
      state.nodes = state.nodes.filter((node) => node.id !== action.payload);
      state.edges = state.edges.filter(
        (edge) =>
          edge.source !== action.payload && edge.target !== action.payload
      );
    },
    addEdge: (state, action: PayloadAction<Connection>) => {
      const newEdge: Edge = {
        ...action.payload,
        id: `e${state.edges.length + 1}`,
      };
      state.edges.push(newEdge);
    },
    removeEdge: (state, action: PayloadAction<string>) => {
      state.edges = state.edges.filter((edge) => edge.id !== action.payload);
    },
  },
});

export const {
  updateNodes,
  updateEdges,
  addNode,
  updateNode,
  removeNode,
  addEdge,
  removeEdge,
} = workflowSlice.actions;

export default workflowSlice.reducer;
