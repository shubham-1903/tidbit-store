import React from 'react';
import { DetailedProduct } from '@/lib/catalog';
import { ProductCard } from '@/components/product/ProductCard';

interface RelatedProductsProps {
  products: DetailedProduct[];
  speciesName: string;
}

export function RelatedProducts({ products, speciesName }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="related-products-heading" className="py-12 md:py-16 border-t border-border bg-canvas">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col mb-8">
          <span className="font-jakarta text-xs font-bold uppercase tracking-wider text-species-budgie-base mb-1">
            Same Species Formulation
          </span>
          <h2 id="related-products-heading" className="font-jakarta text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
            More in the {speciesName} Lane
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              slug={p.slug}
              title={p.title}
              subtitle={p.subtitle}
              species={p.species}
              speciesLabel={`${p.speciesName} Lane`}
              badge={p.badge}
              ratingAvg={p.ratingAvg}
              ratingCount={p.ratingCount}
              basePriceCents={p.basePriceCents}
              compareAtPriceCents={p.compareAtPriceCents}
              specs={p.ingredients.slice(0, 3)}
              imageUrl={p.imageUrls[0]}
              defaultVariant="1 kg"
              productHref={`/${p.species}/${p.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
