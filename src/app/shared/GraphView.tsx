import dynamic from "next/dynamic";
import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from "react";
import type { ForceGraphMethods } from "react-force-graph-2d";
import { drawGraphNode } from './GraphNodeCanvas';
import { drawGraphLink } from './GraphLinkCanvas';
import GraphZoomControls from './GraphZoomControls';

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), { ssr: false });

// Avatar cache to prevent flickering
const avatarCache = new Map<string, HTMLImageElement>();

interface GraphViewProps {
  graphData: { nodes: { [key: string]: unknown }[]; links: { [key: string]: unknown }[] };
  centerNodeId: string | null;
  onNodeClick: (node: { [key: string]: unknown }) => void;
  onNodeHover: (node: { [key: string]: unknown } | null) => void;
  onLinkHover?: (link: { [key: string]: unknown } | null) => void;
  showConnections: boolean;
  showMyConnections: boolean;
  repulsion: number;
}

export interface GraphViewRef {
  centerAndZoomOnNode: (nodeId: string) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  fitToView: () => void;
}

const GraphView = forwardRef<GraphViewRef, GraphViewProps>(({ graphData, centerNodeId, onNodeClick, onNodeHover, onLinkHover, showConnections, showMyConnections, repulsion }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 300, height: 300 });
  const fgRef = useRef<ForceGraphMethods | null>(null);

  useImperativeHandle(ref, () => ({
    centerAndZoomOnNode: (nodeId: string) => {
      if (!fgRef.current) return;
      const node = graphData.nodes.find((n: { [key: string]: unknown }) => n.id === nodeId);
      if (node && typeof node.x === 'number' && typeof node.y === 'number') {
        fgRef.current.centerAt(node.x, node.y, 1000);
        fgRef.current.zoom(3, 1000);
      }
    },
    zoomIn: () => {
      if (fgRef.current) {
        const z = fgRef.current.zoom();
        fgRef.current.zoom((typeof z === 'number' ? z : 1) * 1.2, 400);
      }
    },
    zoomOut: () => {
      if (fgRef.current) {
        const z = fgRef.current.zoom();
        fgRef.current.zoom((typeof z === 'number' ? z : 1) / 1.2, 400);
      }
    },
    fitToView: () => {
      if (fgRef.current) {
        fgRef.current.zoomToFit(400, 40);
      }
    },
  }));

  // Node border color by type
  const getNodeBorderColor = (node: { [key: string]: unknown }) => {
    if (node.id === centerNodeId) return "#dc2626"; // red-600 for searched node
    if (node.type === "doctor") return "#3b82f6"; // blue-500
    if (node.type === "publication") return "#a78bfa"; // purple-400
    if (node.type === "publisher") return "#94a3b8"; // slate-400
    return "#e5e7eb";
  };

  // Node background color by type
  const getNodeBackgroundColor = (node: { [key: string]: unknown }) => {
    if (node.id === centerNodeId) return "#fef2f2"; // red-50 for searched node
    if (node.type === "doctor") return "#eff6ff"; // blue-50
    if (node.type === "publication") return "#faf5ff"; // purple-50
    if (node.type === "publisher") return "#f8fafc"; // slate-50
    return "#ffffff";
  };

  // Node avatar or icon with caching to prevent flickering
  const drawNodeAvatar = (node: { [key: string]: unknown }, ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
    if (node.type === "doctor") {
      const nodeId = node.id as string;
      const cacheKey = `doctor-${nodeId}`;
      
      if (avatarCache.has(cacheKey)) {
        // Use cached image
        const cachedImg = avatarCache.get(cacheKey)!;
        if (cachedImg.complete) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(x, y, r, 0, 2 * Math.PI);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(cachedImg, x - r, y - r, r * 2, r * 2);
          ctx.restore();
        }
      } else {
        // Load and cache new image
        const img = new window.Image();
        img.src = `https://i.pravatar.cc/60?u=doctor-${nodeId}`;
        img.onload = () => {
          avatarCache.set(cacheKey, img);
          // The image will be drawn on next render cycle
        };
        // fallback circle while loading
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fillStyle = "#dbeafe";
        ctx.fill();
        ctx.restore();
      }
    } else if (node.type === "publication") {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fillStyle = "#ede9fe";
      ctx.fill();
      ctx.font = `${r}px Sans-Serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#a78bfa";
      ctx.fillText("📄", x, y);
      ctx.restore();
    } else if (node.type === "publisher") {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fillStyle = "#f1f5f9";
      ctx.fill();
      ctx.font = `${r}px Sans-Serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#64748b";
      ctx.fillText("🏢", x, y);
      ctx.restore();
    }
  };

  // Node label
  const getNodeLabel = (node: { [key: string]: unknown }): string => {
    if (node.type === "doctor" && typeof node.name === 'string') return node.name;
    if (node.type === "publication" && typeof node.title === 'string') return node.title;
    if (node.type === "publisher" && typeof node.name === 'string') return node.name;
    if (typeof node.id === 'string') return node.id;
    return '';
  };

  const getLinkColor = (link: { [key: string]: unknown }): string => {
    if (link.relation === 'Co-authored paper') return '#A78BFA';
    if (link.relation === 'Worked together') return '#34D399';
    if (link.relation === 'Same hospital') return '#60A5FA';
    if (link.relation === 'Mentor') return '#FBBF24';
    if (link.relation === 'Author') return '#6366F1';
    if (link.relation === 'Published in') return '#F59E42';
    return '#94a3b8';
  };

  // Update dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Controls handlers
  const handleZoomIn = () => {
    if (fgRef.current) {
      const z = fgRef.current.zoom();
      fgRef.current.zoom((typeof z === 'number' ? z : 1) * 1.2, 400);
    }
  };
  const handleZoomOut = () => {
    if (fgRef.current) {
      const z = fgRef.current.zoom();
      fgRef.current.zoom((typeof z === 'number' ? z : 1) / 1.2, 400);
    }
  };
  const handleFit = () => {
    if (fgRef.current) {
      fgRef.current.zoomToFit(400, 40);
    }
  };

  // Filter links/nodes based on toggles
  const filteredGraphData = {
    nodes: graphData.nodes.filter((node: { [key: string]: unknown }) => {
      if (!showConnections && !showMyConnections) return true;
      if (showMyConnections) {
        return node.type === 'doctor' && (node as { [key: string]: unknown }).isMyConnection;
      }
      return true;
    }),
    links: graphData.links.filter((link: { [key: string]: unknown }) => {
      if (!showConnections && !showMyConnections) return true;
      if (showMyConnections) {
        return (link as { [key: string]: unknown }).isMyConnection;
      }
      return true;
    })
  };

  // Set d3 charge force via ref
  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force('charge')?.strength(repulsion);
    }
  }, [repulsion, filteredGraphData]);

  return (
    <div className="w-full h-full overflow-hidden relative cursor-pointer" ref={containerRef} style={{ background: "linear-gradient(135deg, #fff 60%, #f3f6fa 100%)" }}>
      {/* Filter bar overlay */}
      <div className="absolute top-6 left-6 z-30 flex items-center gap-3 bg-white rounded-full shadow-xl border border-gray-100 px-6 py-3 min-w-[240px]" style={{fontFamily: 'Inter, Geist, sans-serif'}}>
        <button className="bg-blue-50 text-blue-600 font-semibold px-4 py-1.5 rounded-full shadow-sm hover:bg-blue-100 transition text-xs">Filter</button>
        <label className="flex items-center gap-2 cursor-pointer">
          <span className="text-xs text-gray-500">Show Connections</span>
          <input type="checkbox" checked={true} readOnly className="accent-blue-600 w-4 h-4 rounded" />
        </label>
        <button className="bg-gray-50 text-gray-500 font-semibold px-4 py-1.5 rounded-full shadow-sm hover:bg-gray-100 transition text-xs">More</button>
      </div>
      <ForceGraph2D
        ref={fgRef as React.MutableRefObject<ForceGraphMethods>}
        width={dimensions.width}
        height={dimensions.height}
        graphData={filteredGraphData}
        nodeCanvasObject={(node, ctx, globalScale) =>
          drawGraphNode(
            node,
            ctx,
            globalScale,
            centerNodeId,
            getNodeLabel,
            getNodeBorderColor,
            getNodeBackgroundColor,
            drawNodeAvatar
          )
        }
        linkCanvasObject={(link, ctx) =>
          drawGraphLink(
            link,
            ctx,
            getLinkColor
          )
        }
        onNodeClick={onNodeClick}
        onNodeHover={onNodeHover}
        onLinkHover={onLinkHover}
        cooldownTicks={50}
      />
      
      <GraphZoomControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onFit={handleFit}
      />
    </div>
  );
});

GraphView.displayName = 'GraphView';

export default GraphView;
