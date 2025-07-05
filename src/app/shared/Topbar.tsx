import React, { useState } from "react";

interface TopbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  onSearchKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  error: string;
  showConnections: boolean;
  setShowConnections: (v: boolean) => void;
  showMyConnections: boolean;
  setShowMyConnections: (v: boolean) => void;
}

const Topbar = ({ searchValue, onSearchChange, onSearch, onSearchKeyDown, error, showConnections, setShowConnections, showMyConnections, setShowMyConnections }: TopbarProps) => {
  // Mock data for user
  const user = {
    name: "Emily Carter",
    specialty: "Cardiologist at HNCO",
    avatar: "https://i.pravatar.cc/40?u=topbar-user",
    peers: 232,
    following: 134,
  };

  return (
    <header className="w-full bg-white flex flex-col lg:flex-row items-start lg:items-center justify-between px-2 sm:px-4 lg:px-8 py-2 sm:py-3 lg:py-4 shadow-sm z-10 rounded-b-2xl border-b border-gray-100 gap-3 lg:gap-0 lg:pl-23" style={{fontFamily: 'Inter, Geist, sans-serif'}}>
      <div className="flex items-center gap-3 sm:gap-4 min-w-[120px] sm:min-w-[220px] w-full lg:w-auto mb-2 lg:mb-0">
        <img src={user.avatar} alt="User" className="w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-blue-100 shadow" />
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800 text-sm sm:text-base leading-tight">{user.name}</span>
          <span className="text-xs text-gray-400 leading-tight">{user.specialty}</span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row flex-1 items-stretch lg:items-center gap-3 lg:gap-4 w-full">
        <div className={`w-full flex items-center bg-gray-50 border rounded-full shadow px-2 sm:px-4 py-2 ${error ? 'border-red-300' : 'border-gray-200'}`}>
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
        <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-full px-3 sm:px-5 py-2 font-semibold text-xs sm:text-sm shadow transition whitespace-nowrap mt-2 sm:mt-0">Create web</button>
        <div className="flex items-center gap-4 sm:gap-6 min-w-0 sm:min-w-[320px] lg:min-w-[420px] justify-end w-full lg:w-auto overflow-x-auto sm:overflow-visible pb-1">
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
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <span className="text-xs text-gray-500">Show connections</span>
              <span
                className={`relative inline-block w-10 h-6 transition rounded-full ${showConnections ? 'bg-blue-500' : 'bg-gray-200'}`}
                onClick={() => setShowConnections(!showConnections)}
                style={{ transition: 'background 0.2s' }}
              >
                <span
                  className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform ${showConnections ? 'translate-x-4' : ''}`}
                  style={{ transition: 'transform 0.2s' }}
                />
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <span className="text-xs text-gray-500">Show my connections on map</span>
              <span
                className={`relative inline-block w-10 h-6 transition rounded-full ${showMyConnections ? 'bg-blue-500' : 'bg-gray-200'}`}
                onClick={() => setShowMyConnections(!showMyConnections)}
                style={{ transition: 'background 0.2s' }}
              >
                <span
                  className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform ${showMyConnections ? 'translate-x-4' : ''}`}
                  style={{ transition: 'transform 0.2s' }}
                />
              </span>
            </label>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar; 