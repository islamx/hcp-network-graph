import React from "react";
import ProfileCard from "./ProfileCard";

interface DoctorSidebarProps {
  selectedNode: any | null;
}

const DoctorSidebar: React.FC<DoctorSidebarProps> = ({ selectedNode }) => (
  <div className="flex flex-col w-full min-w-0 h-full bg-[#f8fafc] border-r border-gray-200 px-4 py-8 overflow-y-auto">
    <div className="w-full flex justify-center items-start">
      <div className="w-full max-w-sm">
        <ProfileCard doctor={selectedNode} />
      </div>
    </div>
  </div>
);

export default DoctorSidebar; 