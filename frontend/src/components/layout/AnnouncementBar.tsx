import React from 'react';
import { Sparkles } from 'lucide-react';

export function AnnouncementBar() {
  return (
    <aside
      aria-label="Promotional announcement"
      className="bg-species-budgie-base text-white text-xs font-medium py-2 px-4 text-center tracking-wide"
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-species-budgie-hover flex-shrink-0" aria-hidden="true" />
        <span>
          Spring Avian Wellness Sale: <strong className="font-semibold text-white">Free Shipping over $35</strong> | Avian Nutritionist Consultation Included
        </span>
      </div>
    </aside>
  );
}
