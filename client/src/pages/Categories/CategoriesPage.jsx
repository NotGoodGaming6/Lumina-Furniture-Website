import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiLoader } from 'react-icons/fi';
import { useGetCategoryStatsQuery } from '@/redux/api/productApiSlice';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';

const INITIAL_CATEGORIES = [
  {
    id: 'furniture',
    name: 'Furniture',
    description: 'Timeless pieces crafted with sustainable materials and architectural precision.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    itemCount: 0,
    color: 'from-orange-500/80 to-transparent'
  },
  {
    id: 'lighting',
    name: 'Lighting',
    description: 'Sculptural illumination that defines the mood and atmosphere of your space.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    itemCount: 0,
    color: 'from-amber-500/80 to-transparent'
  },
  {
    id: 'decor',
    name: 'Decor',
    description: 'Curated accents that bring personality and tactile warmth to minimal interiors.',
    image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    itemCount: 0,
    color: 'from-brand-500/80 to-transparent'
  },
  {
    id: 'botanical',
    name: 'Botanical',
    description: 'Organic elements and structural planters to harmonize the indoor environment.',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    itemCount: 0,
    color: 'from-emerald-500/80 to-transparent'
  }
];

export const Categories = () => {
  const { data: statsData, isLoading } = useGetCategoryStatsQuery();
  const { scrollYProgress } = useScroll();
  const yHeader = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const categories = React.useMemo(() => {
    if (!statsData?.data) return INITIAL_CATEGORIES;

    return INITIAL_CATEGORIES.map(cat => {
      const stat = statsData.data.find(s => s.category.toLowerCase() === cat.name.toLowerCase());
      return {
        ...cat,
        itemCount: stat ? stat.count : 0
      };
    });
  }, [statsData]);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300">

      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-slate-950 border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <motion.img 
            style={{ y: yHeader }}
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Interior Texture" 
            className="w-full h-[120%] object-cover opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          <div className="flex justify-center mb-4">
            <Breadcrumbs items={[{ label: 'Categories' }]} />
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight font-display"
          >
            The <span className="text-amber-400 dark:text-amber-300 font-serif italic">Lookbooks</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-300 font-medium"
          >
            Explore our meticulously curated collections, organized by domain to help you design with intention.
          </motion.p>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-20 relative z-20">
        <div className="space-y-12 md:space-y-24">
          {categories.map((category, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={category.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 lg:gap-16 items-center group`}
              >

                <div className="w-full md:w-3/5 relative h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10">

                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-0 group-hover:opacity-40 transition-opacity duration-700 z-10 mix-blend-multiply`} />
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-700 z-10" />

                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover transform-gpu"
                  />

                  <div className="absolute top-8 left-8 z-20 transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="glass text-slate-900 dark:text-white backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase">
                      Explore Collection
                    </span>
                  </div>
                </div>

                <div className={`w-full md:w-2/5 p-4 ${isEven ? 'md:pr-10' : 'md:pl-10'}`}>
                  <div className="flex items-center space-x-4 mb-6">
                    <span className="text-4xl font-black text-slate-300 dark:text-slate-700 block font-display">0{index + 1}</span>
                    <div className="h-px bg-slate-200 dark:bg-slate-800 flex-grow"></div>
                  </div>

                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-500 font-display">
                    {category.name}
                  </h2>

                  <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      {category.itemCount} Items
                    </span>

                    <Link 
                      to={`/products?category=${category.name}`}
                      className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 transform group-hover:scale-110 shadow-lg"
                    >
                      <FiArrowRight className="w-6 h-6" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="py-24 bg-slate-100 dark:bg-slate-900 text-center border-t border-slate-200 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 font-display">Not sure where to start?</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-10">Browse our entire catalog and filter by what speaks to you.</p>
          <Link 
            to="/products"
            className="btn-gradient inline-flex items-center justify-center px-10 py-5 text-lg font-bold rounded-full shadow-xl"
          >
            View All Products
          </Link>
        </div>
      </section>

    </div>
  );
}
