import React, { useState, useEffect } from 'react';
import { NavTab } from './types';
import { Header } from './components/Header';
import { BottomNavBar } from './components/BottomNavBar';
import { CrisisModal } from './components/CrisisModal';
import { HomeScreen } from './components/HomeScreen';
import { MemberGuideScreen } from './components/MemberGuideScreen';
import { OfficialWebsitesScreen } from './components/OfficialWebsitesScreen';
import { AssistantScreen } from './components/AssistantScreen';
import { MeetingsScreen } from './components/MeetingsScreen';
import { FavoritesAndToolsScreen } from './components/FavoritesAndToolsScreen';
import { AboutGAScreen } from './components/AboutGAScreen';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('inicio');
  const [isCrisisOpen, setIsCrisisOpen] = useState(false);
  const [meetingFilter, setMeetingFilter] = useState<'todas' | 'cerca' | 'zoom'>('todas');
  const [favoritesSubTab, setFavoritesSubTab] = useState<'favoritos' | 'contador' | 'preguntas' | 'pasos'>('favoritos');

  // Favorites stored in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ja_favorites');
      return saved ? JSON.parse(saved) : ['zoom-1'];
    } catch {
      return ['zoom-1'];
    }
  });

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('ja_favorites', JSON.stringify(next));
      return next;
    });
  };

  // Scroll to top on navigation change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  const handleQuickAction = (action: 'buscar' | 'cerca' | 'zoom' | 'asistente' | 'webs') => {
    if (action === 'buscar') {
      setMeetingFilter('todas');
      setCurrentTab('reuniones');
    } else if (action === 'cerca') {
      setMeetingFilter('cerca');
      setCurrentTab('reuniones');
    } else if (action === 'zoom') {
      setMeetingFilter('zoom');
      setCurrentTab('reuniones');
    } else if (action === 'asistente') {
      setCurrentTab('asistente');
    } else if (action === 'webs') {
      setCurrentTab('webs');
    }
  };

  const handleNavigate = (tab: NavTab) => {
    if (tab === 'preguntas') {
      setFavoritesSubTab('preguntas');
      setCurrentTab('favoritos');
    } else if (tab === 'pasos') {
      setFavoritesSubTab('pasos');
      setCurrentTab('favoritos');
    } else {
      if (tab === 'favoritos') {
        setFavoritesSubTab('favoritos');
      }
      setCurrentTab(tab);
    }
  };

  const isSubPage = ['guia', 'webs', 'acerca'].includes(currentTab);

  return (
    <div id="app-root" className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans">
      {/* Top App Bar */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenCrisis={() => setIsCrisisOpen(true)}
        showBack={isSubPage}
      />

      {/* Main Content Area with max-width container */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-3 pb-24">
        {currentTab === 'inicio' && (
          <HomeScreen
            onNavigate={handleNavigate}
            onOpenCrisis={() => setIsCrisisOpen(true)}
            onQuickAction={handleQuickAction}
          />
        )}

        {currentTab === 'reuniones' && (
          <MeetingsScreen
            initialFilter={meetingFilter}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onOpenCrisis={() => setIsCrisisOpen(true)}
          />
        )}

        {currentTab === 'favoritos' && (
          <FavoritesAndToolsScreen
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onNavigate={handleNavigate}
            onOpenCrisis={() => setIsCrisisOpen(true)}
            initialSubTab={favoritesSubTab}
          />
        )}

        {currentTab === 'asistente' && (
          <AssistantScreen
            onOpenCrisis={() => setIsCrisisOpen(true)}
            onNavigateToMeetings={() => {
              setMeetingFilter('todas');
              setCurrentTab('reuniones');
            }}
            onNavigateToQuestions={() => {
              setFavoritesSubTab('preguntas');
              setCurrentTab('favoritos');
            }}
          />
        )}

        {currentTab === 'guia' && (
          <MemberGuideScreen onNavigate={handleNavigate} />
        )}

        {currentTab === 'webs' && (
          <OfficialWebsitesScreen />
        )}

        {currentTab === 'acerca' && (
          <AboutGAScreen
            onNavigate={handleNavigate}
            onOpenCrisis={() => setIsCrisisOpen(true)}
          />
        )}
      </main>

      {/* Fixed Bottom Navigation */}
      <BottomNavBar
        activeTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'reuniones') setMeetingFilter('todas');
          handleNavigate(tab);
        }}
        favoritesCount={favorites.length}
      />

      {/* Crisis & 24h Helpline Modal */}
      <CrisisModal
        isOpen={isCrisisOpen}
        onClose={() => setIsCrisisOpen(false)}
        onNavigateToZoom={() => {
          setMeetingFilter('zoom');
          setCurrentTab('reuniones');
        }}
      />
    </div>
  );
}
