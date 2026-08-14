import React, { useState } from 'react';
import { OFFICIAL_WEBSITES } from '../data/mockData';

export const OfficialWebsitesScreen: React.FC = () => {
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone.replace(/\s+/g, ''));
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  return (
    <div id="official-websites-screen" className="space-y-5 pb-12 animate-fadeIn max-w-3xl mx-auto">
      {/* Intro text */}
      <div className="pt-2">
        <p className="text-[#545f73] text-[16px] leading-relaxed">
          Sitios web oficiales y líneas telefónicas de Jugadores Anónimos en países de habla hispana.
        </p>
      </div>

      {/* Websites List */}
      <div className="flex flex-col gap-3">
        {OFFICIAL_WEBSITES.map((site) => (
          <div
            key={site.id}
            className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/80 hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
          >
            <div className="flex items-center gap-3.5">
              <span className="text-2xl sm:text-3xl shrink-0">{site.flag}</span>
              <div>
                <h3 className="font-bold text-[18px] text-[#0b1c30] group-hover:text-[#af101a] transition-colors leading-tight">
                  {site.country}
                </h3>
                <p className="text-xs text-[#545f73] mt-0.5">{site.name}</p>
                <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-600">
                  <span className="material-symbols-outlined text-[14px] text-red-600">call</span>
                  <span className="font-semibold">{site.phone}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 justify-end">
              <a
                href={`tel:${site.phone.replace(/\s+/g, '')}`}
                className="px-3 py-2 bg-red-50 text-[#af101a] hover:bg-red-100 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
                title="Llamar teléfono de ayuda"
              >
                <span className="material-symbols-outlined text-[16px]">call</span>
                Llamar
              </a>
              <button
                onClick={() => handleCopyPhone(site.phone)}
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors text-xs flex items-center"
                title="Copiar teléfono"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {copiedPhone === site.phone ? 'check' : 'content_copy'}
                </span>
              </button>
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0b1c30] hover:bg-slate-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
              >
                <span>Visitar Web</span>
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Confidentiality Notice */}
      <div className="bg-slate-100/80 rounded-2xl p-4 text-[13px] text-slate-600 text-center">
        <p>
          Jugadores Anónimos es una fraternidad totalmente anónima, independiente y sin cuotas obligatorias. Los enlaces dirigen a las estructuras de servicio oficiales de cada país.
        </p>
      </div>
    </div>
  );
};
