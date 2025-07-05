import React from "react";

interface EdgeDetailsModalProps {
  link: { [key: string]: unknown };
  onClose: () => void;
}

const EdgeDetailsModal = ({ link, onClose }: EdgeDetailsModalProps) => {
  if (!link) return null;
  const source = typeof link.source === 'object' && link.source !== null ? link.source as { [key: string]: unknown } : {};
  const target = typeof link.target === 'object' && link.target !== null ? link.target as { [key: string]: unknown } : {};
  const sourceName = typeof source.name === 'string' ? source.name : typeof source.id === 'string' ? source.id : '';
  const targetName = typeof target.name === 'string' ? target.name : typeof target.id === 'string' ? target.id : '';
  const relation = typeof link.relation === 'string' ? link.relation : '';
  const sharedPubs = Array.isArray(link.sharedPubs) ? link.sharedPubs : [];

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
            <span className="font-semibold">Relation:</span> {relation}
          </div>
          <div className="mb-2">
            <span className="font-semibold">From:</span> {sourceName}
          </div>
          <div className="mb-2">
            <span className="font-semibold">To:</span> {targetName}
          </div>
          {Array.isArray(sharedPubs) && sharedPubs.length > 0 && (
            <div className="mb-2">
              <div className="font-semibold">Shared Publications ({sharedPubs.length}):</div>
              <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                {sharedPubs.map((pub, i) => {
                  if (typeof pub === 'object' && pub !== null && typeof (pub as { [key: string]: unknown }).title === 'string') {
                    const pubObj = pub as { [key: string]: unknown };
                    return (
                      <li key={typeof pubObj.id === 'string' ? pubObj.id : i}>
                        <span className="font-bold">{pubObj.title as string}</span>
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EdgeDetailsModal; 