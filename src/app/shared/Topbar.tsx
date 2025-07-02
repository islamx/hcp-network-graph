import React from "react";

const Topbar = () => (
  <header className="w-full h-20 bg-white flex items-center justify-between px-8 shadow-sm z-20">
    {/* Logo and left section */}
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">PS</div>
      <span className="text-xl font-bold text-gray-700">PeerSpace</span>
    </div>
    {/* Center search */}
    <div className="flex-1 flex justify-center">
      <input
        type="text"
        placeholder="Search"
        className="w-96 px-4 py-2 rounded-full border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-700"
      />
    </div>
    {/* User info and actions */}
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <img src="https://i.pravatar.cc/40?u=topbar-user" alt="User" className="w-10 h-10 rounded-full object-cover" />
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800 text-sm">Emily Carter</span>
          <span className="text-xs text-gray-400">Cardiologist at HNCO</span>
        </div>
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-blue-700 transition">Create web</button>
    </div>
  </header>
);

export default Topbar; 