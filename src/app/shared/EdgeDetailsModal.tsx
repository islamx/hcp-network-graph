import React from "react";

const EdgeDetailsModal = ({ link, onClose }: { link: any, onClose: () => void }) => {
  if (!link) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full relative animate-fade-in">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="mb-4">
          <div className="text-lg font-bold text-gray-800 mb-2">Connection Details</div>
          <div className="mb-2">
            <span className="font-semibold">Relation:</span> {link.relation}
          </div>
          <div className="mb-2">
            <span className="font-semibold">From:</span> {link.source?.name || link.source?.id}
          </div>
          <div className="mb-2">
            <span className="font-semibold">To:</span> {link.target?.name || link.target?.id}
          </div>
          {link.sharedPubs && link.sharedPubs.length > 0 && (
            <div className="mb-2">
              <div className="font-semibold">Shared Publications ({link.sharedPubs.length}):</div>
              <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                {link.sharedPubs.map((pub: any, idx: number) => (
                  <li key={idx}>
                    <span className="font-bold">{pub.title}</span>
                    {pub.year && <span className="ml-2 text-gray-500">({pub.year})</span>}
                    {pub.journal && <span className="ml-2 text-gray-400">[{pub.journal}]</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {link.workDetails && (
            <div className="mb-2">
              <span className="font-semibold">Workplace:</span> {link.workDetails}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EdgeDetailsModal; 