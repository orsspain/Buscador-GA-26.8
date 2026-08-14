import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';

interface AssistantScreenProps {
  onOpenCrisis: () => void;
  onNavigateToMeetings: () => void;
  onNavigateToQuestions: () => void;
}

export const AssistantScreen: React.FC<AssistantScreenProps> = ({
  onOpenCrisis,
  onNavigateToMeetings,
  onNavigateToQuestions,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: '¿En qué te puedo ayudar hoy? Puedes preguntarme sobre reuniones presenciales o en línea, el programa de recuperación o cómo sobrellevar un momento difícil.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        throw new Error('Error de conexión');
      }

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || 'Estoy aquí contigo. Recuerda que no estás solo y que el deseo de jugar pasará un momento a la vez.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'No estás solo en este momento. Si necesitas hablar urgentemente con un compañero de Jugadores Anónimos, puedes llamar a la línea de ayuda 24h: +34 670 691 513 o conectarte a una reunión de Zoom.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="assistant-screen-container" className="flex flex-col h-[calc(100vh-145px)] max-w-3xl mx-auto">
      {/* Scrollable Chat Area */}
      <div className="flex-1 overflow-y-auto px-1 py-4 space-y-5">
        {/* Welcome Avatar & Header */}
        <div className="flex flex-col items-center justify-center py-4 text-center">
          <div className="w-16 h-16 bg-[#d3e4fe] rounded-full flex items-center justify-center mb-3 shadow-sm text-[#af101a]">
            <span className="material-symbols-outlined text-[34px]">smart_toy</span>
          </div>
          <h2 className="font-bold text-[20px] text-[#0b1c30] mb-1.5">
            Hola, estoy aquí para ayudarte.
          </h2>
          <p className="text-[#545f73] text-[14px] max-w-md mx-auto leading-relaxed">
            Soy tu asistente virtual de Jugadores Anónimos. Puedes preguntarme sobre reuniones, literatura o simplemente desahogarte si sientes ganas de jugar.
          </p>
        </div>

        {/* Suggested Prompt Cards (Bento Style) */}
        {messages.length <= 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-3">
            <button
              onClick={() => handleSendMessage('¿Qué reuniones hay hoy cerca de mí?')}
              className="bg-white hover:bg-slate-50 transition-colors p-4 rounded-2xl text-left flex flex-col justify-between min-h-[92px] border border-slate-200 shadow-sm group active:scale-[0.99]"
            >
              <span className="font-semibold text-[14px] text-[#0b1c30]">
                ¿Qué reuniones hay hoy cerca de mí?
              </span>
              <div className="flex justify-end mt-2">
                <span className="material-symbols-outlined text-slate-400 group-hover:text-[#af101a] transition-colors text-[20px]">
                  arrow_forward
                </span>
              </div>
            </button>

            <button
              onClick={() => handleSendMessage('¿Hay alguna reunión en línea por Zoom ahora?')}
              className="bg-white hover:bg-slate-50 transition-colors p-4 rounded-2xl text-left flex flex-col justify-between min-h-[92px] border border-slate-200 shadow-sm group active:scale-[0.99]"
            >
              <span className="font-semibold text-[14px] text-[#0b1c30]">
                ¿Hay alguna reunión en línea ahora?
              </span>
              <div className="flex justify-end mt-2">
                <span className="material-symbols-outlined text-slate-400 group-hover:text-[#af101a] transition-colors text-[20px]">
                  arrow_forward
                </span>
              </div>
            </button>

            <button
              onClick={() => {
                onOpenCrisis();
              }}
              className="bg-red-50/70 hover:bg-red-100/80 transition-colors p-4 rounded-2xl text-left flex flex-col justify-between min-h-[92px] border border-red-200 shadow-sm group active:scale-[0.99] sm:col-span-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-[14px] text-red-900">
                  Necesito hablar con alguien con urgencia.
                </span>
                <span className="material-symbols-outlined text-[#af101a] text-[22px]">
                  support_agent
                </span>
              </div>
              <span className="text-[12px] text-red-700 mt-1">
                Abrir línea directa 24 horas y ejercicios para surfear el impulso
              </span>
            </button>
          </div>
        )}

        {/* Message History */}
        <div className="space-y-3.5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-[#d3e4fe] flex-shrink-0 flex items-center justify-center text-[#af101a] mt-0.5">
                  <span className="material-symbols-outlined text-[18px]">smart_toy</span>
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 sm:p-4 text-[14px] sm:text-[15px] leading-relaxed shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-[#0b1c30] text-white rounded-tr-none'
                    : 'bg-white text-[#0b1c30] border border-slate-200/90 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
                <div
                  className={`text-[10px] mt-1.5 text-right ${
                    msg.role === 'user' ? 'text-slate-300' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {/* Loading bubble */}
          {isLoading && (
            <div className="flex gap-2.5 justify-start">
              <div className="w-8 h-8 rounded-full bg-[#d3e4fe] flex-shrink-0 flex items-center justify-center text-[#af101a]">
                <span className="material-symbols-outlined text-[18px] animate-spin">autorenew</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-3.5 text-slate-500 text-[13px] flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[#af101a] animate-ping" />
                <span>Pensando respuesta...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Bar */}
      <div className="bg-[#f8f9ff] border-t border-slate-200/80 pt-2 pb-1 sticky bottom-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 bg-white rounded-full p-1.5 border border-slate-300 shadow-sm focus-within:border-[#af101a] focus-within:ring-2 focus-within:ring-red-100 transition-all"
        >
          <button
            type="button"
            onClick={onOpenCrisis}
            title="Línea de Ayuda 24h"
            className="w-10 h-10 flex items-center justify-center rounded-full text-red-600 hover:bg-red-50 transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-[22px]">phone_in_talk</span>
          </button>

          <input
            id="chat-user-input"
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Escribe un mensaje o pregunta..."
            className="flex-grow bg-transparent border-none focus:outline-none focus:ring-0 text-[15px] text-[#0b1c30] placeholder:text-slate-400 px-2 py-2"
          />

          <button
            id="chat-submit-button"
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#af101a] text-white hover:bg-[#930010] disabled:opacity-40 disabled:hover:bg-[#af101a] transition-colors shrink-0 shadow-sm active:scale-95"
            aria-label="Enviar mensaje"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
