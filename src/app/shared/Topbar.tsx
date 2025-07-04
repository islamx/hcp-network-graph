import React, { useState } from "react";

interface TopbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  onSearchKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  error: string;
}

const Topbar = ({ searchValue, onSearchChange, onSearch, onSearchKeyDown, error }: TopbarProps) => {
  // Mock data for user
  const user = {
    name: "Emily Carter",
    specialty: "Cardiologist at HNCO",
    avatar: "https://i.pravatar.cc/40?u=topbar-user",
    peers: 232,
    following: 134,
  };
  const [showConnections, setShowConnections] = useState(true);
  const [showMyConnections, setShowMyConnections] = useState(false);

  return (
    <header className="w-full bg-white flex flex-col sm:flex-row items-center justify-between px-2 sm:px-8 py-2 sm:py-4 shadow-sm z-10 rounded-b-2xl border-b border-gray-100 gap-2 sm:gap-0 lg:pl-23">
      {/* Row 1: Avatar, name, specialty */}
      <div className="flex items-center gap-2 sm:gap-4 min-w-[120px] sm:min-w-[220px] mb-2 sm:mb-0 w-full">
        <img src={user.avatar} alt="User" className="w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-blue-100 shadow" />
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800 text-sm sm:text-base leading-tight">{user.name}</span>
          <span className="text-xs text-gray-400 leading-tight">{user.specialty}</span>
        </div>
      </div>
      {/* Row 2: Search bar and Create web button (side by side on desktop) */}
      <div className="w-full flex flex-col sm:flex-row items-center mb-2 sm:mb-0">
        <div className={`w-full sm:max-w-2xl flex items-center bg-gray-50 border rounded-full shadow px-2 sm:px-4 py-1.5 sm:py-2 ${error ? 'border-red-300' : 'border-gray-200'}`}>
          <input
            type="text"
            placeholder="Search doctor by name..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={onSearchKeyDown}
            className="flex-1 bg-transparent outline-none text-gray-700 px-1 sm:px-2 text-sm sm:text-lg"
          />
          <button 
            onClick={onSearch}
            className="ml-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-3 sm:px-5 py-1.5 font-semibold text-xs sm:text-sm transition"
          >
            Search
          </button>
        </div>
        <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-full px-3 sm:px-5 py-2 font-semibold text-xs sm:text-sm shadow transition whitespace-nowrap mt-2 sm:mt-0 sm:ml-8">Create web</button>
      </div>
      {/* Row 3: Peers, Following, Switches (hidden on mobile) */}
      <div className="hidden sm:flex items-center gap-6 min-w-0 sm:min-w-[420px] justify-end w-full sm:w-auto overflow-x-auto sm:overflow-visible mt-2 sm:mt-0 pb-1 sm:pb-0">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center">
            <span className="font-bold text-gray-800 text-sm">{user.peers}</span>
            <span className="text-xs text-gray-400">My Peers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-gray-800 text-sm">{user.following}</span>
            <span className="text-xs text-gray-400">Following</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 ml-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-xs text-gray-500">Show connections</span>
            <input type="checkbox" checked={showConnections} onChange={() => setShowConnections(v => !v)} className="accent-blue-600 w-4 h-4 rounded" />
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-xs text-gray-500">Show my connections on map</span>
            <input type="checkbox" checked={showMyConnections} onChange={() => setShowMyConnections(v => !v)} className="accent-blue-600 w-4 h-4 rounded" />
          </label>
        </div>
      </div>
    </header>
  );
};

export default Topbar; 