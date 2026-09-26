import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Sparkles, CheckCircle2, Award, HeartPulse, Feather } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative bg-canvas pt-8 pb-16 md:pt-14 md:pb-24 border-b border-border overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Brand Mission & Editorial Typography */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Trust Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-species-budgie-wash text-species-budgie-base text-xs font-semibold mb-6 border border-species-budgie-base/20">
              <ShieldCheck className="w-4 h-4 text-species-budgie-base flex-shrink-0" aria-hidden="true" />
              <span>100% Natural • Avian Veterinarian Approved</span>
            </div>

            {/* Editorial H1 Headline */}
            <h1
              id="hero-heading"
              className="text-text-primary font-jakarta font-bold text-3xl sm:text-4xl md:text-5xl lg:text-56px leading-tight tracking-tight mb-4"
            >
              Avian Nutrition, <br className="hidden sm:inline" />
              <span className="text-species-budgie-base">Precision-Milled.</span>
            </h1>

            {/* Sub-headline / Brand Promise */}
            <p className="font-jakarta text-lg sm:text-xl font-semibold text-text-muted mb-4">
              Pure Nutrition for Every Feather.
            </p>

            {/* Brand Subcopy in Inter */}
            <p className="font-inter text-base sm:text-lg text-text-muted leading-relaxed max-w-xl mb-8">
              Natural seeds enriched with essential vitamins, minerals, and amino acids for balanced digestion, resilient immunity, and radiant plumage gloss. Formulated by resident avian clinicians.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <Link href="/budgerigar" className="w-full sm:w-auto">
                <Button
                  variant="budgerigar"
                  size="lg"
                  className="w-full sm:w-auto shadow-level1 hover:shadow-level2 group"
                >
                  <span>Explore Budgerigar Lane</span>
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Button>
              </Link>
              <Link href="/budgerigar" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <span>Find Your Bird&apos;s Mix</span>
                </Button>
              </Link>
            </div>

            {/* 4 Trust Feature Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-border w-full">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-species-budgie-wash flex items-center justify-center flex-shrink-0 text-species-budgie-base">
                  <Feather className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <span className="font-jakarta text-xs font-bold text-text-primary">100%</span>
                  <span className="font-inter text-[11px] text-text-muted leading-tight">Whole-grain</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-species-budgie-wash flex items-center justify-center flex-shrink-0 text-species-budgie-base">
                  <HeartPulse className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <span className="font-jakarta text-xs font-bold text-text-primary">Vit D3 & Ca</span>
                  <span className="font-inter text-[11px] text-text-muted leading-tight">Bone density</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-species-budgie-wash flex items-center justify-center flex-shrink-0 text-species-budgie-base">
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <span className="font-jakarta text-xs font-bold text-text-primary">Zero Fillers</span>
                  <span className="font-inter text-[11px] text-text-muted leading-tight">No preservatives</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-species-budgie-wash flex items-center justify-center flex-shrink-0 text-species-budgie-base">
                  <Award className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <span className="font-jakarta text-xs font-bold text-text-primary">ISO Grade</span>
                  <span className="font-inter text-[11px] text-text-muted leading-tight">Clean seeds</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Photography Card with Floating Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-surface border border-border shadow-level1 p-2 md:p-3">
              {/* Main Photograph */}
              <div className="relative aspect-[4/3] w-full rounded-xl md:rounded-2xl overflow-hidden bg-surface-subtle">
                <Image
                  src="/images/hero-birds.jpg"
                  alt="A vibrant green Budgerigar and a Cockatiel enjoying fresh botanical bird seeds in a natural wooden feeder"
                  fill
                  priority
                  className="object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 540px"
                />
              </div>

              {/* Floating Top Badge: +35% Feather Gloss */}
              <div className="absolute top-5 left-5 bg-surface/95 backdrop-blur-sm border border-border rounded-full py-1.5 px-3.5 shadow-level2 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-species-budgie-base animate-pulse" aria-hidden="true" />
                <div className="flex flex-col">
                  <span className="font-jakarta text-xs font-bold text-text-primary">+35% Feather Gloss</span>
                  <span className="font-inter text-[10px] text-text-muted leading-none">Omega 3 & 6 rich</span>
                </div>
              </div>

              {/* Floating Bottom Badge: Triple-Cleaned Dust Free */}
              <div className="absolute bottom-5 right-5 bg-surface/95 backdrop-blur-sm border border-border rounded-full py-2 px-4 shadow-level2 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-species-budgie-wash flex items-center justify-center text-species-budgie-base flex-shrink-0">
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <span className="font-jakarta text-xs font-bold text-text-primary">Triple-Cleaned Dust Free</span>
                  <span className="font-inter text-[10px] text-text-muted leading-none">Respiratory irritation protection</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
