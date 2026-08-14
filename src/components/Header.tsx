import React from 'react';
import { NavTab } from '../types';
import { GALogo } from './GALogo';

interface HeaderProps {
  currentTab: NavTab;
  onNavigate: (tab: NavTab) => void;
  onOpenCrisis: () => void;
  titleOverride?: string;
  showBack?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onOpenCrisis,
  titleOverride,
  showBack = false,
}) => {
  let title = 'Jugadores Anónimos';
  if (titleOverride) {
    title = titleOverride;
  } else if (currentTab === 'guia') {
    title = 'Jugadores Anónimos';
  } else if (currentTab === 'webs') {
    title = 'Páginas Oficiales';
  } else if (currentTab === 'reuniones') {
    title = 'Reuniones J.A.';
  } else if (currentTab === 'favoritos') {
    title = 'Favoritos y Herramientas';
  } else if (currentTab === 'asistente') {
    title = 'Jugadores Anónimos';
  } else if (currentTab === 'acerca') {
    title = 'Acerca de J.A.';
  } else if (currentTab === 'preguntas') {
    title = '20 Preguntas de Autoevaluación';
  } else if (currentTab === 'pasos') {
    title = 'Los 12 Pasos';
  }

  return (
    <header
      id="main-app-header"
      className="sticky top-0 z-40 bg-[#f8f9ff]/95 backdrop-blur-md flex justify-between items-center px-3.5 sm:px-5 py-2 sm:py-2.5 w-full border-b border-slate-200/70"
    >
      <div className="flex items-center gap-2 min-w-0">
        {showBack ? (
          <button
            id="header-back-btn"
            onClick={() => onNavigate('inicio')}
            aria-label="Volver al inicio"
            className="w-8 h-8 -ml-1 rounded-full flex items-center justify-center text-[#af101a] hover:bg-red-50 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[22px]">arrow_back</span>
          </button>
        ) : (
          <div
            onClick={() => onNavigate('inicio')}
            className="cursor-pointer flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white border border-slate-200/80 shadow-xs hover:border-red-200 p-0.5 shrink-0 transition-transform active:scale-95"
            title="Jugadores Anónimos"
          >
            <GALogo className="w-full h-full" />
          </div>
        )}
        <h1
          onClick={() => onNavigate('inicio')}
          className="font-bold text-[16px] sm:text-[20px] leading-tight text-[#0b1c30] truncate cursor-pointer tracking-tight"
        >
          {title}
        </h1>
      </div>

      <button
        id="crisis-header-button"
        onClick={onOpenCrisis}
        className="bg-[#af101a] text-white px-2.5 sm:px-3.5 py-1 rounded-full font-semibold text-[12px] sm:text-[13px] flex items-center gap-1 shadow-sm hover:bg-[#930010] active:scale-95 transition-all shrink-0 min-h-[32px] sm:min-h-[36px]"
      >
        <span className="material-symbols-outlined text-[16px]">call</span>
        <span>Ayuda 24h</span>
      </button>
    </header>
  );
};
