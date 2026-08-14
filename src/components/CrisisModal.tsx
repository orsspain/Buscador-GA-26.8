import React, { useState, useEffect } from 'react';
import { OFFICIAL_WEBSITES } from '../data/mockData';

interface CrisisModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToZoom?: () => void;
}

export const CrisisModal: React.FC<CrisisModalProps> = ({
  isOpen,
  onClose,
  onNavigateToZoom,
}) => {
  const [activeTab, setActiveTab] = useState<'telefono' | 'respiracion' | 'internacional'>('telefono');
  const [timerSeconds, setTimerSeconds] = useState(300); // 5 minutes urge surfing
  const [timerRunning, setTimerRunning] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhala' | 'Mantén' | 'Exhala'>('Inhala');

  useEffect(() => {
    let interval: any = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  // Breathing loop animation timing
  useEffect(() => {
    if (!isOpen || activeTab !== 'respiracion') return;
    const interval = setInterval(() => {
      setBreathPhase((prev) => {
        if (prev === 'Inhala') return 'Mantén';
        if (prev === 'Mantén') return 'Exhala';
        return 'Inhala';
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div
      id="crisis-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div
        id="crisis-modal-container"
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-red-100 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-[#af101a] text-white p-5 flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[24px]">call</span>
            </div>
            <div>
              <h2 className="font-bold text-[19px] leading-tight">Línea de Ayuda y Emergencia</h2>
              <p className="text-red-100 text-[13px]">No estás solo. Hay ayuda disponible ahora mismo.</p>
            </div>
          </div>
          <button
            id="crisis-modal-close-btn"
            onClick={onClose}
            aria-label="Cerrar modal de ayuda"
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-[13px] font-semibold text-slate-600">
          <button
            onClick={() => setActiveTab('telefono')}
            className={`flex-1 py-3 text-center border-b-2 transition-colors ${
              activeTab === 'telefono'
                ? 'border-[#af101a] text-[#af101a] bg-white'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Llamada 24h
          </button>
          <button
            onClick={() => setActiveTab('respiracion')}
            className={`flex-1 py-3 text-center border-b-2 transition-colors ${
              activeTab === 'respiracion'
                ? 'border-[#af101a] text-[#af101a] bg-white'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Surfear el Deseo (5 min)
          </button>
          <button
            onClick={() => setActiveTab('internacional')}
            className={`flex-1 py-3 text-center border-b-2 transition-colors ${
              activeTab === 'internacional'
                ? 'border-[#af101a] text-[#af101a] bg-white'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Por Países
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'telefono' && (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                <p className="text-xs font-bold uppercase tracking-wider text-red-800 mb-1">
                  Atención Inmediata en España
                </p>
                <a
                  id="direct-call-spain"
                  href="tel:+34670691513"
                  className="inline-flex items-center gap-2 font-bold text-2xl text-[#af101a] hover:underline my-1"
                >
                  <span className="material-symbols-outlined text-2xl">call</span>
                  +34 670 691 513
                </a>
                <p className="text-[13px] text-slate-600 mt-1">
                  Línea atendida por miembros en recuperación de Jugadores Anónimos.
                </p>
                <div className="mt-3 flex gap-2 justify-center">
                  <a
                    href="tel:+34670691513"
                    className="bg-[#af101a] hover:bg-[#930010] text-white px-5 py-2.5 rounded-xl font-bold text-sm inline-flex items-center gap-2 shadow-sm active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-[18px]">phone_enabled</span>
                    Llamar Ahora
                  </a>
                </div>
              </div>

              {/* Immediate Steps during Urge */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-amber-600 text-lg">lightbulb</span>
                  ¿Tienes un impulso fuerte de jugar en este momento?
                </h4>
                <ul className="text-[13px] text-slate-700 space-y-1.5 list-disc list-inside">
                  <li><strong>Aléjate del dinero:</strong> Entrega tus tarjetas o dinero a alguien de confianza.</li>
                  <li><strong>Cambia de entorno:</strong> Sal a caminar o ve a un lugar seguro donde no haya juego.</li>
                  <li><strong>Pide ayuda:</strong> Llama a tu padrino/madrina o a un compañero de J.A.</li>
                  <li><strong>Entra a una reunión:</strong> Conéctate a una sala de Zoom abierta.</li>
                </ul>
              </div>

              {onNavigateToZoom && (
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToZoom();
                  }}
                  className="w-full bg-[#e5eeff] hover:bg-[#dce9ff] text-[#0b1c30] p-3 rounded-xl font-semibold text-sm flex items-center justify-between transition-colors border border-blue-200"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-700">videocam</span>
                    <span>Buscar reunión de Zoom activa hoy</span>
                  </div>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              )}
            </div>
          )}

          {activeTab === 'respiracion' && (
            <div className="text-center space-y-4 py-2">
              <div className="max-w-xs mx-auto">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Técnica de Pausa Consciente
                </p>
                <p className="text-sm text-slate-700 mt-1">
                  Los impulsos de jugar son como olas: aumentan, llegan a un pico y luego disminuyen. Solo necesitas resistir los próximos minutos.
                </p>
              </div>

              {/* Visual Breathing Bubble */}
              <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
                <div
                  className={`w-36 h-36 rounded-full bg-red-100/80 border-4 border-red-400 flex flex-col items-center justify-center transition-all duration-1000 ${
                    breathPhase === 'Inhala'
                      ? 'scale-110 bg-red-200/90'
                      : breathPhase === 'Mantén'
                      ? 'scale-105 bg-amber-100/90 border-amber-400'
                      : 'scale-90 bg-blue-100/80 border-blue-400'
                  }`}
                >
                  <span className="font-bold text-lg text-slate-800 tracking-wide">{breathPhase}</span>
                  <span className="text-xs text-slate-500 mt-0.5">Respira hondo</span>
                </div>
              </div>

              {/* 5-minute Countdown timer */}
              <div className="bg-slate-100 rounded-xl p-3 inline-block px-6">
                <div className="text-2xl font-black font-mono text-slate-900 tracking-wider">
                  {formatTimer(timerSeconds)}
                </div>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <button
                    onClick={() => setTimerRunning(!timerRunning)}
                    className="bg-[#af101a] text-white text-xs font-bold px-3 py-1 rounded-lg hover:bg-red-800 transition-colors"
                  >
                    {timerRunning ? 'Pausar' : 'Iniciar 5 Min'}
                  </button>
                  <button
                    onClick={() => {
                      setTimerRunning(false);
                      setTimerSeconds(300);
                    }}
                    className="bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-1 rounded-lg hover:bg-slate-300 transition-colors"
                  >
                    Reiniciar
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-500 italic">
                "Solo por este momento, decido no apostar."
              </p>
            </div>
          )}

          {activeTab === 'internacional' && (
            <div className="space-y-2.5">
              <p className="text-xs text-slate-600 font-medium">
                Teléfonos de ayuda y enlaces oficiales en tu país:
              </p>
              <div className="space-y-2">
                {OFFICIAL_WEBSITES.map((site) => (
                  <div
                    key={site.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{site.flag}</span>
                      <div>
                        <div className="font-bold text-sm text-slate-900">{site.country}</div>
                        <div className="text-xs text-slate-500">{site.name}</div>
                      </div>
                    </div>
                    <a
                      href={`tel:${site.phone.replace(/\s+/g, '')}`}
                      className="bg-red-50 text-[#af101a] hover:bg-red-100 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 border border-red-200"
                    >
                      <span className="material-symbols-outlined text-[16px]">call</span>
                      {site.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center">
          <p className="text-xs text-slate-500">
            Jugadores Anónimos es una comunidad libre, gratuita y confidencial.
          </p>
        </div>
      </div>
    </div>
  );
};
