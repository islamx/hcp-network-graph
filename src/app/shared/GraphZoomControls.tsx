import React from 'react';
import { FiZoomIn, FiZoomOut, FiMaximize2 } from 'react-icons/fi';

type Props = {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFit: () => void;
};

const GraphZoomControls: React.FC<Props> = ({ onZoomIn, onZoomOut, onFit }) => (
  <div className="absolute bottom-6 right-6 z-30 flex flex-col gap-2">
    <button
      onClick={onZoomIn}
      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg flex items-center justify-center hover:bg-white transition-colors"
      title="Zoom In"
    >
      <FiZoomIn className="w-5 h-5 text-gray-700" />
    </button>
    <button
      onClick={onZoomOut}
      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg flex items-center justify-center hover:bg-white transition-colors"
      title="Zoom Out"
    >
      <FiZoomOut className="w-5 h-5 text-gray-700" />
    </button>
    <button
      onClick={onFit}
      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg flex items-center justify-center hover:bg-white transition-colors"
      title="Fit to View"
    >
      <FiMaximize2 className="w-5 h-5 text-gray-700" />
    </button>
  </div>
);

export default GraphZoomControls; 