import React, { useState } from 'react';
import { GUIDE_POINTS } from '../data/mockData';
import { NavTab } from '../types';

interface MemberGuideScreenProps {
  onNavigate: (tab: NavTab) => void;
}

export const MemberGuideScreen: React.FC<MemberGuideScreenProps> = ({ onNavigate }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div id="member-guide-screen" className="space-y-6 pb-12 animate-fadeIn max-w-4xl mx-auto">
      {/* Title Header */}
      <div className="pt-1">
        <h1 className="font-extrabold text-[22px] sm:text-[28px] text-[#0b1c30] tracking-tight leading-tight uppercase">
          Guía para todos los miembros
        </h1>
        <p className="text-[#5b403d] text-[14px] sm:text-[16px] font-medium mt-0.5">
          Página 17 de 'El Combo'
        </p>
      </div>

      {/* Intro context banner */}
      <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-[13px] sm:text-[14px] text-slate-700 flex items-start gap-2.5">
        <span className="material-symbols-outlined text-blue-700 text-[18px] sm:text-[22px] shrink-0 mt-0.5">
          auto_stories
        </span>
        <p>
          Esta guía resume las sugerencias prácticas probadas por miembros con años de abstinencia continuada. Practicarlas diariamente es el camino seguro para no volver a apostar.
        </p>
      </div>

      {/* Grid of 8 Points */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3.5">
        {GUIDE_POINTS.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              onClick={() => toggleExpand(item.id)}
              className={`bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border shadow-xs transition-all cursor-pointer flex flex-col justify-between ${
                isExpanded
                  ? 'border-red-300 ring-2 ring-red-100 shadow-sm'
                  : 'border-slate-200/80 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Number Badge */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 bg-[#d5e0f8] text-[#3c475a] rounded-full flex items-center justify-center font-bold text-[14px] sm:text-[16px]">
                  {item.id}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-[14px] sm:text-[16px] text-[#0b1c30] leading-snug mb-0.5">
                    {item.title}
                  </h2>
                  <p className="text-[#545f73] text-[13px] sm:text-[14px] leading-relaxed">
                    {item.description}
                  </p>

                  {/* Expandable reflection */}
                  {isExpanded && item.deepExplanation && (
                    <div className="mt-2.5 pt-2.5 border-t border-slate-100 text-[12px] sm:text-[13px] text-slate-600 bg-slate-50 p-2 rounded-lg animate-fadeIn">
                      <span className="font-bold text-slate-800 block mb-0.5">Reflexión práctica:</span>
                      {item.deepExplanation}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-1.5 text-right">
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 hover:text-slate-600">
                  {isExpanded ? 'Mostrar menos' : 'Toca para reflexionar'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation shortcuts */}
      <div className="pt-4 flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => onNavigate('pasos')}
          className="flex-1 bg-white hover:bg-slate-50 border border-slate-200 text-[#0b1c30] p-4 rounded-2xl font-bold text-[14px] flex items-center justify-between shadow-sm transition-all"
        >
          <span>Ver los 12 Pasos de Recuperación</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
        <button
          onClick={() => onNavigate('preguntas')}
          className="flex-1 bg-white hover:bg-slate-50 border border-slate-200 text-[#0b1c30] p-4 rounded-2xl font-bold text-[14px] flex items-center justify-between shadow-sm transition-all"
        >
          <span>Cuestionario de 20 Preguntas</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
