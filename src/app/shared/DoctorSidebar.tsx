import React from "react";
import ProfileCard from "./ProfileCard";

interface DoctorSidebarProps {
  selectedNode: any | null;
}

const DoctorSidebar: React.FC<DoctorSidebarProps> = ({ selectedNode }) => {
  // If not doctor, show elegant empty state
  if (!selectedNode || selectedNode.type !== "doctor") {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full p-8">
        <div className="relative w-32 h-32 mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-4xl text-blue-400 shadow-inner">
              <span>🌐</span>
            </div>
          </div>
        </div>
        <div className="text-gray-400 text-center text-base font-medium">Select or hover a doctor to view profile details</div>
      </div>
    );
  }

  // Doctor node: show profile card with mini-map and stats
  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-lg p-0 overflow-hidden flex flex-col">
      {/* Avatar section without globe background */}
      <div className="relative w-full h-40 flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="relative z-10 flex flex-col items-center w-full">
          <img
            src={`https://i.pravatar.cc/120?u=doctor-${selectedNode.id}`}
            alt={selectedNode.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg mt-6"
          />
          <div className="text-lg font-bold text-gray-800 mt-2">{selectedNode.name}</div>
          <div className="text-xs text-gray-500 mb-2">{selectedNode.specialty}</div>
        </div>
      </div>
      {/* Stats and View Profile */}
      <div className="flex flex-row justify-between items-center px-6 py-4 border-b border-gray-100 bg-white">
        <div className="flex flex-col items-center">
          <div className="text-lg font-bold text-gray-800">1000</div>
          <div className="text-xs text-gray-500">Patients Served</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-lg font-bold text-gray-800">95%</div>
          <div className="text-xs text-gray-500">Success Rate</div>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 py-2 font-semibold text-xs shadow transition">View Profile</button>
      </div>
      {/* ProfileCard details */}
      <div className="flex-1 overflow-y-auto p-6">
        <ProfileCard doctor={selectedNode} />
      </div>
    </div>
  );
};

export default DoctorSidebar; 