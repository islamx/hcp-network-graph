"use client";
import dynamic from "next/dynamic";
import { mockData } from "../data/mockGhraph";
import React, { useState, useRef } from "react";
import SearchInput from "./shared/SearchInput";
import GraphView from "./shared/GraphView";
import DoctorSidebar from "./shared/DoctorSidebar";
import SidebarNav from "./shared/SidebarNav";

// Dynamically import ForceGraph2D from the dedicated 2D package
const ForceGraph2D = dynamic(
  () => import("react-force-graph-2d"),
  { ssr: false }
);

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [centerNodeId, setCenterNodeId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [selectedNode, setSelectedNode] = useState<any | null>(null);
  const [hoveredNode, setHoveredNode] = useState<any | null>(null);
  const [hoveredLink, setHoveredLink] = useState<any | null>(null);
  const graphViewRef = useRef<any>(null);

  const handleSearch = () => {
    // Normalize: remove 'dr.', trim, lowercase, and allow partial match
    const normalize = (str: string) =>
      str.replace(/dr\.?/i, "").replace(/\s+/g, " ").trim().toLowerCase();
    const searchNorm = normalize(searchValue);
    const foundNode = mockData.nodes.find(
      (node) => normalize(node.name).includes(searchNorm)
    );
    if (foundNode) {
      setCenterNodeId(foundNode.id);
      setError("");
      setTimeout(() => {
        graphViewRef.current?.centerAndZoomOnNode(foundNode.id);
      }, 100);
    } else {
      setError("Doctor not found!");
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (error) setError("");
  };

  // Sidebar logic: show clicked node if set, otherwise show hovered node
  const sidebarNode = selectedNode ? selectedNode : hoveredNode;

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden w-full max-w-full h-screen flex flex-col">
      {/* Top Bar */}
      <div className="w-full px-8 py-4 bg-white shadow sticky top-0 z-20 flex justify-center">
        <div className="w-full max-w-2xl mx-auto flex items-center gap-3">
          <SearchInput
            value={searchValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            onSearch={handleSearch}
            placeholder="Search doctor by name..."
          />
        </div>
      </div>
      {/* Error message under search */}
      {error && (
        <div className="text-red-600 text-center font-medium animate-pulse mt-2">{error}</div>
      )}
      {/* Main Content */}
      <div className="flex-1 w-full mx-auto flex flex-row gap-8 overflow-x-hidden max-w-full min-h-0 py-4">
        {/* Sidebar Navigation */}
        <div className="hidden lg:block">
          <SidebarNav />
        </div>
        {/* Sidebar */}
        <div className="flex-shrink-0 w-full max-w-full lg:w-[360px] mb-6 lg:mb-0 overflow-y-auto h-full min-h-0 min-w-0">
          <DoctorSidebar selectedNode={selectedNode ? selectedNode : hoveredNode} />
        </div>
        {/* Graph Area */}
        <div className="flex-1 bg-white rounded-2xl shadow flex items-center justify-center max-w-full w-full overflow-y-auto h-full min-h-0 min-w-0 mr-4">
          <GraphView
            ref={graphViewRef}
            graphData={mockData}
            centerNodeId={centerNodeId}
            onNodeClick={node => setSelectedNode(node)}
            onNodeHover={node => {
              if (!selectedNode) setHoveredNode(node);
              if (selectedNode && node === null) setHoveredNode(null);
            }}
            onLinkHover={setHoveredLink}
          />
          {hoveredLink && (
            <div className="absolute left-1/2 top-4 transform -translate-x-1/2 bg-black text-white text-xs rounded px-3 py-1 shadow-lg z-50 pointer-events-none animate-fade-in">
              {hoveredLink.relation}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
