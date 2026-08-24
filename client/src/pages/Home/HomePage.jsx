import React from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { useGetProductsQuery } from '@/redux/api/productApiSlice';
import { HeroSection } from '@/pages/Home/components/HeroSection';
import { CategoryGrid } from '@/pages/Home/components/CategoryGrid';
import { FeaturedProducts } from '@/pages/Home/components/FeaturedProducts';
import { TestimonialsSection } from '@/pages/Home/components/TestimonialsSection';
import { CtaSection } from '@/pages/Home/components/CtaSection';

export const Home = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

  const { data: res, isLoading } = useGetProductsQuery({ limit: 4, random: 'true' });
  const featuredProducts = res?.data || [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <HeroSection scrollYProgress={scrollYProgress} y={y} />
      <CategoryGrid />
      <FeaturedProducts products={featuredProducts} />
      <TestimonialsSection />
      <CtaSection />
    </div>
  );
};

export default Home;
