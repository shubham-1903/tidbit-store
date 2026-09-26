import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Database Schema Migration & Seed Files', () => {
  const rootDir = path.resolve(__dirname, '../../');
  const migrationPath = path.join(rootDir, 'supabase/migrations/20260926000000_initial_schema.sql');
  const seedPath = path.join(rootDir, 'supabase/seed.sql');

  it('migration file exists and contains all required table definitions', () => {
    expect(fs.existsSync(migrationPath)).toBe(true);
    const content = fs.readFileSync(migrationPath, 'utf8');

    // Required tables from acceptance criteria
    const requiredTables = [
      'CREATE TABLE IF NOT EXISTS species',
      'CREATE TABLE IF NOT EXISTS products',
      'CREATE TABLE IF NOT EXISTS product_variants',
      'CREATE TABLE IF NOT EXISTS nutrition_facts',
      'CREATE TABLE IF NOT EXISTS feeding_guidance',
      'CREATE TABLE IF NOT EXISTS reviews',
      'CREATE TABLE IF NOT EXISTS carts',
      'CREATE TABLE IF NOT EXISTS cart_items',
      'CREATE TABLE IF NOT EXISTS orders',
      'CREATE TABLE IF NOT EXISTS order_items',
      'CREATE TABLE IF NOT EXISTS newsletter_subscribers',
    ];

    for (const table of requiredTables) {
      expect(content).toContain(table);
    }

    // Constraints & columns
    expect(content).toContain('base_price_cents INTEGER NOT NULL');
    expect(content).toContain('price_cents INTEGER NOT NULL');
    expect(content).toContain('primary_species_id UUID REFERENCES species(id)');
    expect(content).toContain('ON DELETE CASCADE');
  });

  it('migration file contains Row Level Security (RLS) policies for catalog data', () => {
    const content = fs.readFileSync(migrationPath, 'utf8');

    expect(content).toContain('ALTER TABLE species ENABLE ROW LEVEL SECURITY');
    expect(content).toContain('ALTER TABLE products ENABLE ROW LEVEL SECURITY');
    expect(content).toContain('ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY');
    expect(content).toContain('ALTER TABLE nutrition_facts ENABLE ROW LEVEL SECURITY');
    expect(content).toContain('ALTER TABLE feeding_guidance ENABLE ROW LEVEL SECURITY');
    expect(content).toContain('ALTER TABLE reviews ENABLE ROW LEVEL SECURITY');
    expect(content).toContain('CREATE POLICY "Public read species"');
    expect(content).toContain('CREATE POLICY "Public read products"');
  });

  it('seed file exists and contains the 3 canonical species matching design-system', () => {
    expect(fs.existsSync(seedPath)).toBe(true);
    const content = fs.readFileSync(seedPath, 'utf8');

    // Budgerigar: #2E7D32 base, #E8F5E9 wash
    expect(content).toContain('budgerigar');
    expect(content).toContain('#2E7D32');
    expect(content).toContain('#E8F5E9');

    // Lovebird: #AD1457 base, #FCE4EC wash
    expect(content).toContain('lovebird');
    expect(content).toContain('#AD1457');
    expect(content).toContain('#FCE4EC');

    // Finch: #F57F17 base, #FFF8E1 wash
    expect(content).toContain('finch');
    expect(content).toContain('#F57F17');
    expect(content).toContain('#FFF8E1');
  });

  it('seed file contains all 3 POC products and their 1kg, 3kg, 5kg variants', () => {
    const content = fs.readFileSync(seedPath, 'utf8');

    // Products
    expect(content).toContain('parakeet-budgerigar-daily-vitality');
    expect(content).toContain('Tidbit Parakeet & Budgerigar Daily Vitality');
    expect(content).toContain('1299'); // $12.99

    expect(content).toContain('premium-lovebird-cockatiel-seed-mix');
    expect(content).toContain('Tidbit Premium Lovebird & Cockatiel Seed Mix');
    expect(content).toContain('1499'); // $14.99

    expect(content).toContain('goldfinch-french-canary-seed-formula');
    expect(content).toContain('Tidbit Goldfinch / French & Canary Seed Formula');
    expect(content).toContain('1349'); // $13.49

    // Variants
    expect(content).toContain("'1 kg'");
    expect(content).toContain("'3 kg'");
    expect(content).toContain("'5 kg'");
  });

  it('seed file contains canonical cross-species nutritional facts', () => {
    const content = fs.readFileSync(seedPath, 'utf8');

    expect(content).toContain('Crude Protein');
    expect(content).toContain('11.5%');
    expect(content).toContain('14.2%');
    expect(content).toContain('13.8%');

    expect(content).toContain('Crude Fat');
    expect(content).toContain('5.2%');
    expect(content).toContain('8.9%');
    expect(content).toContain('7.1%');

    expect(content).toContain('Crude Fiber');
    expect(content).toContain('6.8%');
    expect(content).toContain('7.0%');
    expect(content).toContain('6.4%');

    expect(content).toContain('Ca / P Ratio');
    expect(content).toContain('1.8 : 1');
    expect(content).toContain('1.9 : 1');
    expect(content).toContain('1.5 : 1');
  });

  it('seed file contains the 3 seed reviews', () => {
    const content = fs.readFileSync(seedPath, 'utf8');

    expect(content).toContain('Sarah Johnson');
    expect(content).toContain('Marcus Vance');
    expect(content).toContain('Dr. Elena Lin');
  });
});
