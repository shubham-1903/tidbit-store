'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown, Feather } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const openCart = useCartStore((state) => state.openCart);
  const totalItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-border transition-colors">
      {/* Skip to Content for Screen Readers & Keyboard Navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-surface focus:text-text-primary focus:border focus:border-border focus:rounded-full focus:shadow-level2 focus:font-medium"
      >
        Skip to main content
      </a>

      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-species-budgie-base rounded-lg p-1"
            aria-label="Tidbit Homepage"
          >
            <div className="w-9 h-9 rounded-full bg-species-budgie-wash flex items-center justify-center text-species-budgie-base group-hover:scale-105 transition-transform duration-200">
              <Feather className="w-5 h-5 text-species-budgie-base" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="font-jakarta text-2xl font-bold tracking-tight text-text-primary leading-none">
                Tidbit<span className="text-species-budgie-base">.</span>
              </span>
              <span className="font-inter text-[10px] tracking-wider uppercase text-text-muted font-medium">
                Avian Wellness
              </span>
            </div>
          </Link>

          {/* Quick Bird Selector Dropdown Button */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/budgerigar"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-surface-subtle text-text-muted hover:text-species-budgie-base hover:bg-species-budgie-wash border border-border transition-colors"
            >
              <span>Quick Bird Selector</span>
              <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main Navigation" className="hidden xl:flex items-center gap-6 text-sm font-medium text-text-muted">
          <Link
            href="/budgerigar"
            className="text-white bg-species-budgie-base hover:bg-species-budgie-deepen px-3.5 py-1 rounded-full text-xs font-semibold transition-colors"
          >
            Shop by Bird
          </Link>
          <Link href="#best-sellers" className="hover:text-text-primary transition-colors">
            Best Sellers
          </Link>
          <Link href="#quality" className="hover:text-text-primary transition-colors">
            Ingredients & Quality
          </Link>
          <Link href="#wholesale" className="hover:text-text-primary transition-colors">
            Wholesale / Bulk
          </Link>
          <Link href="#about" className="hover:text-text-primary transition-colors">
            About Us
          </Link>
        </nav>

        {/* Right Search & Action Controls */}
        <div className="flex items-center gap-3">
          {/* Search Input (Desktop) */}
          <div className="relative hidden md:block w-48 lg:w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-subtle" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search holistic blends..."
              className="w-full h-10 pl-9 pr-3 rounded-full bg-surface-subtle border border-border text-xs text-text-primary placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-species-budgie-base focus:bg-surface transition-all"
              aria-label="Search bird food blends"
            />
          </div>

          {/* Wishlist Icon */}
          <button
            type="button"
            className="p-2 text-text-muted hover:text-species-lovebird-base rounded-full hover:bg-surface-subtle transition-colors"
            aria-label="Wishlist (0 items)"
          >
            <Heart className="w-5 h-5" aria-hidden="true" />
          </button>

          {/* Cart Icon with Counter */}
          <button
            type="button"
            onClick={openCart}
            className="relative p-2 text-text-primary hover:text-species-budgie-base rounded-full hover:bg-surface-subtle transition-colors cursor-pointer"
            aria-label={`Shopping cart with ${totalItemCount} items`}
          >
            <ShoppingBag className="w-5 h-5" aria-hidden="true" />
            {totalItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-species-budgie-base text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-numbers">
                {totalItemCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-text-primary hover:bg-surface-subtle rounded-lg transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-surface border-b border-border px-4 py-4 space-y-3">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-subtle" />
            <input
              type="search"
              placeholder="Search holistic blends..."
              className="w-full h-10 pl-9 pr-3 rounded-full bg-surface-subtle border border-border text-sm text-text-primary"
            />
          </div>
          <nav className="flex flex-col gap-2 font-medium text-text-primary text-sm">
            <Link
              href="/budgerigar"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg bg-species-budgie-wash text-species-budgie-base font-semibold"
            >
              Shop Budgerigar Lane →
            </Link>
            <Link
              href="/budgerigar"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-surface-subtle"
            >
              Shop All Species
            </Link>
            <Link
              href="#best-sellers"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-surface-subtle"
            >
              Best Sellers
            </Link>
            <Link
              href="#quality"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-surface-subtle"
            >
              Ingredients & Quality
            </Link>
            <Link
              href="#wholesale"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-surface-subtle"
            >
              Wholesale & Care
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
