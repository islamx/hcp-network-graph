import dynamic from "next/dynamic";
import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from "react";
import { FiZoomIn, FiZoomOut, FiMaximize2 } from "react-icons/fi";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), { ssr: false });

interface GraphViewProps {
  graphData: any;
  centerNodeId: string | null;
  onNodeClick: (node: any) => void;
  onNodeHover: (node: any | null) => void;
  onLinkHover?: (link: any | null) => void;
  selectedNode?: any | null;
}

const GraphView = forwardRef<any, GraphViewProps>(({ graphData, centerNodeId, onNodeClick, onNodeHover, onLinkHover, selectedNode }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 300, height: 300 });
  const fgRef = useRef<any>(null);
  const [hoveredNode, setHoveredNode] = useState<any | null>(null);

  useImperativeHandle(ref, () => ({
    centerAndZoomOnNode: (nodeId: string) => {
      if (!fgRef.current) return;
      const node = graphData.nodes.find((n: any) => n.id === nodeId);
      if (node && typeof node.x === 'number' && typeof node.y === 'number') {
        fgRef.current.centerAt(node.x, node.y, 1000);
        fgRef.current.zoom(3, 1000);
      }
    },
    zoomIn: () => fgRef.current?.zoom(fgRef.current.zoom() * 1.2, 400),
    zoomOut: () => fgRef.current?.zoom(fgRef.current.zoom() / 1.2, 400),
    fitToView: () => fgRef.current?.zoomToFit(400, 40),
  }));

  // Node border color by type
  const getNodeBorderColor = (node: any) => {
    if (node.id === centerNodeId) return "#dc2626"; // red-600 for searched node
    if (node.type === "doctor") return "#3b82f6"; // blue-500
    if (node.type === "publication") return "#a78bfa"; // purple-400
    if (node.type === "publisher") return "#94a3b8"; // slate-400
    return "#e5e7eb";
  };

  // Node background color by type
  const getNodeBackgroundColor = (node: any) => {
    if (node.id === centerNodeId) return "#fef2f2"; // red-50 for searched node
    if (node.type === "doctor") return "#eff6ff"; // blue-50
    if (node.type === "publication") return "#faf5ff"; // purple-50
    if (node.type === "publisher") return "#f8fafc"; // slate-50
    return "#ffffff";
  };

  // Node avatar or icon
  const drawNodeAvatar = (node: any, ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
    if (node.type === "doctor") {
      const img = new window.Image();
      img.src = `https://i.pravatar.cc/60?u=doctor-${node.id}`;
      img.onload = () => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, x - r, y - r, r * 2, r * 2);
        ctx.restore();
      };
      // fallback circle while loading
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fillStyle = "#dbeafe";
      ctx.fill();
      ctx.restore();
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
  const getNodeLabel = (node: any) => {
    if (node.type === "doctor") return node.name;
    if (node.type === "publication") return node.title;
    if (node.type === "publisher") return node.name;
    return node.id;
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };
    handleResize();
    const resizeObserver = new (window as any).ResizeObserver(handleResize);
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Controls handlers
  const handleZoomIn = () => fgRef.current?.zoom(fgRef.current.zoom() * 1.2, 400);
  const handleZoomOut = () => fgRef.current?.zoom(fgRef.current.zoom() / 1.2, 400);
  const handleFit = () => fgRef.current?.zoomToFit(400, 40);

  return (
    <div className="w-full h-full overflow-hidden relative cursor-pointer" ref={containerRef} style={{ background: "linear-gradient(135deg, #f8fafc 60%, #e0e7ef 100%)" }}>
      <ForceGraph2D
        ref={fgRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={graphData}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const x = typeof node.x === "number" ? node.x : 0;
          const y = typeof node.y === "number" ? node.y : 0;
          // Adjust radius based on zoom level to prevent overlap
          const baseRadius = 16;
          const minRadius = 8;
          const maxRadius = 24;
          const r = Math.max(minRadius, Math.min(maxRadius, baseRadius / globalScale));
          
          // Background glow for searched node
          if (node.id === centerNodeId) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, r + 8, 0, 2 * Math.PI);
            ctx.fillStyle = "rgba(220, 38, 38, 0.1)";
            ctx.fill();
            ctx.restore();
          }
          
          // Hover effect - add subtle glow
          if (node === hoveredNode) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, r + 4, 0, 2 * Math.PI);
            ctx.fillStyle = "rgba(59, 130, 246, 0.15)";
            ctx.fill();
            ctx.restore();
          }
          
          // Selected node effect
          if (node === selectedNode) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, r + 6, 0, 2 * Math.PI);
            ctx.fillStyle = "rgba(34, 197, 94, 0.1)";
            ctx.fill();
            ctx.restore();
          }
          
          // Shadow
          ctx.save();
          ctx.beginPath();
          ctx.arc(x, y, r + 2, 0, 2 * Math.PI);
          ctx.shadowColor = "#cbd5e1";
          ctx.shadowBlur = 10;
          ctx.fillStyle = getNodeBackgroundColor(node);
          ctx.fill();
          ctx.restore();
          
          // Border
          ctx.save();
          ctx.beginPath();
          ctx.arc(x, y, r, 0, 2 * Math.PI);
          ctx.lineWidth = node.id === centerNodeId ? 3 : 2;
          ctx.strokeStyle = getNodeBorderColor(node);
          ctx.stroke();
          ctx.restore();
          
          // Avatar or icon
          drawNodeAvatar(node, ctx, x, y, r - 4);
          
          // Label - only show at reasonable zoom levels
          if (globalScale > 0.5) {
            ctx.save();
            ctx.font = `${11 / globalScale}px Sans-Serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            ctx.fillStyle = node.id === centerNodeId ? "#dc2626" : "#222";
            ctx.fillText(getNodeLabel(node), x, y + r + 6);
            ctx.restore();
          }
        }}
        linkCanvasObject={(link, ctx, globalScale) => {
          // Draw the default link with color and width
          const start = link.source;
          const end = link.target;
          if (
            !start ||
            !end ||
            typeof start !== 'object' ||
            typeof end !== 'object' ||
            start === null ||
            end === null ||
            typeof start.x !== 'number' ||
            typeof start.y !== 'number' ||
            typeof end.x !== 'number' ||
            typeof end.y !== 'number'
          ) {
            return;
          }
          const startX = start.x;
          const startY = start.y;
          const endX = end.x;
          const endY = end.y;
          
          // Pick color based on relation
          let color = "#e5e7eb";
          switch (link.relation) {
            case "Co-authored paper":
              color = "#a78bfa"; break;
            case "Worked together":
              color = "#34d399"; break;
            case "Same hospital":
              color = "#60a5fa"; break;
            case "Mentor":
              color = "#fbbf24"; break;
            case "Author":
              color = "#6366f1"; break;
            case "Published in":
              color = "#cbd5e1"; break;
            default:
              color = "#e5e7eb";
          }
          
          // Adjust line width based on zoom level - ensure minimum visibility
          const baseLineWidth = 2;
          const minLineWidth = 1.5;
          const maxLineWidth = 5;
          const lineWidth = Math.max(minLineWidth, Math.min(maxLineWidth, baseLineWidth / globalScale));
          
          // Draw glow effect for better visibility
          ctx.save();
          ctx.strokeStyle = color;
          ctx.lineWidth = lineWidth * 2.5;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.globalAlpha = 0.4;
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.stroke();
          ctx.restore();
          
          // Draw main line
          ctx.save();
          ctx.strokeStyle = color;
          ctx.lineWidth = lineWidth;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.globalAlpha = 1;
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.stroke();
          ctx.restore();
          
          // Draw the label - only at reasonable zoom levels
          if (link.relation && globalScale > 0.8) {
            const label = String(link.relation);
            const midX = (startX + endX) / 2;
            const midY = (startY + endY) / 2;
            let angle = Math.atan2(endY - startY, endX - startX);
            // Ensure text is always upright
            if (angle > Math.PI / 2 || angle < -Math.PI / 2) {
              angle += Math.PI;
            }
            ctx.save();
            ctx.translate(midX, midY);
            ctx.rotate(angle);
            ctx.font = `${12 / globalScale}px Sans-Serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            // Draw background for readability
            const textWidth = ctx.measureText(label).width;
            ctx.fillStyle = "rgba(255,255,255,0.95)";
            ctx.fillRect(-textWidth / 2 - 4, -10 / globalScale, textWidth + 8, 20 / globalScale);
            // Draw text
            ctx.fillStyle = "#333";
            ctx.fillText(label, 0, 0);
            ctx.restore();
          }
        }}
        linkColor={link => {
          switch (link.relation) {
            case "Co-authored paper":
              return "#a78bfa"; // purple
            case "Worked together":
              return "#34d399"; // green
            case "Same hospital":
              return "#60a5fa"; // blue
            case "Mentor":
              return "#fbbf24"; // orange
            case "Author":
              return "#6366f1"; // indigo
            case "Published in":
              return "#cbd5e1"; // soft gray
            default:
              return "#e5e7eb"; // lighter gray
          }
        }}
        linkWidth={1.5}
        linkCurvature={0.1}
        nodeRelSize={6}
        onNodeClick={onNodeClick}
        onNodeHover={(node) => {
          setHoveredNode(node);
          onNodeHover(node);
        }}
        onLinkHover={onLinkHover}
        enableNodeDrag={true}
        enableZoomInteraction={true}
        enablePanInteraction={true}
        d3VelocityDecay={0.4}
        d3AlphaDecay={0.02}
        d3AlphaMin={0.001}
      />
      {/* Right-side controls */}
      <div className="absolute top-8 right-8 flex flex-col gap-4 z-20">
        <button onClick={handleZoomIn} className="bg-white border border-gray-200 shadow rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-50 transition"><FiZoomIn className="w-5 h-5 text-blue-600" /></button>
        <button onClick={handleZoomOut} className="bg-white border border-gray-200 shadow rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-50 transition"><FiZoomOut className="w-5 h-5 text-blue-600" /></button>
        <button onClick={handleFit} className="bg-white border border-gray-200 shadow rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-50 transition"><FiMaximize2 className="w-5 h-5 text-blue-600" /></button>
      </div>
    </div>
  );
});

export default GraphView;
