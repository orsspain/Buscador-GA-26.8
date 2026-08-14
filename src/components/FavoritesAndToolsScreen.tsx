import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { MEETINGS_DATA, TWENTY_QUESTIONS, TWELVE_STEPS_RECOVERY, TWELVE_STEPS_UNITY } from '../data/mockData';
import { NavTab, Meeting } from '../types';

interface FavoritesAndToolsScreenProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onNavigate: (tab: NavTab) => void;
  onOpenCrisis: () => void;
  initialSubTab?: 'favoritos' | 'contador' | 'preguntas' | 'pasos';
}

export const FavoritesAndToolsScreen: React.FC<FavoritesAndToolsScreenProps> = ({
  favorites,
  onToggleFavorite,
  onNavigate,
  onOpenCrisis,
  initialSubTab = 'favoritos',
}) => {
  const [subTab, setSubTab] = useState<'favoritos' | 'contador' | 'preguntas' | 'pasos'>(initialSubTab);

  // Sobriety date state (persisted in localStorage)
  const [cleanDate, setCleanDate] = useState<string>(() => {
    return localStorage.getItem('ja_clean_date') || '';
  });
  const [cleanDays, setCleanDays] = useState<number>(0);

  // 20 Questions answers state
  const [answers, setAnswers] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem('ja_20_questions');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [stepsType, setStepsType] = useState<'recovery' | 'unity'>('recovery');

  useEffect(() => {
    if (cleanDate) {
      const start = new Date(cleanDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, Math.floor((now - start) / (1000 * 60 * 60 * 24)));
      setCleanDays(diff);
      localStorage.setItem('ja_clean_date', cleanDate);
    }
  }, [cleanDate]);

  const handleCelebrate = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const favoriteMeetings = MEETINGS_DATA.filter((m) => favorites.includes(m.id));

  // 20 questions calculation
  const yesCount = Object.values(answers).filter(Boolean).length;
  const answeredCount = Object.keys(answers).length;

  const toggleAnswer = (id: number, val: boolean) => {
    const next = { ...answers, [id]: val };
    setAnswers(next);
    localStorage.setItem('ja_20_questions', JSON.stringify(next));
  };

  const resetQuestions = () => {
    setAnswers({});
    localStorage.removeItem('ja_20_questions');
  };

  return (
    <div id="favorites-tools-screen" className="space-y-5 pb-14 animate-fadeIn max-w-4xl mx-auto">
      {/* Subtab Navigation Pills */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar border-b border-slate-200 pt-0.5">
        <button
          onClick={() => setSubTab('favoritos')}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all ${
            subTab === 'favoritos'
              ? 'bg-[#af101a] text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Mis Reuniones ({favoriteMeetings.length})
        </button>
        <button
          onClick={() => setSubTab('contador')}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all ${
            subTab === 'contador'
              ? 'bg-[#af101a] text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Solo por Hoy
        </button>
        <button
          onClick={() => setSubTab('preguntas')}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all ${
            subTab === 'preguntas'
              ? 'bg-[#af101a] text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          20 Preguntas ({yesCount}/20)
        </button>
        <button
          onClick={() => setSubTab('pasos')}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all ${
            subTab === 'pasos'
              ? 'bg-[#af101a] text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          12 Pasos
        </button>
      </div>

      {/* SUBTAB 1: FAVORITES */}
      {subTab === 'favoritos' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg text-slate-900">Reuniones Guardadas</h2>
            <button
              onClick={() => onNavigate('reuniones')}
              className="text-xs font-bold text-[#af101a] hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              Explorar más reuniones
            </button>
          </div>

          {favoriteMeetings.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
              <div className="w-12 h-12 rounded-full bg-red-50 text-[#af101a] flex items-center justify-center mx-auto mb-3">
                <span className="material-symbols-outlined text-[24px]">favorite</span>
              </div>
              <h3 className="font-bold text-slate-800 text-base mb-1">Aún no tienes reuniones favoritas</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto mb-4">
                Marca el ícono de corazón en cualquier reunión para acceder rápidamente a sus enlaces de Zoom o direcciones.
              </p>
              <button
                onClick={() => onNavigate('reuniones')}
                className="bg-[#af101a] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm hover:bg-[#930010]"
              >
                Buscar Reuniones
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {favoriteMeetings.map((m) => (
                <div
                  key={m.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 uppercase">
                        {m.dayName} · {m.time}
                      </span>
                      <h3 className="font-bold text-base text-slate-900 mt-1">{m.name}</h3>
                      <p className="text-xs text-slate-500">{m.city}, {m.country}</p>
                    </div>
                    <button
                      onClick={() => onToggleFavorite(m.id)}
                      className="text-[#af101a] p-1.5 hover:bg-red-50 rounded-full"
                      title="Quitar de favoritos"
                    >
                      <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        favorite
                      </span>
                    </button>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-100">
                    {m.zoomUrl ? (
                      <a
                        href={m.zoomUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#af101a] text-white px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-[16px]">videocam</span>
                        Entrar a Zoom
                      </a>
                    ) : (
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(`${m.address}, ${m.city}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-slate-900 text-white px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-[16px]">map</span>
                        Ver en Mapa
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 2: CONTADOR DE SOBRIEDAD */}
      {subTab === 'contador' && (
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-4 sm:space-y-6 text-center">
          <div>
            <span className="text-[10px] sm:text-xs font-bold text-red-700 uppercase tracking-widest bg-red-50 px-2.5 py-0.5 rounded-full">
              Programa Solo por Hoy
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1.5">
              Contador de Abstinencia y Serenidad
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              "Un día a la vez. No importa cuántos días lleves, lo fundamental son las próximas 24 horas."
            </p>
          </div>

          {/* Clean Token Badge */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-1.5 shadow-md flex items-center justify-center text-white">
            <div className="w-full h-full rounded-full border-2 sm:border-4 border-dashed border-amber-200/80 flex flex-col items-center justify-center bg-gradient-to-br from-red-800 to-red-950 p-2">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-300">
                Solo Por Hoy
              </span>
              <span className="text-3xl sm:text-4xl font-black font-mono my-0.5 tracking-tight">
                {cleanDays}
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-amber-200">
                {cleanDays === 1 ? 'Día Limpio' : 'Días Limpios'}
              </span>
            </div>
          </div>

          <div className="max-w-xs mx-auto space-y-2.5">
            <label className="block text-xs font-bold text-slate-700 text-left">
              Selecciona tu fecha de última apuesta / inicio:
            </label>
            <input
              type="date"
              value={cleanDate}
              onChange={(e) => setCleanDate(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-red-200"
            />

            <button
              onClick={handleCelebrate}
              className="w-full bg-[#af101a] hover:bg-[#930010] text-white py-2 rounded-xl font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">celebration</span>
              Celebrar mi recuperación
            </button>
          </div>

          {/* Milestones chips */}
          <div className="pt-3 border-t border-slate-100">
            <h4 className="font-bold text-[11px] text-slate-700 mb-2 uppercase tracking-wider">
              Fichas de Recuperación J.A.
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px] sm:text-xs">
              <div className={`p-2 sm:p-2.5 rounded-xl border ${cleanDays >= 1 ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                24 Horas
              </div>
              <div className={`p-2 sm:p-2.5 rounded-xl border ${cleanDays >= 30 ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                30 Días
              </div>
              <div className={`p-2 sm:p-2.5 rounded-xl border ${cleanDays >= 90 ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                90 Días
              </div>
              <div className={`p-2 sm:p-2.5 rounded-xl border ${cleanDays >= 365 ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                1 Año
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: 20 PREGUNTAS */}
      {subTab === 'preguntas' && (
        <div className="space-y-3">
          <div className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-slate-200 shadow-sm">
            <h2 className="font-bold text-base sm:text-lg text-slate-900 mb-1">
              Las 20 Preguntas de Jugadores Anónimos
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed mb-2.5">
              ¿Es usted un jugador compulsivo? La mayoría de los jugadores compulsivos responderán <strong>SÍ</strong> al menos a <strong>7</strong> de estas preguntas.
            </p>

            {/* Score pill */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-2.5 sm:p-3 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-600 block">Respuestas afirmativas:</span>
                <span className="text-xl font-black text-[#af101a]">{yesCount} de 20</span>
              </div>
              <div className="text-right">
                {yesCount >= 7 ? (
                  <span className="bg-[#af101a] text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    Indica juego compulsivo
                  </span>
                ) : (
                  <span className="bg-slate-200 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-md">
                    {answeredCount === 20 ? 'Bajo índice' : 'Completa el test'}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* List of 20 Questions */}
          <div className="space-y-2">
            {TWENTY_QUESTIONS.map((q) => {
              const currentVal = answers[q.id];
              return (
                <div
                  key={q.id}
                  className="bg-white rounded-xl sm:rounded-2xl p-3 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                      {q.id}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-800 font-medium leading-snug">
                      {q.text}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => toggleAnswer(q.id, true)}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                        currentVal === true
                          ? 'bg-[#af101a] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      SÍ
                    </button>
                    <button
                      onClick={() => toggleAnswer(q.id, false)}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                        currentVal === false
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      NO
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-1">
            <button
              onClick={resetQuestions}
              className="text-xs text-slate-500 hover:text-slate-800 underline font-medium"
            >
              Reiniciar respuestas
            </button>
            <button
              onClick={onOpenCrisis}
              className="bg-[#af101a] text-white text-xs font-bold px-3 py-1.5 rounded-lg"
            >
              Hablar con un compañero
            </button>
          </div>
        </div>
      )}

      {/* SUBTAB 4: 12 PASOS */}
      {subTab === 'pasos' && (
        <div className="space-y-3">
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setStepsType('recovery')}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                stepsType === 'recovery' ? 'bg-white text-[#0b1c30] shadow-xs' : 'text-slate-600'
              }`}
            >
              12 Pasos de Recuperación
            </button>
            <button
              onClick={() => setStepsType('unity')}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                stepsType === 'unity' ? 'bg-white text-[#0b1c30] shadow-xs' : 'text-slate-600'
              }`}
            >
              12 Pasos de Unidad
            </button>
          </div>

          <div className="space-y-2">
            {(stepsType === 'recovery' ? TWELVE_STEPS_RECOVERY : TWELVE_STEPS_UNITY).map((step) => (
              <div
                key={step.number}
                className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-3.5 border border-slate-200 shadow-xs flex items-start gap-2.5 sm:gap-3"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#d5e0f8] text-[#3c475a] flex items-center justify-center font-bold text-xs sm:text-sm shrink-0">
                  {step.number}
                </div>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 mb-0.5">{step.title}</h3>
                  <p className="text-[12px] sm:text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
