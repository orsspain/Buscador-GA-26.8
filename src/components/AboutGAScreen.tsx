import React from 'react';
import { NavTab } from '../types';
import { GALogo } from './GALogo';

interface AboutGAScreenProps {
  onNavigate: (tab: NavTab) => void;
  onOpenCrisis: () => void;
}

export const AboutGAScreen: React.FC<AboutGAScreenProps> = ({ onNavigate, onOpenCrisis }) => {
  return (
    <div id="about-ga-screen" className="space-y-5 pb-12 animate-fadeIn max-w-3xl mx-auto">
      {/* Hero Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
        <div className="w-16 h-14 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center p-2 mb-1 shadow-xs">
          <GALogo className="w-full h-full" />
        </div>
        <h2 className="font-extrabold text-2xl text-[#0b1c30]">
          ¿Qué es Jugadores Anónimos?
        </h2>
        <p className="text-sm text-[#545f73] leading-relaxed">
          Jugadores Anónimos (J.A.) es una comunidad de hombres y mujeres que comparten su mutua experiencia, fuerza y esperanza para resolver su problema común y ayudar a otros a recuperarse del juego compulsivo.
        </p>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-[#af101a]">
            <span className="material-symbols-outlined text-[22px]">verified_user</span>
            <h3 className="font-bold text-base text-slate-900">Único Requisito</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            El único requisito para ser miembro de Jugadores Anónimos es el <strong>deseo de dejar de jugar</strong>. No hay cuotas ni honorarios.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-[#af101a]">
            <span className="material-symbols-outlined text-[22px]">visibility_off</span>
            <h3 className="font-bold text-base text-slate-900">Total Anonimato</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Todo lo que se comparte en una reunión es estrictamente confidencial. Protegemos la identidad y dignidad de cada miembro.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-[#af101a]">
            <span className="material-symbols-outlined text-[22px]">groups</span>
            <h3 className="font-bold text-base text-slate-900">¿Cómo son las reuniones?</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Son espacios seguros donde los miembros comparten sus testimonios de recuperación. Nadie te obligará a hablar si no lo deseas.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-[#af101a]">
            <span className="material-symbols-outlined text-[22px]">menu_book</span>
            <h3 className="font-bold text-base text-slate-900">El Libro 'El Combo'</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Es el texto fundamental de J.A., con la definición de la enfermedad, la Guía para todos los miembros y el programa de recuperación.
          </p>
        </div>
      </div>

      {/* Next steps CTA */}
      <div className="bg-[#eff4ff] border border-blue-200 rounded-2xl p-5 space-y-3">
        <h4 className="font-bold text-base text-[#0b1c30]">¿Quieres dar el primer paso hoy?</h4>
        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={() => onNavigate('reuniones')}
            className="flex-1 bg-[#af101a] hover:bg-[#930010] text-white py-2.5 px-4 rounded-xl text-xs font-bold shadow-sm transition-all text-center"
          >
            Buscar una reunión cercana o por Zoom
          </button>
          <button
            onClick={onOpenCrisis}
            className="flex-1 bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 py-2.5 px-4 rounded-xl text-xs font-bold transition-all text-center"
          >
            Llamar al teléfono de ayuda 24h
          </button>
        </div>
      </div>
    </div>
  );
};
