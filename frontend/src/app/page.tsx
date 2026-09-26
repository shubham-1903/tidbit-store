import React from 'react';
import { AnnouncementBar, Header } from '@/components/layout';
import { HeroSection } from '@/components/home/HeroSection';
import { SpeciesSection } from '@/components/species/SpeciesSection';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-canvas text-text-primary selection:bg-species-budgie-wash selection:text-species-budgie-base">
      {/* Top Promotional Announcement */}
      <AnnouncementBar />

      {/* Main Brand Navigation Header */}
      <Header />

      {/* Main Content Landmark */}
      <main id="main-content" className="flex-1 focus:outline-none">
        {/* Editorial Hero Banner */}
        <HeroSection />

        {/* Species Navigation & Taxonomy Section */}
        <SpeciesSection />
      </main>
    </div>
  );
}
