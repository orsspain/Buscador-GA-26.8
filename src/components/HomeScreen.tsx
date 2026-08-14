import React from 'react';
import { NavTab } from '../types';

interface HomeScreenProps {
  onNavigate: (tab: NavTab) => void;
  onOpenCrisis: () => void;
  onQuickAction: (action: 'buscar' | 'cerca' | 'zoom' | 'asistente' | 'webs') => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onOpenCrisis,
  onQuickAction,
}) => {
  return (
    <div id="home-screen-content" className="space-y-3 sm:space-y-4 pb-6 animate-fadeIn">
      {/* Subtitle / Brand Intro */}
      <div className="pt-0.5">
        <p className="text-[#545f73] text-[14px] sm:text-[16px] leading-relaxed">
          Comunidad de Auto ayuda
        </p>
      </div>

      {/* 24h Help Crisis Button Banner */}
      <button
        id="hero-crisis-call-banner"
        onClick={onOpenCrisis}
        className="w-full bg-[#d32f2f] hover:bg-[#b71c1c] active:scale-[0.98] text-white rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center justify-between shadow-md transition-all min-h-[62px] sm:min-h-[76px] text-left group"
      >
        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
          <div className="bg-white/20 p-1.5 sm:p-2.5 rounded-full flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 shrink-0 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-white text-[18px] sm:text-[22px]">call</span>
          </div>
          <div className="min-w-0">
            <div className="text-red-100 text-[12px] sm:text-[13px] font-medium leading-none mb-0.5">
              Ayuda 24 horas
            </div>
            <div className="font-bold text-[17px] sm:text-[22px] text-white tracking-tight leading-tight truncate">
              +34 670 691 513
            </div>
          </div>
        </div>
        <span className="material-symbols-outlined text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all text-[20px] sm:text-[26px] shrink-0 ml-1">
          chevron_right
        </span>
      </button>

      {/* Welcome Card */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-4 shadow-sm border border-slate-200/80">
        <h2 className="font-bold text-[16px] sm:text-[18px] text-[#0b1c30] mb-1">Bienvenido</h2>
        <p className="text-[#545f73] text-[13px] sm:text-[14px] leading-relaxed">
          No estás solo. Encuentra una reunión presencial o en línea cerca de ti, en España o en cualquier país de habla hispana.
        </p>
      </div>

      {/* Quick Actions Grid (ACCIONES RÁPIDAS - 5 Compact columns) */}
      <div>
        <h3 className="text-[#545f73] font-bold text-[11px] sm:text-[12px] uppercase tracking-wider mb-2">
          Acciones Rápidas
        </h3>
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5">
          {/* Action: Buscar */}
          <button
            id="quick-action-buscar"
            onClick={() => onQuickAction('buscar')}
            className="bg-white rounded-xl p-2 sm:p-3 flex flex-col items-center justify-center shadow-xs border border-slate-200/80 hover:bg-blue-50/50 hover:border-red-200 active:scale-95 transition-all min-h-[68px] sm:min-h-[84px] group"
          >
            <div className="bg-red-50 group-hover:bg-red-100 text-[#af101a] w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center mb-1 transition-colors">
              <span className="material-symbols-outlined text-[17px] sm:text-[19px]">search</span>
            </div>
            <span className="text-[#0b1c30] font-semibold text-[11px] sm:text-[13px] truncate w-full text-center">Buscar</span>
          </button>

          {/* Action: Cerca de mí */}
          <button
            id="quick-action-cerca"
            onClick={() => onQuickAction('cerca')}
            className="bg-white rounded-xl p-2 sm:p-3 flex flex-col items-center justify-center shadow-xs border border-slate-200/80 hover:bg-blue-50/50 hover:border-red-200 active:scale-95 transition-all min-h-[68px] sm:min-h-[84px] group"
          >
            <div className="bg-red-50 group-hover:bg-red-100 text-[#af101a] w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center mb-1 transition-colors">
              <span className="material-symbols-outlined text-[17px] sm:text-[19px]">location_on</span>
            </div>
            <span className="text-[#0b1c30] font-semibold text-[11px] sm:text-[13px] truncate w-full text-center">Cerca</span>
          </button>

          {/* Action: Zoom */}
          <button
            id="quick-action-zoom"
            onClick={() => onQuickAction('zoom')}
            className="bg-white rounded-xl p-2 sm:p-3 flex flex-col items-center justify-center shadow-xs border border-slate-200/80 hover:bg-blue-50/50 hover:border-red-200 active:scale-95 transition-all min-h-[68px] sm:min-h-[84px] group"
          >
            <div className="bg-red-50 group-hover:bg-red-100 text-[#af101a] w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center mb-1 transition-colors">
              <span className="material-symbols-outlined text-[17px] sm:text-[19px]">videocam</span>
            </div>
            <span className="text-[#0b1c30] font-semibold text-[11px] sm:text-[13px] truncate w-full text-center">Zoom</span>
          </button>

          {/* Action: Asistente */}
          <button
            id="quick-action-asistente"
            onClick={() => onQuickAction('asistente')}
            className="bg-white rounded-xl p-2 sm:p-3 flex flex-col items-center justify-center shadow-xs border border-slate-200/80 hover:bg-blue-50/50 hover:border-red-200 active:scale-95 transition-all min-h-[68px] sm:min-h-[84px] group"
          >
            <div className="bg-red-50 group-hover:bg-red-100 text-[#af101a] w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center mb-1 transition-colors">
              <span className="material-symbols-outlined text-[17px] sm:text-[19px]">smart_toy</span>
            </div>
            <span className="text-[#0b1c30] font-semibold text-[11px] sm:text-[13px] truncate w-full text-center">Asistente</span>
          </button>

          {/* Action: Webs */}
          <button
            id="quick-action-webs"
            onClick={() => onQuickAction('webs')}
            className="bg-white rounded-xl p-2 sm:p-3 flex flex-col items-center justify-center shadow-xs border border-slate-200/80 hover:bg-blue-50/50 hover:border-red-200 active:scale-95 transition-all min-h-[68px] sm:min-h-[84px] group"
          >
            <div className="bg-red-50 group-hover:bg-red-100 text-[#af101a] w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center mb-1 transition-colors">
              <span className="material-symbols-outlined text-[17px] sm:text-[19px]">language</span>
            </div>
            <span className="text-[#0b1c30] font-semibold text-[11px] sm:text-[13px] truncate w-full text-center">Webs</span>
          </button>
        </div>
      </div>

      {/* Featured: Guía para todos los miembros (El Combo) */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-4 shadow-sm border border-slate-200/80 hover:border-slate-300 transition-all">
        <div className="flex items-start justify-between gap-2.5 mb-1.5">
          <div>
            <span className="inline-block bg-blue-100 text-blue-800 text-[10px] font-bold px-1.5 py-0.5 rounded mb-1 uppercase tracking-wide">
              Literatura Fundamental
            </span>
            <h3 className="font-bold text-[15px] sm:text-[17px] text-[#0b1c30] leading-snug">
              Guía para todos los miembros
            </h3>
            <p className="text-[11px] text-[#545f73]">Página 17 de 'El Combo' de Jugadores Anónimos</p>
          </div>
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-red-50 flex items-center justify-center text-[#af101a] shrink-0">
            <span className="material-symbols-outlined text-[18px] sm:text-[20px]">menu_book</span>
          </div>
        </div>
        <p className="text-[13px] text-[#545f73] mb-3">
          Los 8 principios diarios para mantener la abstinencia, asistir a reuniones y vivir en recuperación un día a la vez.
        </p>
        <button
          id="btn-open-member-guide"
          onClick={() => onNavigate('guia')}
          className="w-full bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] font-bold text-[13px] sm:text-[14px] py-2 px-3 sm:px-4 rounded-lg sm:rounded-xl flex items-center justify-between transition-colors border border-blue-200/80"
        >
          <span>Leer los 8 Puntos de la Guía</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>

      {/* Autoevaluación 20 Preguntas Banner */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-4 shadow-sm border border-slate-200/80 flex items-center justify-between gap-2.5">
        <div className="space-y-0.5">
          <h4 className="font-bold text-[14px] sm:text-[15px] text-[#0b1c30]">
            ¿Tienes dudas si tienes un problema con el juego?
          </h4>
          <p className="text-[12px] text-[#545f73]">
            Haz el cuestionario oficial de 20 preguntas de Jugadores Anónimos.
          </p>
        </div>
        <button
          id="btn-open-twenty-questions"
          onClick={() => onNavigate('preguntas')}
          className="bg-[#af101a] hover:bg-[#930010] text-white px-3 py-1.5 rounded-lg text-[12px] font-bold shrink-0 shadow-sm active:scale-95 transition-all"
        >
          Hacer Test
        </button>
      </div>

      {/* About Section */}
      <button
        id="btn-open-about-ga"
        onClick={() => onNavigate('acerca')}
        className="w-full bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center justify-between shadow-sm border border-slate-200/80 hover:bg-slate-50 active:scale-[0.98] transition-all min-h-[50px] sm:min-h-[58px] text-left"
      >
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-[#545f73] text-[20px]">info</span>
          <span className="font-semibold text-[14px] sm:text-[15px] text-[#0b1c30] leading-tight">
            Acerca de Jugadores Anónimos
          </span>
        </div>
        <span className="material-symbols-outlined text-[#545f73] opacity-60 text-[20px]">
          chevron_right
        </span>
      </button>
    </div>
  );
};
