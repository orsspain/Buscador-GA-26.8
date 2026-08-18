import React, { useState, useMemo, useEffect } from 'react';
import { MEETINGS_DATA } from '../data/mockData';
import { Meeting } from '../types';
import { getSpainTimeLabel } from '../timeZoneUtils';

interface MeetingsScreenProps {
  initialFilter?: 'todas' | 'cerca' | 'zoom';
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onOpenCrisis: () => void;
}

export const MeetingsScreen: React.FC<MeetingsScreenProps> = ({
  initialFilter = 'todas',
  favorites,
  onToggleFavorite,
  onOpenCrisis,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('todos');
  const [selectedType, setSelectedType] = useState<'todas' | 'zoom' | 'presencial' | 'cerca'>(
    initialFilter === 'zoom' ? 'zoom' : initialFilter === 'cerca' ? 'cerca' : 'todas'
  );
  const [selectedDay, setSelectedDay] = useState<number | 'todos'>('todos');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Available countries
  const availableCountries = useMemo(() => {
    const set = new Set<string>();
    MEETINGS_DATA.forEach((m) => {
      if (m.country) set.add(m.country);
    });
    return Array.from(set).sort();
  }, []);

  // Get current day of week (0=Sunday, 1=Monday...)
  const currentDayIndex = new Date().getDay();

  // Geolocation request
  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('La geolocalización no es compatible con este navegador.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationError(null);
      },
      (err) => {
        setLocationError('No se pudo acceder a la ubicación. Mostrando todas las reuniones.');
        console.warn(err);
      }
    );
  };

  useEffect(() => {
    if (selectedType === 'cerca') {
      requestLocation();
    }
  }, [selectedType]);

  // Haversine distance calculator
  const calculateDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  };

  const filteredMeetings = useMemo(() => {
    return MEETINGS_DATA.filter((m) => {
      // Country filter
      if (selectedCountry !== 'todos' && m.country !== selectedCountry) return false;

      // Type filter
      if (selectedType === 'zoom' && m.type !== 'zoom' && m.type !== 'hibrida') return false;
      if (selectedType === 'presencial' && m.type !== 'presencial' && m.type !== 'hibrida') return false;

      // Day filter
      if (selectedDay !== 'todos' && m.dayOfWeek !== selectedDay) return false;

      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchName = m.name.toLowerCase().includes(query);
        const matchCity = m.city.toLowerCase().includes(query);
        const matchCountry = m.country.toLowerCase().includes(query);
        const matchAddress = m.address?.toLowerCase().includes(query) || false;
        const matchDay = m.dayName.toLowerCase().includes(query);
        if (!matchName && !matchCity && !matchCountry && !matchAddress && !matchDay) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      // If user location is active, sort presencial by distance
      if (userLocation && a.coordinates && b.coordinates) {
        const distA = calculateDistanceKm(userLocation.lat, userLocation.lng, a.coordinates.lat, a.coordinates.lng);
        const distB = calculateDistanceKm(userLocation.lat, userLocation.lng, b.coordinates.lat, b.coordinates.lng);
        return distA - distB;
      }
      return 0;
    });
  }, [searchTerm, selectedCountry, selectedType, selectedDay, userLocation]);

  const handleCopyLink = (m: Meeting) => {
    const text = m.zoomUrl || `${m.name} - ${m.address}, ${m.city} (${m.dayName} a las ${m.time})`;
    navigator.clipboard.writeText(text);
    setCopiedId(m.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const daysLabels = [
    { label: 'Todos', value: 'todos' as const },
    { label: 'Hoy', value: currentDayIndex },
    { label: 'Lunes', value: 1 },
    { label: 'Martes', value: 2 },
    { label: 'Miércoles', value: 3 },
    { label: 'Jueves', value: 4 },
    { label: 'Viernes', value: 5 },
    { label: 'Sábado', value: 6 },
    { label: 'Domingo', value: 0 },
  ];

  return (
    <div id="meetings-screen-container" className="space-y-4 pb-12 animate-fadeIn max-w-4xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
          search
        </span>
        <input
          id="meetings-search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por ciudad, grupo, día..."
          className="w-full pl-10 pr-10 py-3 bg-white rounded-2xl border border-slate-200 shadow-sm text-[15px] focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#af101a] transition-all"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        )}
      </div>

      {/* Modality Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setSelectedType('todas')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
            selectedType === 'todas'
              ? 'bg-[#af101a] text-white shadow-sm'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Todas ({MEETINGS_DATA.length})
        </button>
        <button
          onClick={() => setSelectedType('zoom')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1 transition-all ${
            selectedType === 'zoom'
              ? 'bg-[#af101a] text-white shadow-sm'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">videocam</span>
          En línea / Zoom
        </button>
        <button
          onClick={() => setSelectedType('presencial')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1 transition-all ${
            selectedType === 'presencial'
              ? 'bg-[#af101a] text-white shadow-sm'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">pin_drop</span>
          Presenciales
        </button>
        <button
          onClick={() => setSelectedType('cerca')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1 transition-all ${
            selectedType === 'cerca'
              ? 'bg-[#af101a] text-white shadow-sm'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">my_location</span>
          Cerca de mí
        </button>
      </div>

      {/* Country Filter Chips */}
      {availableCountries.length > 1 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <button
            onClick={() => setSelectedCountry('todos')}
            className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedCountry === 'todos'
                ? 'bg-slate-800 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todos los países
          </button>
          {availableCountries.map((country) => (
            <button
              key={country}
              onClick={() => setSelectedCountry(country)}
              className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCountry === country
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {country}
            </button>
          ))}
        </div>
      )}

      {/* Days Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {daysLabels.map((d) => (
          <button
            key={String(d.value)}
            onClick={() => setSelectedDay(d.value)}
            className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedDay === d.value
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {locationError && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">info</span>
          <span>{locationError}</span>
        </div>
      )}

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Mostrando {filteredMeetings.length} reuniones</span>
        <button
          onClick={onOpenCrisis}
          className="text-red-700 font-bold hover:underline flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[14px]">call</span>
          ¿Necesitas ayuda urgente?
        </button>
      </div>

      {/* Meeting Cards List */}
      <div className="space-y-3">
        {filteredMeetings.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
              <span className="material-symbols-outlined text-[24px]">event_busy</span>
            </div>
            <h3 className="font-bold text-slate-800 text-base mb-1">No se encontraron reuniones</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto mb-4">
              Prueba cambiando los filtros de día o busca otra ciudad. Recuerda que las reuniones en línea por Zoom están abiertas todos los días.
            </p>
            <button
              onClick={() => {
                setSelectedType('zoom');
                setSelectedDay('todos');
                setSearchTerm('');
              }}
              className="bg-[#af101a] text-white text-xs font-bold px-4 py-2 rounded-xl"
            >
              Ver Reuniones en Zoom
            </button>
          </div>
        ) : (
          filteredMeetings.map((meeting) => {
            const isFav = favorites.includes(meeting.id);
            const distance =
              userLocation && meeting.coordinates
                ? calculateDistanceKm(
                    userLocation.lat,
                    userLocation.lng,
                    meeting.coordinates.lat,
                    meeting.coordinates.lng
                  )
                : null;

            return (
              <div
                key={meeting.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm hover:border-slate-300 transition-all space-y-3 group"
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                          meeting.type === 'zoom'
                            ? 'bg-blue-100 text-blue-800'
                            : meeting.type === 'hibrida'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {meeting.type === 'zoom'
                          ? 'En línea (Zoom)'
                          : meeting.type === 'hibrida'
                          ? 'Híbrida'
                          : 'Presencial'}
                      </span>
                      <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                        {meeting.dayName} · {meeting.time} ({meeting.durationMinutes} min)
                         {getSpainTimeLabel(meeting.time, meeting.country) && ` · ${getSpainTimeLabel(meeting.time, meeting.country)} hora España`}
                      </span>
                      {distance !== null && (
                        <span className="text-xs font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded-md">
                          A {distance} km
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-[17px] sm:text-[18px] text-[#0b1c30] group-hover:text-[#af101a] transition-colors leading-tight">
                      {meeting.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {meeting.city}, {meeting.country}
                    </p>
                  </div>

                  {/* Favorite Toggle */}
                  <button
                    onClick={() => onToggleFavorite(meeting.id)}
                    aria-label={isFav ? 'Quitar de favoritos' : 'Guardar en favoritos'}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform active:scale-90 ${
                      isFav
                        ? 'text-[#af101a] bg-red-50'
                        : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[22px]"
                      style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      favorite
                    </span>
                  </button>
                </div>

                {/* Location / Zoom Details */}
                <div className="bg-slate-50/80 rounded-xl p-3 text-xs text-slate-700 space-y-1.5">
                  {meeting.address && (
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-slate-500 text-[16px] shrink-0 mt-0.5">
                        location_on
                      </span>
                      <div>
                        <span className="font-semibold text-slate-900">{meeting.address}</span>
                        {meeting.locationDetails && (
                          <span className="text-slate-500 block">{meeting.locationDetails}</span>
                        )}
                      </div>
                    </div>
                  )}

                  {meeting.zoomId && (
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-blue-600 text-[16px] shrink-0 mt-0.5">
                        videocam
                      </span>
                      <div>
                        <span>
                          ID de reunión:{' '}
                          <strong className="font-mono text-slate-900">{meeting.zoomId}</strong>
                        </span>
                        {meeting.zoomPasscode && (
                          <span className="ml-2">
                            Código:{' '}
                            <strong className="font-mono text-slate-900">
                              {meeting.zoomPasscode}
                            </strong>
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {meeting.notes && (
                    <p className="text-slate-500 italic pt-1 border-t border-slate-200/60">
                      {meeting.notes}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-1 flex-wrap justify-end">
                  <button
                    onClick={() => handleCopyLink(meeting)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {copiedId === meeting.id ? 'check' : 'content_copy'}
                    </span>
                    <span>{copiedId === meeting.id ? 'Copiado' : 'Copiar'}</span>
                  </button>

                  {meeting.contactPhone && (
                    <a
                      href={`tel:${meeting.contactPhone.replace(/\s+/g, '')}`}
                      className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-[#af101a] rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">call</span>
                      <span>Contacto</span>
                    </a>
                  )}

                  {meeting.zoomUrl && (
                    <a
                      href={meeting.zoomUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-1.5 bg-[#af101a] hover:bg-[#930010] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                    >
                      <span className="material-symbols-outlined text-[16px]">videocam</span>
                      <span>Unirse a Zoom</span>
                    </a>
                  )}

                  {meeting.address && !meeting.zoomUrl && (
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(
                        `${meeting.address}, ${meeting.city}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-1.5 bg-[#0b1c30] hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                    >
                      <span className="material-symbols-outlined text-[16px]">map</span>
                      <span>Ver en Mapa</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
 'feat: hora española en reuniones'
