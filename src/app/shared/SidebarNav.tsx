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
  <aside className="h-screen w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 gap-6 shadow-sm z-10">
    {navIcons.map(({ icon: Icon, key }) => (
      <div
        key={key}
        className={`flex items-center justify-center w-12 h-12 rounded-xl mb-2 transition-colors ${
          activeKey === key
            ? "bg-blue-600 text-white shadow"
            : "text-gray-400 hover:text-blue-600 cursor-pointer hover:bg-blue-50"
        }`}
      >
        <Icon className="w-6 h-6" />
      </div>
    ))}
  </aside>
);

export default SidebarNav; 