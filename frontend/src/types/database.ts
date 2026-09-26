export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      species: {
        Row: {
          id: string;
          slug: string;
          name: string;
          color_base: string;
          color_wash: string;
          color_accent: string | null;
          hero_image_url: string | null;
          short_description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          color_base: string;
          color_wash: string;
          color_accent?: string | null;
          hero_image_url?: string | null;
          short_description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          color_base?: string;
          color_wash?: string;
          color_accent?: string | null;
          hero_image_url?: string | null;
          short_description?: string | null;
          created_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          slug: string;
          title: string;
          subtitle: string | null;
          description: string | null;
          primary_species_id: string | null;
          additional_species_ids: string[];
          base_price_cents: number;
          compare_at_price_cents: number | null;
          badges: string[];
          rating_avg: number;
          rating_count: number;
          milled_on: string | null;
          best_by: string | null;
          ingredients: string[];
          image_urls: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          subtitle?: string | null;
          description?: string | null;
          primary_species_id?: string | null;
          additional_species_ids?: string[];
          base_price_cents: number;
          compare_at_price_cents?: number | null;
          badges?: string[];
          rating_avg?: number;
          rating_count?: number;
          milled_on?: string | null;
          best_by?: string | null;
          ingredients?: string[];
          image_urls?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          subtitle?: string | null;
          description?: string | null;
          primary_species_id?: string | null;
          additional_species_ids?: string[];
          base_price_cents?: number;
          compare_at_price_cents?: number | null;
          badges?: string[];
          rating_avg?: number;
          rating_count?: number;
          milled_on?: string | null;
          best_by?: string | null;
          ingredients?: string[];
          image_urls?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      product_variants: {
        Row: {
          id: string;
          product_id: string;
          label: string;
          price_cents: number;
          compare_at_price_cents: number | null;
          stock: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          label: string;
          price_cents: number;
          compare_at_price_cents?: number | null;
          stock?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          label?: string;
          price_cents?: number;
          compare_at_price_cents?: number | null;
          stock?: number;
          created_at?: string;
        };
      };
      nutrition_facts: {
        Row: {
          id: string;
          product_id: string;
          nutrient: string;
          value_text: string;
          value_numeric: number | null;
          unit: string;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          nutrient: string;
          value_text: string;
          value_numeric?: number | null;
          unit: string;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          nutrient?: string;
          value_text?: string;
          value_numeric?: number | null;
          unit?: string;
          display_order?: number;
          created_at?: string;
        };
      };
      feeding_guidance: {
        Row: {
          id: string;
          product_id: string;
          species_id: string | null;
          bird_weight_range_g: string;
          daily_amount_g: string;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          species_id?: string | null;
          bird_weight_range_g: string;
          daily_amount_g: string;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          species_id?: string | null;
          bird_weight_range_g?: string;
          daily_amount_g?: string;
          notes?: string | null;
          created_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          product_id: string;
          author_name: string;
          author_location: string | null;
          rating: number;
          title: string | null;
          body: string;
          verified_purchase: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          author_name: string;
          author_location?: string | null;
          rating: number;
          title?: string | null;
          body: string;
          verified_purchase?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          author_name?: string;
          author_location?: string | null;
          rating?: number;
          title?: string | null;
          body?: string;
          verified_purchase?: boolean;
          created_at?: string;
        };
      };
      carts: {
        Row: {
          id: string;
          session_id: string | null;
          user_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          session_id?: string | null;
          user_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string | null;
          user_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      cart_items: {
        Row: {
          id: string;
          cart_id: string;
          product_variant_id: string;
          quantity: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          cart_id: string;
          product_variant_id: string;
          quantity?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          cart_id?: string;
          product_variant_id?: string;
          quantity?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          email: string;
          total_cents: number;
          subtotal_cents: number;
          shipping_cents: number;
          tax_cents: number;
          status: string;
          stripe_payment_intent_id: string | null;
          shipping_address: Json | null;
          billing_address: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          email: string;
          total_cents: number;
          subtotal_cents: number;
          shipping_cents?: number;
          tax_cents?: number;
          status?: string;
          stripe_payment_intent_id?: string | null;
          shipping_address?: Json | null;
          billing_address?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          email?: string;
          total_cents?: number;
          subtotal_cents?: number;
          shipping_cents?: number;
          tax_cents?: number;
          status?: string;
          stripe_payment_intent_id?: string | null;
          shipping_address?: Json | null;
          billing_address?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_variant_id: string | null;
          product_title: string;
          species_name: string | null;
          variant_label: string;
          price_cents: number;
          quantity: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_variant_id?: string | null;
          product_title: string;
          species_name?: string | null;
          variant_label: string;
          price_cents: number;
          quantity: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_variant_id?: string | null;
          product_title?: string;
          species_name?: string | null;
          variant_label?: string;
          price_cents?: number;
          quantity?: number;
          created_at?: string;
        };
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          source: string | null;
          subscribed_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          source?: string | null;
          subscribed_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          source?: string | null;
          subscribed_at?: string;
        };
      };
    };
  };
}
