"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const CTASection = ({ 
  title = "Ready to Transform Your Decision-Making Process?",
  subtitle = "Join leading organizations that are using Flow Immersive to make critical decisions with unrivaled clarity.",
  backgroundImage = "/flow/globe.png",
  fallbackImage = "/flow/big-globe.png",
  className = ""
}) => {
  return (
    <section className={`min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-blue-950/80 via-indigo-950/80 to-slate-950/80 relative ${className}`}>
      <div className="absolute inset-0 opacity-30">
        <img
          src={backgroundImage}
          alt="Background"
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            e.target.src = fallbackImage;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/30"></div>
      </div>
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
            {title.includes('Decision-Making Process') ? (
              <>
                Ready to Transform Your <br />
                <span className="text-blue-400">Decision-Making Process?</span>
              </>
            ) : title.includes('Data') && title.includes('Transform') ? (
              <>
                Ready to Transform Your <br />
                <span className="text-blue-400">Data?</span>
              </>
            ) : (
              <span className="text-white">{title}</span>
            )}
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 mb-16 max-w-4xl mx-auto leading-relaxed">
            {subtitle}
          </p>
          <Link href="/demo">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-16 py-8 rounded-full text-2xl font-bold shadow-2xl hover:scale-110 hover:shadow-cyan-500/30 ring-4 ring-cyan-400/40 transition-all duration-300"
            >
              📅 Schedule Demo
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;