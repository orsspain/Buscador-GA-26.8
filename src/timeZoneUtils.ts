const COUNTRY_TIMEZONES: Record<string, string> = {
  "espana": "Europe/Madrid",
  "colombia": "America/Bogota",
  "mexico": "America/Mexico_City",
  "argentina": "America/Argentina/Buenos_Aires",
  "chile": "America/Santiago",
  "uruguay": "America/Montevideo",
  "peru": "America/Lima",
};

function normalize(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function getOffsetMinutes(timeZone: string, date: Date): number {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone, hour12: false,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
  const parts = dtf.formatToParts(date);
  const map: Record<string, string> = {};
  parts.forEach(p => { if (p.type !== 'literal') map[p.type] = p.value; });
  const asUTC = Date.UTC(
    parseInt(map.year), parseInt(map.month) - 1, parseInt(map.day),
    parseInt(map.hour), parseInt(map.minute), parseInt(map.second)
  );
  return (asUTC - date.getTime()) / 60000;
}

export function getSpainTimeLabel(time: string, country: string): string | null {
  if (!time || !country) return null;
  const normalizedCountry = normalize(country);
  if (normalizedCountry === 'espana') return null;
  const tz = COUNTRY_TIMEZONES[normalizedCountry];
  if (!tz) return null;

  const [hourStr, minuteStr] = time.split(':');
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);
  if (isNaN(hour) || isNaN(minute)) return null;

  const now = new Date();
  const originOffset = getOffsetMinutes(tz, now);
  const spainOffset = getOffsetMinutes('Europe/Madrid', now);
  const diffMinutes = spainOffset - originOffset;

  const rawTotal = hour * 60 + minute + diffMinutes;
  const dayShift = Math.floor(rawTotal / 1440);
  const totalMinutes = ((rawTotal % 1440) + 1440) % 1440;
  const spainHour = Math.floor(totalMinutes / 60);
  const spainMinute = totalMinutes % 60;

  const hh = String(spainHour).padStart(2, '0');
  const mm = String(spainMinute).padStart(2, '0');
  let label = `${hh}:${mm}`;
  if (dayShift === 1) label += ' (día siguiente)';
  if (dayShift === -1) label += ' (día anterior)';
  return label;
}
commit
