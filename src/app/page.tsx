"use client";
import { mockData } from "../data/mockGhraph";
import React, { useState, useRef } from "react";
import GraphView from "./shared/GraphView";
import DoctorSidebar from "./shared/DoctorSidebar";
import SidebarNav from "./shared/SidebarNav";
import EdgeTooltip from "./shared/EdgeTooltip";
import EdgeDetailsModal from "./shared/EdgeDetailsModal";
import Topbar from "./shared/Topbar";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [centerNodeId, setCenterNodeId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [selectedNode, setSelectedNode] = useState<any | null>(null);
  const [hoveredNode, setHoveredNode] = useState<any | null>(null);
  const [hoveredLink, setHoveredLink] = useState<any | null>(null);
  const [selectedLink, setSelectedLink] = useState<any | null>(null);
  const graphViewRef = useRef<any>(null);
  const [showConnections, setShowConnections] = useState(true);
  const [showMyConnections, setShowMyConnections] = useState(false);

  // Helper: get node by id
  const getNodeById = (id: string) => mockData.nodes.find(n => n.id === id) || null;

  // Helper: get shared publications between two doctors
  const getSharedPublications = (sourceId: string, targetId: string) => {
    return mockData.nodes.filter(n => n.type === 'publication' && n.authors && n.authors.includes(sourceId) && n.authors.includes(targetId));
  };

  // Helper: get work overlap (if any)
  const getWorkDetails = (source: any, target: any) => {
    if (source && target && source.work && target.work && source.work === target.work) {
      return source.work;
    }
    return null;
  };

  // Enhanced hover handler
  const handleLinkHover = (link: any | null) => {
    if (!link) {
      setHoveredLink(null);
      return;
    }
    const source = typeof link.source === 'object' ? link.source : getNodeById(link.source);
    const target = typeof link.target === 'object' ? link.target : getNodeById(link.target);
    const sharedPubs = (source && target && source.type === 'doctor' && target.type === 'doctor') ? getSharedPublications(source.id, target.id) : [];
    const workDetails = (source && target && source.type === 'doctor' && target.type === 'doctor') ? getWorkDetails(source, target) : null;
    setHoveredLink({ ...link, source, target, sharedPubs, workDetails });
  };

  // Enhanced click handler
  const handleLinkClick = (link: any | null) => {
    if (!link) {
      setSelectedLink(null);
      return;
    }
    const source = typeof link.source === 'object' ? link.source : getNodeById(link.source);
    const target = typeof link.target === 'object' ? link.target : getNodeById(link.target);
    const sharedPubs = (source && target && source.type === 'doctor' && target.type === 'doctor') ? getSharedPublications(source.id, target.id) : [];
    const workDetails = (source && target && source.type === 'doctor' && target.type === 'doctor') ? getWorkDetails(source, target) : null;
    setSelectedLink({ ...link, source, target, sharedPubs, workDetails });
  };

  // Enhanced node click handler
  const handleNodeClick = (node: any) => {
    console.log('Node clicked:', node);
    setSelectedNode(node);
    setHoveredNode(null); // Clear hover when clicking
    
    // Add visual feedback
    if (node && node.id) {
      // Flash the node briefly
      setTimeout(() => {
        // This will trigger a re-render with the selected node highlighted
      }, 100);
    }
  };

  // Enhanced node hover handler
  const handleNodeHover = (node: any | null) => {
    if (!selectedNode) {
      setHoveredNode(node);
    }
    if (selectedNode && node === null) {
      setHoveredNode(null);
    }
  };

  const handleSearch = () => {
    // Normalize: remove 'dr.', trim, lowercase, and allow partial match
    const normalize = (str: string) =>
      str.replace(/dr\.?/i, "").replace(/\s+/g, " ").trim().toLowerCase();
    const searchNorm = normalize(searchValue);
    const foundNode = mockData.nodes.find(
      (node) => normalize(node.name).includes(searchNorm)
    );
    if (foundNode && foundNode.id) {
      setCenterNodeId(foundNode.id);
      setError("");
      setTimeout(() => {
        graphViewRef.current?.centerAndZoomOnNode(foundNode.id!);
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

  const handleInputChange = (value: string) => {
    setSearchValue(value);
    if (error) setError("");
  };

  // Sidebar logic: show clicked node if set, otherwise show hovered node
  const sidebarNode = selectedNode ? selectedNode : hoveredNode;

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden w-full h-screen flex flex-col">
      {/* Topbar always at the top */}
      <Topbar 
        searchValue={searchValue}
        onSearchChange={handleInputChange}
        onSearch={handleSearch}
        onSearchKeyDown={handleInputKeyDown}
        error={error}
        showConnections={showConnections}
        setShowConnections={setShowConnections}
        showMyConnections={showMyConnections}
        setShowMyConnections={setShowMyConnections}
      />
      {/* Sidebar Navigation (fixed, only on large screens) */}
      <div className="hidden lg:block">
        <SidebarNav />
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-x-hidden min-h-0 py-4 ml-0 lg:ml-20">
        {/* Sidebar */}
        <div className="flex-shrink-0 w-full max-w-full lg:w-[360px] mb-6 lg:mb-0 overflow-y-auto h-full min-h-0 min-w-0 lg:mr-8 lg:ml-8">
          <DoctorSidebar selectedNode={selectedNode ? selectedNode : hoveredNode} />
        </div>
        {/* Graph Area */}
        <div className="flex-1 bg-white rounded-none lg:rounded-2xl shadow flex flex-col w-full overflow-y-auto h-[300px] sm:h-full min-h-[300px] min-h-0 min-w-0 relative mr-0 lg:mr-8">
          {/* Graph itself */}
          <div className="flex-1 relative min-h-0">
            <GraphView
              ref={graphViewRef}
              graphData={mockData}
              centerNodeId={centerNodeId}
              selectedNode={selectedNode}
              onNodeClick={handleNodeClick}
              onNodeHover={handleNodeHover}
              onLinkHover={handleLinkHover}
              showConnections={showConnections}
              showMyConnections={showMyConnections}
            />
            {hoveredLink && (
              <div className="absolute left-1/2 top-4 transform -translate-x-1/2 z-50 pointer-events-none animate-fade-in">
                <EdgeTooltip link={hoveredLink} />
              </div>
            )}
            {/* Modal for link details */}
            {selectedLink && (
              <EdgeDetailsModal link={selectedLink} onClose={() => setSelectedLink(null)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
