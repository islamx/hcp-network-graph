import React from "react";

interface EdgeTooltipProps {
  link: { [key: string]: unknown };
}

const EdgeTooltip = ({ link }: EdgeTooltipProps) => {
  if (!link) return null;
  const relation = typeof link.relation === 'string' ? link.relation : '';
  const source = typeof link.source === 'object' && link.source !== null ? link.source as { [key: string]: unknown } : {};
  const target = typeof link.target === 'object' && link.target !== null ? link.target as { [key: string]: unknown } : {};
  const sourceName = typeof source.name === 'string' ? source.name : typeof source.id === 'string' ? source.id : '';
  const targetName = typeof target.name === 'string' ? target.name : typeof target.id === 'string' ? target.id : '';
  const sharedPubs = Array.isArray(link.sharedPubs) ? link.sharedPubs : [];
  const workDetails = typeof link.workDetails === 'string' ? link.workDetails : null;
  return (
    <div className="bg-black text-white text-xs rounded px-4 py-2 shadow-lg z-50 pointer-events-none animate-fade-in min-w-[260px] max-w-[400px] text-left">
      <div className="font-semibold text-sm mb-1">{relation}</div>
      <div className="mb-1">
        <span className="font-bold">From:</span> {sourceName}
      </div>
      <div className="mb-1">
        <span className="font-bold">To:</span> {targetName}
      </div>
      {sharedPubs.length > 0 && (
        <div className="mb-1">
          <span className="font-bold">Shared Publications:</span> {sharedPubs.length}
          <ul className="list-disc list-inside text-xs text-gray-200 mt-1">
            {sharedPubs.slice(0, 3).map((pub, idx) => {
              if (typeof pub === 'object' && pub !== null && typeof (pub as { [key: string]: unknown }).title === 'string') {
                const pubObj = pub as { [key: string]: unknown };
                return <li key={idx}>{pubObj.title as string}</li>;
              }
              return null;
            })}
            {sharedPubs.length > 3 && <li>and more...</li>}
          </ul>
        </div>
      )}
      {workDetails && (
        <div className="mb-1">
          <span className="font-bold">Workplace:</span> {workDetails}
        </div>
      )}
    </div>
  );
};

export default EdgeTooltip; 