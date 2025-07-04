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
    <header className="w-full bg-white flex items-center justify-between px-8 py-4 shadow-sm z-20 rounded-b-2xl border-b border-gray-100">
      {/* Left: Avatar, name, specialty */}
      <div className="flex items-center gap-4 min-w-[220px]">
        <img src={user.avatar} alt="User" className="w-12 h-12 rounded-full object-cover border-2 border-blue-100 shadow" />
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800 text-base leading-tight">{user.name}</span>
          <span className="text-xs text-gray-400 leading-tight">{user.specialty}</span>
        </div>
      </div>
      {/* Center: Search bar */}
      <div className="flex-1 flex flex-col items-center">
        <div className={`w-full max-w-xl flex items-center bg-gray-50 border rounded-full shadow px-4 py-2 ${error ? 'border-red-300' : 'border-gray-200'}`}>
          <input
            type="text"
            placeholder="Search doctor by name..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={onSearchKeyDown}
            className="flex-1 bg-transparent outline-none text-gray-700 px-2 text-base"
          />
          <button 
            onClick={onSearch}
            className="ml-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 py-1.5 font-semibold text-sm transition"
          >
            Search
          </button>
        </div>
        {error && (
          <div className="text-red-500 text-xs mt-1">{error}</div>
        )}
      </div>
      {/* Right: Peers, Following, Create Web, Switches */}
      <div className="flex items-center gap-6 min-w-[420px] justify-end">
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
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 py-2 font-semibold text-sm shadow transition">Create web</button>
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