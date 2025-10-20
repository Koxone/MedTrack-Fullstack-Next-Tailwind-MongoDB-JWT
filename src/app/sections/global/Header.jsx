"use client";

import { Bell, User, LogOut, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header({ userName = "Usuario", role = "patient" }) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      {/* Mobile Header */}
      <div className="md:hidden px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{userName}</p>
            <p className="text-xs text-gray-500">
              {role === "patient" ? "Paciente" : "Médico"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition active:scale-95">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-gray-100 rounded-lg transition active:scale-95"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex px-6 py-4 items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">MedTrack</h2>
          <p className="text-sm text-gray-500">
            {role === "patient" ? "Panel de Paciente" : "Panel Médico"}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{userName}</p>
              <p className="text-xs text-gray-500">
                {role === "patient" ? "Paciente" : "Médico"}
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
          
          <button
            onClick={() => router.push("/")}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            title="Cerrar sesión"
          >
            <LogOut className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {showMenu && (
        <>
          <div 
            className="md:hidden fixed inset-0 bg-black/20 z-40"
            onClick={() => setShowMenu(false)}
          />
          <div className="md:hidden absolute top-full right-4 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="p-2">
              <button
                onClick={() => {
                  setShowMenu(false);
                  router.push(role === "patient" ? "/patient/profile" : "/doctor/profile");
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition"
              >
                <User className="w-4 h-4" />
                <span className="text-sm">Mi Perfil</span>
              </button>
              <button
                onClick={() => {
                  setShowMenu(false);
                  if (role === "patient") {
                    router.push("/patient/support");
                  }
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition"
              >
                <Bell className="w-4 h-4" />
                <span className="text-sm">Notificaciones</span>
              </button>
              <div className="border-t border-gray-200 my-2" />
              <button
                onClick={() => {
                  setShowMenu(false);
                  router.push("/");
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

