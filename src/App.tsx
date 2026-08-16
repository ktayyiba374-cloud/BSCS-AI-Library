import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { HeroLandingPage } from './pages/HeroLandingPage';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { ExploreBooks } from './pages/ExploreBooks';
import { MyLibraryPage } from './pages/MyLibraryPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { AiAssistantPage } from './pages/AiAssistantPage';
import { ResearchPapersPage } from './pages/ResearchPapersPage';
import { StudyMaterialsPage } from './pages/StudyMaterialsPage';
import { ProgrammingResourcesPage } from './pages/ProgrammingResourcesPage';
import { ReadingListsPage } from './pages/ReadingListsPage';
import { RecentlyViewedPage } from './pages/RecentlyViewedPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { LearningProgressPage } from './pages/LearningProgressPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* INITIAL HERO LANDING PORTAL (Split screen, 4 floating cards, student model, CTA transitions) */}
          <Route path="/" element={<HeroLandingPage />} />

          {/* BSCS LIBRARY DASHBOARD APPLICATION WITH SIDEBAR & PERSISTENT AI PANEL */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/books" element={<ExploreBooks />} />
            <Route path="/my-library" element={<MyLibraryPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/ai-assistant" element={<AiAssistantPage />} />
            <Route path="/research" element={<ResearchPapersPage />} />
            <Route path="/study-materials" element={<StudyMaterialsPage />} />
            <Route path="/programming" element={<ProgrammingResourcesPage />} />
            <Route path="/reading-lists" element={<ReadingListsPage />} />
            <Route path="/recent" element={<RecentlyViewedPage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="/progress" element={<LearningProgressPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
