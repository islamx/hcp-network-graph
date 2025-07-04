import React from "react";

const EdgeTooltip = ({ link }: { link: any }) => {
  if (!link) return null;
  return (
    <div className="bg-black text-white text-xs rounded px-4 py-2 shadow-lg z-50 pointer-events-none animate-fade-in min-w-[260px] max-w-[400px] text-left">
      <div className="font-semibold text-sm mb-1">{link.relation}</div>
      <div className="mb-1">
        <span className="font-bold">From:</span> {link.source?.name || link.source?.id}
      </div>
      <div className="mb-1">
        <span className="font-bold">To:</span> {link.target?.name || link.target?.id}
      </div>
      {link.sharedPubs && link.sharedPubs.length > 0 && (
        <div className="mb-1">
          <span className="font-bold">Shared Publications:</span> {link.sharedPubs.length}
          <ul className="list-disc list-inside text-xs text-gray-200 mt-1">
            {link.sharedPubs.slice(0, 3).map((pub: any, idx: number) => (
              <li key={idx}>{pub.title}</li>
            ))}
            {link.sharedPubs.length > 3 && <li>and more...</li>}
          </ul>
        </div>
      )}
      {link.workDetails && (
        <div className="mb-1">
          <span className="font-bold">Workplace:</span> {link.workDetails}
        </div>
      )}
    </div>
  );
};

export default EdgeTooltip; 