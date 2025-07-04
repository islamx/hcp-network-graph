import React from "react";
import { FiHome, FiUser, FiUsers, FiSearch, FiSettings } from "react-icons/fi";

const navIcons = [
  { icon: FiHome, key: "home" },
  { icon: FiUser, key: "user" },
  { icon: FiUsers, key: "users" },
  { icon: FiSearch, key: "search" },
  { icon: FiSettings, key: "settings" },
];

interface SidebarNavProps {
  activeKey?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ activeKey = "home" }) => (
  <aside className="h-screen w-20 bg-white border-r border-gray-100 rounded-2xl flex flex-col items-center py-6 shadow-sm z-10 justify-between">
    <div className="flex flex-col gap-4 mt-2">
      {navIcons.map(({ icon: Icon, key }) => (
        <div
          key={key}
          className={`flex items-center justify-center w-12 h-12 rounded-xl transition-colors duration-150 mb-1 cursor-pointer
            ${activeKey === key ? "bg-blue-600 text-white shadow" : "text-gray-400 hover:text-blue-600 hover:bg-blue-50"}`}
        >
          <Icon className="w-6 h-6" />
        </div>
      ))}
    </div>
    {/* User avatar button at the bottom */}
    <div className="mb-2">
      <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shadow border border-gray-200 hover:border-blue-400 transition">
        <img src="https://i.pravatar.cc/40?u=sidebar-user" alt="User" className="w-8 h-8 rounded-full object-cover" />
      </button>
    </div>
  </aside>
);

export default SidebarNav; 