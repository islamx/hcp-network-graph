import dynamic from "next/dynamic";
import React, { useRef, useEffect, useState } from "react";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), { ssr: false });

interface GraphViewProps {
  graphData: any;
  centerNodeId: string | null;
  onNodeClick: (node: any) => void;
  onNodeHover: (node: any | null) => void;
  onLinkHover?: (link: any | null) => void;
}

const GraphView: React.FC<GraphViewProps> = ({ graphData, centerNodeId, onNodeClick, onNodeHover, onLinkHover }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 300, height: 300 });

  // 👇 function for node label based on type
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

  return (
    <div className="w-full h-full overflow-hidden" ref={containerRef}>
      <ForceGraph2D
        width={dimensions.width}
        height={dimensions.height}
        graphData={graphData}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const x = typeof node.x === "number" ? node.x : 0;
          const y = typeof node.y === "number" ? node.y : 0;
          ctx.beginPath();
          ctx.arc(x, y, 10, 0, 2 * Math.PI, false);
          let color = "steelblue";
          if (node.id === centerNodeId) {
            color = "#e63946";
          } else if (node.id === "1") {
            color = "orange";
          }
          ctx.fillStyle = color;
          ctx.fill();
          ctx.font = `${14 / globalScale}px Sans-Serif`;
          ctx.textAlign = "center";
          ctx.fillStyle = "#222";
          // Use the new label getter function
          ctx.fillText(getNodeLabel(node), x, y - 14);
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
          ctx.save();
          ctx.strokeStyle = color;
          ctx.lineWidth = .5;
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.stroke();
          ctx.restore();
          // Draw the label
          if (link.relation) {
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
            ctx.fillStyle = "rgba(255,255,255,0.85)";
            ctx.fillRect(-textWidth / 2 - 2, -8 / globalScale, textWidth + 4, 16 / globalScale);
            // Draw text
            ctx.fillStyle = "#555";
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
        onNodeClick={onNodeClick}
        onNodeHover={onNodeHover}
        onLinkHover={onLinkHover}
      />
    </div>
  );
};

export default GraphView;
