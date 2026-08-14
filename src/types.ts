export type NavTab = 'inicio' | 'reuniones' | 'favoritos' | 'asistente' | 'guia' | 'webs' | 'acerca' | 'preguntas' | 'pasos';

export interface Meeting {
  id: string;
  name: string;
  country: string;
  city: string;
  province?: string;
  type: 'presencial' | 'zoom' | 'hibrida';
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  dayName: string;
  time: string; // e.g. "19:30"
  durationMinutes: number;
  address?: string;
  locationDetails?: string;
  zoomUrl?: string;
  zoomId?: string;
  zoomPasscode?: string;
  contactPhone?: string;
  contactEmail?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  notes?: string;
}

export interface OfficialWebsite {
  id: string;
  country: string;
  name: string;
  url: string;
  phone: string;
  email?: string;
  flag: string;
}

export interface GuidePoint {
  id: number;
  title: string;
  description: string;
  deepExplanation?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface TwentyQuestion {
  id: number;
  text: string;
}

export interface StepItem {
  number: number;
  title: string;
  description: string;
}
