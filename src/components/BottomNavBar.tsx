import React from 'react';
import { NavTab } from '../types';

interface BottomNavBarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  favoritesCount?: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onSelectTab,
  favoritesCount = 0,
}) => {
  // Normalize subtabs to their parent for navigation highlight
  const getSelectedMainTab = (): 'inicio' | 'reuniones' | 'favoritos' | 'asistente' => {
    if (activeTab === 'reuniones') return 'reuniones';
    if (activeTab === 'favoritos' || activeTab === 'preguntas' || activeTab === 'pasos') return 'favoritos';
    if (activeTab === 'asistente') return 'asistente';
    return 'inicio'; // includes 'guia', 'webs', 'acerca', etc.
  };

  const selected = getSelectedMainTab();

  return (
    <nav
      id="bottom-navigation-bar"
      className="fixed bottom-0 left-0 right-0 w-full z-40 bg-[#e5eeff] dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 flex justify-around items-center px-1.5 py-1 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-[calc(0.35rem+env(safe-area-inset-bottom,0px))]"
    >
      {/* Tab 1: Inicio */}
      <button
        id="nav-tab-inicio"
        onClick={() => onSelectTab('inicio')}
        className={`flex flex-col items-center justify-center min-w-[60px] sm:min-w-[72px] py-1 px-1.5 rounded-lg transition-all duration-150 active:scale-95 ${
          selected === 'inicio'
            ? 'text-[#af101a] bg-red-600/10 font-bold'
            : 'text-[#545f73] hover:text-[#0b1c30] hover:bg-slate-200/50 font-medium'
        }`}
      >
        <span
          className="material-symbols-outlined text-[20px]"
          style={{ fontVariationSettings: selected === 'inicio' ? "'FILL' 1" : "'FILL' 0" }}
        >
          home
        </span>
        <span className="text-[11px] leading-tight mt-0.5">Inicio</span>
      </button>

      {/* Tab 2: Reuniones */}
      <button
        id="nav-tab-reuniones"
        onClick={() => onSelectTab('reuniones')}
        className={`flex flex-col items-center justify-center min-w-[60px] sm:min-w-[72px] py-1 px-1.5 rounded-lg transition-all duration-150 active:scale-95 ${
          selected === 'reuniones'
            ? 'text-[#af101a] bg-red-600/10 font-bold'
            : 'text-[#545f73] hover:text-[#0b1c30] hover:bg-slate-200/50 font-medium'
        }`}
      >
        <span
          className="material-symbols-outlined text-[20px]"
          style={{ fontVariationSettings: selected === 'reuniones' ? "'FILL' 1" : "'FILL' 0" }}
        >
          search
        </span>
        <span className="text-[11px] leading-tight mt-0.5">Reuniones</span>
      </button>

      {/* Tab 3: Favoritos & Herramientas */}
      <button
        id="nav-tab-favoritos"
        onClick={() => onSelectTab('favoritos')}
        className={`relative flex flex-col items-center justify-center min-w-[60px] sm:min-w-[72px] py-1 px-1.5 rounded-lg transition-all duration-150 active:scale-95 ${
          selected === 'favoritos'
            ? 'text-[#af101a] bg-red-600/10 font-bold'
            : 'text-[#545f73] hover:text-[#0b1c30] hover:bg-slate-200/50 font-medium'
        }`}
      >
        <div className="relative">
          <span
            className="material-symbols-outlined text-[20px]"
            style={{ fontVariationSettings: selected === 'favoritos' ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
          {favoritesCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#af101a] text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
              {favoritesCount}
            </span>
          )}
        </div>
        <span className="text-[11px] leading-tight mt-0.5">Favoritos</span>
      </button>

      {/* Tab 4: Asistente */}
      <button
        id="nav-tab-asistente"
        onClick={() => onSelectTab('asistente')}
        className={`flex flex-col items-center justify-center min-w-[60px] sm:min-w-[72px] py-1 px-1.5 rounded-lg transition-all duration-150 active:scale-95 ${
          selected === 'asistente'
            ? 'text-[#af101a] bg-red-600/10 font-bold'
            : 'text-[#545f73] hover:text-[#0b1c30] hover:bg-slate-200/50 font-medium'
        }`}
      >
        <span
          className="material-symbols-outlined text-[20px]"
          style={{ fontVariationSettings: selected === 'asistente' ? "'FILL' 1" : "'FILL' 0" }}
        >
          smart_toy
        </span>
        <span className="text-[11px] leading-tight mt-0.5">Asistente</span>
      </button>
    </nav>
  );
};
