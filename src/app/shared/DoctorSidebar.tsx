import React, { useState } from "react";

interface DoctorSidebarProps {
  selectedNode: { [key: string]: unknown } | null;
}

const DoctorSidebar: React.FC<DoctorSidebarProps> = ({ selectedNode }) => {
  // Add state for active tab
  const [activeTab, setActiveTab] = useState("peers");

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
      {/* Peers/Following/Resume Tabs */}
      <div className="flex flex-row justify-center gap-2 pt-4 pb-2 bg-white z-20 rounded-full shadow-md mx-6 mt-4 mb-2 mb-[30px]">
        {[
          { key: "peers", label: "Peers" },
          { key: "following", label: "Following" },
          { key: "resume", label: "Resume" },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-1.5 rounded-full font-semibold text-xs transition shadow-sm ${activeTab === tab.key ? "bg-blue-600 text-white shadow-md" : "bg-white text-gray-500 hover:bg-blue-50"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Mini-map + Avatar */}
      <div className="relative w-full h-52 flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <img src="/profile-bg-ellipse.svg" alt="Ellipse wave background" className="absolute left-1/2 top-0 -translate-x-1/2 w-[340px] h-48 opacity-80 select-none pointer-events-none" />
        <img src="/profile-bg-abstract.svg" alt="Decorative network background" className="absolute left-1/2 top-8 -translate-x-1/2 w-44 h-44 opacity-80 select-none pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center w-full">
          <img
            src={`https://i.pravatar.cc/120?u=doctor-${selectedNode.id}`}
            alt={typeof selectedNode.name === 'string' ? selectedNode.name : ''}
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-2xl -mt-10"
            style={{ boxShadow: '0 8px 32px 0 rgba(56, 189, 248, 0.18)' }}
          />
          <div className="text-2xl font-bold text-gray-800 mb-1 text-center">
            {typeof selectedNode.name === 'string' ? selectedNode.name : ''}
          </div>
          <div className="text-sm text-blue-500 font-semibold text-center mb-2">
            {typeof selectedNode.specialty === 'string' ? selectedNode.specialty : ''}
          </div>
        </div>
      </div>
      {/* Stats in white box */}
      <div className="flex flex-row justify-center items-center gap-0 px-6 -mt-8 z-20">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 flex flex-row w-full max-w-xs text-center overflow-hidden">
          <div className="flex-1 py-4">
            <div className="text-xl font-bold text-gray-800">1000</div>
            <div className="text-xs text-gray-500 font-medium mt-1">Patients Served</div>
          </div>
          <div className="w-px bg-gray-200 h-8 self-center" />
          <div className="flex-1 py-4">
            <div className="text-xl font-bold text-gray-800">95%</div>
            <div className="text-xs text-gray-500 font-medium mt-1">Success Rate</div>
          </div>
        </div>
      </div>
      {/* About */}
      <div className="px-6 pt-6">
        <div className="flex items-center gap-2 font-bold text-gray-700 mb-1">
          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01"/></svg>
          About
        </div>
        <div className="text-xs text-gray-500 mb-4 font-light leading-6">
          Experienced and compassionate doctor specializing in {typeof selectedNode.specialty === 'string' ? selectedNode.specialty : 'N/A'}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
      </div>
      {/* Education Timeline */}
      <div className="px-6">
        <div className="flex items-center gap-2 font-bold text-gray-700 mb-2">
          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5zm0 0v6"/></svg>
          Education
        </div>
        <ol className="relative border-l-2 border-blue-100 ml-2">
          {Array.isArray(selectedNode.education) && selectedNode.education.filter(e => typeof e === 'string').map((edu, index) => (
            <li key={index} className="mb-4 ml-4">
              <div className="absolute -left-3 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
              <div className="text-xs text-gray-700 font-light leading-6">{edu as string}</div>
            </li>
          ))}
        </ol>
      </div>
      {/* Experience Timeline */}
      <div className="px-6 mt-2 mb-6">
        <div className="flex items-center gap-2 font-bold text-gray-700 mb-2">
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 22V12l6-8 6 8v10"/></svg>
          Experience
        </div>
        <ol className="relative border-l-2 border-green-100 ml-2">
          {Array.isArray(selectedNode.experience) && selectedNode.experience.filter(e => typeof e === 'string').map((exp, index) => (
            <li key={index} className="mb-4 ml-4">
              <div className="absolute -left-3 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              <div className="text-xs text-gray-700 font-light leading-6">{exp as string}</div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default DoctorSidebar; 