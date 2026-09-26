import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  speciesName: string;
  speciesSlug: string;
  productTitle: string;
}

export function Breadcrumbs({ speciesName, speciesSlug, productTitle }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 md:px-6 lg:px-8 max-w-[1280px] mx-auto text-xs font-medium text-text-muted">
      <ol className="flex items-center gap-1.5 flex-wrap">
        <li>
          <Link href="/" className="flex items-center gap-1 hover:text-text-primary transition-colors">
            <Home className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Home</span>
          </Link>
        </li>
        <li className="flex items-center">
          <ChevronRight className="w-3.5 h-3.5 text-text-subtle" aria-hidden="true" />
        </li>
        <li>
          <Link href={`/${speciesSlug}`} className="hover:text-text-primary capitalize transition-colors">
            {speciesName}
          </Link>
        </li>
        <li className="flex items-center">
          <ChevronRight className="w-3.5 h-3.5 text-text-subtle" aria-hidden="true" />
        </li>
        <li className="text-text-primary font-semibold truncate max-w-[220px] sm:max-w-md" aria-current="page">
          {productTitle}
        </li>
      </ol>
    </nav>
  );
}
