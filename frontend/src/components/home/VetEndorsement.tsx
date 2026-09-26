import React from 'react';
import Image from 'next/image';
import { MessageSquare, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function VetEndorsement() {
  return (
    <section aria-label="Veterinary Endorsement" className="bg-canvas py-16 md:py-24 border-t border-border">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="bg-surface rounded-2xl md:rounded-3xl border border-border shadow-level1 p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Clinician Portrait */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-2xl overflow-hidden border-2 border-species-budgie-wash shadow-level2 bg-surface-subtle">
                <Image
                  src="/images/dr-elena-lin.jpg"
                  alt="Dr. Elena Lin, DVM, Board Certified Avian Medicine Specialist and Tidbit Head of Nutrition"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 240px, 280px"
                />
              </div>
            </div>

            {/* Clinician Quote and Authority Copy */}
            <div className="lg:col-span-8 flex flex-col items-start">
              {/* Resident Clinician Tag */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-species-budgie-wash text-species-budgie-base text-xs font-semibold mb-4 border border-species-budgie-base/20">
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Resident Avian Clinician</span>
              </div>

              {/* Bold Quote */}
              <blockquote className="font-jakarta text-xl sm:text-2xl md:text-3xl font-bold text-text-primary leading-snug mb-4">
                &ldquo;Seed quality isn&apos;t just about calories. It directly dictates liver lipid metabolism, respiratory wellness, and companion longevity.&rdquo;
              </blockquote>

              {/* Scientific Context */}
              <p className="font-inter text-sm sm:text-base text-text-muted leading-relaxed mb-6">
                Most commercial seed formulations rely heavily on cheap filler sorghum or oxidized fatty seeds. At Tidbit, our formulations undergo strict nutrient verification, moisture audits, and sproutability indexing to protect companion birds against silent hepatic lipidosis.
              </p>

              {/* Doctor Details & Action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full pt-4 border-t border-border">
                <div>
                  <h3 className="font-jakarta text-base font-bold text-text-primary">
                    Dr. Elena Lin, DVM
                  </h3>
                  <p className="font-inter text-xs text-text-muted font-medium">
                    Board Certified Avian Medicine Specialist • Tidbit Head of Nutrition
                  </p>
                </div>

                <Button
                  variant="budgerigar"
                  size="default"
                  leftIcon={<MessageSquare className="w-4 h-4" />}
                  className="w-full sm:w-auto"
                >
                  Ask our Avian Nutritionist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
