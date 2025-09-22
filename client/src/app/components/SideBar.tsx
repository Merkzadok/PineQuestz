import Link from "next/link";
import { User, LogOut, Map, BookOpen, Home, Trophy } from "lucide-react";

export default function Sidebar() {
  const menuItems = [
    {
      id: "profile",
      label: "Profile",
      icon: User,
      color: "text-blue-600",
      href: "/parent",
    },
    {
      id: "roadmap",
      label: "Roadmap",
      icon: Map,
      color: "text-cyan-600",
      href: "/",
    },
    {
      id: "letters",
      label: "Letters",
      icon: BookOpen,
      color: "text-purple-600",
      href: "/main/letters",
    },
    {
      id: "achievements",
      label: "Achievements",
      icon: Trophy,
      color: "text-amber-600",
      href: "/achievements",
    },
    {
      id: "logout",
      label: "Log Out",
      icon: LogOut,
      color: "text-slate-600",
      href: "/logout",
    },
  ];

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-white to-slate-50 border-r border-slate-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center shadow-sm">
            <Home className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              LittleReader
            </h2>
            <p className="text-sm text-slate-500">Learn & Play</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.id}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl
                               text-left transition-all duration-200
                               hover:bg-blue-50 hover:shadow-sm focus:outline-none
                               focus:ring-2 focus:ring-blue-400"
                  >
                    <IconComponent
                      className={`w-5 h-5 ${item.color} transition-colors duration-200`}
                    />
                    <span className="text-slate-700 font-medium transition-colors duration-200">
                      {item.label}
                    </span>
                  </Link>
                ) : (
                  <button
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl
                                     text-left transition-all duration-200
                                     hover:bg-blue-50 hover:shadow-sm focus:outline-none
                                     focus:ring-2 focus:ring-blue-400"
                  >
                    <IconComponent
                      className={`w-5 h-5 ${item.color} transition-colors duration-200`}
                    />
                    <span className="text-slate-700 font-medium transition-colors duration-200">
                      {item.label}
                    </span>
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200">
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-800">Status</p>
              <p className="text-xs text-cyan-600">Online & learning</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
