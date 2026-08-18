const COUNTRY_TIMEZONES: Record<string, string> = {
  "España": "Europe/Madrid",
  "Colombia": "America/Bogota",
  "México": "America/Mexico_City",
  "Argentina": "America/Argentina/Buenos_Aires",
  "Chile": "America/Santiago",
  "Uruguay": "America/Montevideo",
  "Perú": "America/Lima",
};

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
  if (!time || !country || country === "España") return null;
  const tz = COUNTRY_TIMEZONES[country];
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
