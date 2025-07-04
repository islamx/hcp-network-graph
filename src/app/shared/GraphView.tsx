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
        onNodeClick={onNodeClick}
        onNodeHover={onNodeHover}
        onLinkHover={onLinkHover}
      />
    </div>
  );
};

export default GraphView;
